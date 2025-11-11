import express from "express";
import "dotenv/config";

import cors from "cors";
import {
  crawlAndAnalyze,
  getAISuggestions,
  groupAccessibilityIssues,
} from "./analysis.js";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// ✅ API Route
app.post("/analyze", async (req, res) => {
  const { url, pages } = req.body;
  if (!url || !/^https?:\/\/.+/.test(url)) {
    return res.status(400).json({ error: "Invalid URL" });
  }

  console.log(`🚀 Starting analysis for ${url}`);
  const start = Date.now();
  const MAX_PAGES = pages ? Number(pages) : 1;
  const results = await crawlAndAnalyze(url, MAX_PAGES);

  // ✅ Summary Metrics
  const summary = {
    totalPages: results.length,
    avgPerformance: (
      results.reduce((s, r) => s + r.lighthouse.performance, 0) / results.length
    ).toFixed(1),
    totalAccessibilityErrors: results.reduce(
      (s, r) => s + r.pa11y.errorCount,
      0
    ),
    totalAccessibilityWarnings: results.reduce(
      (s, r) => s + r.pa11y.warningCount,
      0
    ),
    totalAuditScore: (
      results.reduce(
        (s, r) =>
          s +
          (r.lighthouse.performance +
            r.lighthouse.accessibility +
            r.lighthouse.seo +
            r.lighthouse.bestPractices) /
            4,
        0
      ) / results.length
    ).toFixed(1),
    duration: `${((Date.now() - start) / 1000).toFixed(1)}s`,
  };

  // ✅ Group issues by type/code
  const groupedIssues = groupAccessibilityIssues(results);

  // ✅ Overall Metrics
  const overallScores = {
    avgAccessibility: (
      results.reduce((s, r) => s + r.lighthouse.accessibility, 0) /
      results.length
    ).toFixed(1),
    avgSEO: (
      results.reduce((s, r) => s + r.lighthouse.seo, 0) / results.length
    ).toFixed(1),
    avgBestPractices: (
      results.reduce((s, r) => s + r.lighthouse.bestPractices, 0) /
      results.length
    ).toFixed(1),
  };

  // ✅ AI Suggestions
  const aiSuggestions = await getAISuggestions({
    summary,
    overallScores,
    groupedIssues,
  });

  // ✅ Final Response
  res.json({
    summary,
    overallScores,
    groupedIssues,
    results,
    aiSuggestions,
  });
});

app.get("/", async (req, res) => {
  res.json("AccessCheck backend");
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on ${PORT}`);
});
