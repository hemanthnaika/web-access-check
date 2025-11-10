import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

interface GroupedIssue {
  code: string;
  message: string;
  type: string;
  count: number;
  urls: string[];
}

const mapIssueToCategory = (code: string, message?: string): string => {
  const c = code.toLowerCase();
  const m = message?.toLowerCase() || "";

  // ✅ Images & ALT text
  if (c.includes("1_1_1") || m.includes("alt")) return "Missing Alt Text";

  // ✅ Duplicate ID / DOM parsing issues
  if (c.includes("4_1_1") || m.includes("duplicate id")) return "Duplicate IDs";

  // ✅ Contrast failures
  if (c.includes("1_4_3") || m.includes("contrast")) return "Contrast Issues";

  // ✅ Form Labels
  if (c.includes("1_3_1") || m.includes("label")) return "Missing Form Labels";

  // ✅ Keyboard Access issues
  if (c.includes("2_1") || m.includes("keyboard"))
    return "Keyboard Navigation Issues";

  // ✅ ARIA role or attribute issues
  if (c.includes("aria") || m.includes("aria")) return "ARIA Issues";

  // ✅ Links without text or purpose unclear
  if (c.includes("2_4") && m.includes("link")) return "Link Text Issues";

  // ✅ Heading / structure issues
  if (c.includes("1_3") && m.includes("heading"))
    return "Heading Structure Issues";

  // ✅ Focus visible / outline removed
  if (c.includes("2_4_7") || m.includes("focus"))
    return "Focus Visibility Issues";

  // ✅ Language not set
  if (c.includes("3_1_1") || m.includes("lang"))
    return "Document Language Issues";

  // ✅ Video / Autoplay / Captions
  if (c.includes("1_2") || m.includes("caption"))
    return "Media / Caption Issues";

  // ✅ Target size / touch issues
  if (c.includes("2_5") || m.includes("touch")) return "Touch Target Issues";

  // ✅ Table structure
  if (m.includes("table")) return "Table Structure Issues";

  // ✅ Fallback for anything else
  return "Other Accessibility Issues";
};

const DoughnutChart = ({ data }: { data: GroupedIssue[] }) => {
  // convert groupedIssues to chart data
  const categoryCount: Record<string, number> = {};

  data.forEach((issue) => {
    const category = mapIssueToCategory(issue.code);
    categoryCount[category] = (categoryCount[category] || 0) + issue.count;
  });

  const chartData = {
    labels: Object.keys(categoryCount),
    datasets: [
      {
        data: Object.values(categoryCount),
        backgroundColor: [
          "#f4b400", // Contrast
          "#0f9d58", // Alt text
          "#4285f4", // Duplicate ID
          "#db4437", // Others
          "#ff9800", // fallback extra category
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          usePointStyle: true,
          pointStyle: "circle",
        },
      },
    },
  };

  return (
    <div style={{ width: "100%", height: "200px" }}>
      <Doughnut data={chartData} options={options} />
    </div>
  );
};

export default DoughnutChart;
