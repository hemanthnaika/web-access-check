import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import Card from "../components/card";
import CircleChart from "../components/CircleChart";
import CustomLayout from "../layout/customLayout";
import DoughnutChart from "@/components/Doughnut";
import AuditResults from "@/components/issuesData";

import { Link, useSearchParams } from "react-router";
import { useCallback, useEffect, useState } from "react";
import axios, { type AxiosResponse } from "axios";
import SkeletonComponents from "@/components/Skeleton";
import { noData, someWrong } from "@/assets";

// ✅ Interfaces for the API response
interface AISuggestions {
  generalRecommendations: string[];
  topIssues: { issue: string; impact: string }[];
  fixExamples: { issue: string; example: string; explanation: string }[];
  performanceOptimizationTips: string[];
}

// ✅ Parse AI Suggestions JSON safely
const parseAISuggestions = (text: string): AISuggestions | null => {
  try {
    const cleaned = text.replace(/```json|```/g, "").trim();
    return JSON.parse(cleaned);
  } catch (err) {
    console.error("AI JSON parse failed:", err);
    return null;
  }
};

const AccessCheck = () => {
  const [searchParams] = useSearchParams();
  const url = searchParams.get("url");
  const pages = searchParams.get("pages");

  const [results, setResults] = useState<Response | null>(null);
  const [loading, setLoading] = useState(false);

  // ✅ Callback for fetching data
  const fetchData = useCallback(async () => {
    if (!url || !pages) return;

    try {
      setLoading(true);
      const res: AxiosResponse<Response> = await axios.post(
        "http://localhost:3000/analyze",
        { url, pages }
      );
      setResults(res.data);
      console.log("Fetched data:", res.data);
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  }, [url, pages]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (!url || !pages)
    return (
      <div className="text-center text-red-600 mt-10">
        No URL or Pages provided!
      </div>
    );

  // ✅ Loading state
  if (loading)
    return (
      <div>
        <SkeletonComponents />
      </div>
    );

  // ✅ Handle missing results
  if (!results)
    return (
      <div className=" h-[90vh] w-full flex items-center justify-center  bg-white ">
        <div className="w-1/2 h-full flex flex-col items-center  mb-5">
          <img
            loading="lazy"
            src={noData}
            alt=""
            className="w-auto h-full bg-contain"
          />
          <h1 className="text-lg font-bold text-center">
            No results found. Try {"  "}
            <Link to="/" className="text-indigo-500">
              again
            </Link>
          </h1>
        </div>
      </div>
    );

  const invalidData =
    !results.summary ||
    !results.overallScores ||
    !results.results ||
    isNaN(Number(results.summary.avgPerformance)) ||
    isNaN(Number(results.summary.totalAuditScore)) ||
    isNaN(Number(results.overallScores.avgSEO)) ||
    isNaN(Number(results.overallScores.avgAccessibility)) ||
    isNaN(Number(results.overallScores.avgBestPractices));

  if (invalidData)
    return (
      <div className=" h-[90vh] w-full flex items-center justify-center  bg-white ">
        <div className="w-1/2 h-full flex flex-col items-center gap-5 mb-5">
          <img
            loading="lazy"
            src={someWrong}
            alt=""
            className="w-auto h-full bg-contain"
          />
          <h1 className="text-lg font-bold text-center">
            Something went wrong. Try
            <Link to="/" className="text-indigo-500">
              again
            </Link>
          </h1>
        </div>
      </div>
    );

  const aiData = parseAISuggestions(results.aiSuggestions?.text || "{}");

  return (
    <section className="mt-28 mb-10">
      <CustomLayout>
        <div className="mt-5 ">
          <h1 className="font-bold text-xl">Overall Site Summary</h1>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-5">
            <Card title="Total Pages" score={results.summary.totalPages} />
            <Card
              title="Total Accessibility Errors"
              score={results.summary.totalAccessibilityErrors}
            />
            <Card
              title="Total Accessibility Warnings"
              score={results.summary.totalAccessibilityWarnings}
            />
            <Card
              title="Performance"
              score={Number(results.summary.avgPerformance)}
              per={true}
            />
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="bg-white p-5 rounded-lg shadow">
            <h1 className="mb-5 font-bold text-lg">Audit Score</h1>
            <CircleChart value={Number(results.summary.totalAuditScore)} />
          </div>

          <div className="bg-white px-5 py-5 rounded-lg shadow">
            <h1 className="mb-5 font-bold text-lg">
              Accessibility Issues Breakdown
            </h1>
            <DoughnutChart data={results.groupedIssues} />
          </div>

          <div className="bg-white p-5 rounded-lg shadow">
            <h1 className="mb-5 text-lg font-semibold">
              Core Web Category Scores
            </h1>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart
                data={[
                  {
                    category: "Best Practices",
                    score: results.overallScores.avgBestPractices,
                  },
                  { category: "SEO", score: results.overallScores.avgSEO },
                  {
                    category: "Accessibility",
                    score: results.overallScores.avgAccessibility,
                  },
                ]}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Bar dataKey="score" fill="#4F46E5" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white mt-5 p-5 rounded-lg shadow">
          <div className="flex items-center justify-between gap-5">
            <h1 className="font-bold text-md">#</h1>
            <h1 className="font-bold text-md mr-auto">URL</h1>
            <h1 className="font-bold text-md">Total Failing Elements</h1>
          </div>
          {results.results.map((r, i) => (
            <div key={i}>
              <AuditResults result={r} no={i + 1} />
            </div>
          ))}
        </div>

        {/* ✅ AI Suggestions Section */}
        <div className="bg-white mt-5 rounded-lg p-5 border border-gray-200 shadow-sm">
          <h2 className="font-bold text-xl mb-3 flex items-center gap-2">
            Recommendations & Fixes 🤖
          </h2>

          {!aiData ? (
            <p className="text-red-600 text-sm font-semibold">
              ⚠ Error parsing AI suggestions
            </p>
          ) : (
            <>
              <h3 className="font-semibold text-lg mt-3">
                General Recommendations
              </h3>
              <ul className="list-disc ml-6 text-gray-700">
                {aiData.generalRecommendations?.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>

              <h3 className="font-semibold text-lg mt-3">Top Issues</h3>
              <ul className="list-disc ml-6 text-gray-700">
                {aiData.topIssues?.map((issue, i) => (
                  <li key={i}>
                    <strong>{issue.issue}</strong>
                    <br />
                    <span>{issue.impact}</span>
                  </li>
                ))}
              </ul>

              <h3 className="font-semibold text-lg mt-3">Fix Examples</h3>
              {aiData.fixExamples?.map((fix, i) => (
                <div key={i} className="mt-2">
                  <p className="font-medium">{fix.issue}</p>
                  {fix.example && (
                    <pre className="bg-gray-100 p-2 rounded text-sm overflow-x-auto">
                      {fix.example}
                    </pre>
                  )}
                  <p className="text-gray-600">{fix.explanation}</p>
                </div>
              ))}

              <h3 className="font-semibold text-lg mt-3">Performance Tips</h3>
              <ul className="list-disc ml-6 text-gray-700">
                {aiData.performanceOptimizationTips?.map((tip, i) => (
                  <li key={i}>{tip}</li>
                ))}
              </ul>
            </>
          )}
        </div>
      </CustomLayout>
    </section>
  );
};

export default AccessCheck;
