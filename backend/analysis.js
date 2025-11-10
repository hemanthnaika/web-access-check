import lighthouse from "lighthouse";
import * as chromeLauncher from "chrome-launcher";
import pa11y from "pa11y";
import fetch from "node-fetch";
import * as cheerio from "cheerio";
import "dotenv/config";
import { GoogleGenAI } from "@google/genai";

const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Limits
const MAX_DEPTH = 5;

const TIMEOUT = 60000;

// ✅ Extract internal links
export async function getInternalLinks(baseUrl, html) {
  const $ = cheerio.load(html);
  const baseDomain = new URL(baseUrl).origin;
  const links = new Set();

  $("a[href]").each((_, el) => {
    let href = $(el).attr("href");
    if (!href) return;
    if (href.startsWith("/")) href = baseDomain + href;
    if (href.startsWith(baseDomain)) {
      const cleanUrl = href.split("#")[0].split("?")[0];
      links.add(cleanUrl);
    }
  });
  return [...links];
}

// ✅ Run Lighthouse
export async function runLighthouse(url) {
  const chrome = await chromeLauncher.launch({ chromeFlags: ["--headless"] });
  const options = { logLevel: "error", output: "json", port: chrome.port };
  const runner = await lighthouse(url, options);
  await chrome.kill();

  return {
    performance: runner.lhr.categories.performance.score * 100,
    accessibility: runner.lhr.categories.accessibility.score * 100,
    seo: runner.lhr.categories.seo.score * 100,
    bestPractices: runner.lhr.categories["best-practices"].score * 100,
  };
}

// ✅ Run Pa11y
export async function runPa11y(url) {
  const result = await pa11y(url, { timeout: TIMEOUT });
  return {
    documentTitle: result.documentTitle,
    issues: result.issues,
    errorCount: result.issues.filter((i) => i.type === "error").length,
    warningCount: result.issues.filter((i) => i.type === "warning").length,
  };
}

// ✅ Group Issues by WCAG Rule
export function groupAccessibilityIssues(results) {
  const grouped = {};
  for (const site of results) {
    for (const issue of site.pa11y.issues) {
      if (!grouped[issue.code]) {
        grouped[issue.code] = {
          code: issue.code,
          message: issue.message,
          type: issue.type,
          count: 1,
          urls: [site.url],
        };
      } else {
        grouped[issue.code].count++;
        grouped[issue.code].urls.push(site.url);
      }
    }
  }
  return Object.values(grouped);
}

// ✅ Gemini AI — Generate Accessibility + Performance Suggestions
export async function getAISuggestions(scanResult) {
  const prompt = `
You are an accessibility and performance optimization expert.
Provide practical WCAG and web performance improvements.

Website Scan Data:
${JSON.stringify(scanResult, null, 2)}

Return JSON only with:
{
  "generalRecommendations": [],
  "topIssues": [],
  "fixExamples": [],
  "performanceOptimizationTips": []
}
`;

  const result = await genAI.models.generateContent({
    model: "gemini-2.0-flash",
    contents: prompt,
  });

  try {
    let raw = JSON.parse(result.text.trim());
    raw = raw.replace(/^```json|```$/g, "").trim();
    return JSON.parse(raw);
  } catch {
    return { error: "AI parsing failed", text: result.text };
  }
}

// ✅ Crawl and Analyze Function
export async function crawlAndAnalyze(
  startUrl,
  MAX_PAGES,
  depth = 0,
  visited = new Set(),
  results = []
) {
  if (depth > MAX_DEPTH || visited.size >= MAX_PAGES) return results;
  if (visited.has(startUrl)) return results;

  visited.add(startUrl);
  console.log(`🔍 Scanning Depth=${depth}: ${startUrl}`);

  try {
    const res = await fetch(startUrl);
    const html = await res.text();

    const [lh, pa11yRes] = await Promise.all([
      runLighthouse(startUrl),
      runPa11y(startUrl),
    ]);

    results.push({ url: startUrl, lighthouse: lh, pa11y: pa11yRes });

    const links = await getInternalLinks(startUrl, html);
    for (const link of links) {
      if (!visited.has(link)) {
        await crawlAndAnalyze(link, MAX_PAGES, depth + 1, visited, results);
      }
    }
  } catch (err) {
    console.error(`❌ Error scanning ${startUrl}:`, err.message);
  }

  return results;
}
