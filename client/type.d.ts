interface Response {
  summary: Summary;
  overallScores: OverallScores;
  groupedIssues: GroupedIssue[];
  results: Result[];
  aiSuggestions: AiSuggestions;
}

interface AiSuggestions {
  error: string;
  text: string;
}

interface Result {
  url: string;
  lighthouse: Lighthouse;
  pa11y: Pa11y;
}

interface Pa11y {
  documentTitle: string;
  issues: Issue[];
  errorCount: number;
  warningCount: number;
}

interface Issue {
  code: string;
  type: string;
  typeCode: number;
  message: string;
  context: string;
  selector: string;
  runner: string;
}

interface Lighthouse {
  performance: number;
  accessibility: number;
  seo: number;
  bestPractices: number;
}

interface GroupedIssue {
  code: string;
  message: string;
  type: string;
  count: number;
  urls: string[];
}

interface OverallScores {
  avgAccessibility: string;
  avgSEO: string;
  avgBestPractices: string;
}

interface Summary {
  totalPages: number;
  avgPerformance: string;
  totalAccessibilityErrors: number;
  totalAccessibilityWarnings: number;
  totalAuditScore: string;
  duration: string;
}
