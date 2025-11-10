import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";

const data = [
  { category: "Accessibility", score: 82 },
  { category: "Performance", score: 78 },
  { category: "SEO", score: 90 },
  { category: "Best Practices", score: 85 },
];

export default function WebsiteAuditCard() {
  return (
    <Card className="w-full max-w-md mx-auto p-4 shadow-lg rounded-2xl">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-gray-800">
          Website Audit Overview
        </CardTitle>
        <CardDescription className="text-gray-500">
          Scores based on your website’s performance and accessibility
        </CardDescription>
      </CardHeader>

      <CardContent className="h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
            <PolarGrid />
            <PolarAngleAxis dataKey="category" />
            <PolarRadiusAxis domain={[0, 100]} />
            <Radar
              name="Score"
              dataKey="score"
              stroke="#4F46E5"
              fill="#6366F1"
              fillOpacity={0.6}
            />
          </RadarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
