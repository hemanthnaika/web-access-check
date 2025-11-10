import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";

import { cn } from "@/lib/utils";

import { ChevronDownIcon } from "lucide-react";

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

const BadgeCard = ({
  title,
  score,
  style,
}: {
  title: string;
  score: number;
  style: string;
}) => (
  <Badge variant="outline" className={cn(" font-semibold text-md mb-5", style)}>
    {title}: {score.toFixed()}%
  </Badge>
);
const AuditResult = ({ result, no }: { result: Result; no: number }) => {
  return (
    <Accordion type="single" collapsible className="border-b border-gray">
      <AccordionItem value={`item-${no}`}>
        <AccordionTrigger className="group flex items-center justify-between w-full gap-4">
          <span className="font-semibold">{no}</span>

          <span className="mr-auto truncate font-medium text-left">
            {result.url}
          </span>

          <div className="flex items-center gap-5">
            <span className="px-3 py-1 rounded-full bg-red-100 text-red-600 text-sm">
              {result.pa11y.errorCount} element
            </span>

            <ChevronDownIcon className="text-muted-foreground pointer-events-none size-6 shrink-0 translate-y-0.5 transition-transform duration-200 group-data-[state=open]:rotate-180" />
          </div>
        </AccordionTrigger>

        <AccordionContent className="md:px-4">
          <div className="mt-2 flex gap-2 text-sm">
            <Badge
              variant="outline"
              className="bg-red-500 px-5 py-2 text-white font-semibold"
            >
              Errors: {result.pa11y.errorCount}
            </Badge>
            <Badge
              variant="outline"
              className="bg-yellow-500 px-5 py-2 text-white font-semibold"
            >
              Warnings: {result.pa11y.warningCount}
            </Badge>
          </div>

          <div className="flex flex-wrap gap-2 text-sm mt-5">
            <BadgeCard
              title="Performance"
              score={result.lighthouse.performance}
              style="border-green-500 text-green-600"
            />

            <BadgeCard
              title="Accessibility"
              score={result.lighthouse.accessibility}
              style="border-purple-500 text-purple-600"
            />

            <BadgeCard
              title="SEO"
              score={result.lighthouse.seo}
              style="border-blue-500 text-blue-600"
            />
            <BadgeCard
              title="Best Practices"
              score={result.lighthouse.bestPractices}
              style="border-yellow-500 text-yellow-600"
            />
          </div>

          <div className=" bg-gray-100 p-5 flex flex-col gap-5">
            {result.pa11y.issues.map((issue) => (
              <div className="bg-white p-5 rounded-lg border-b border-gray-500 ">
                <h1 className="font-extrabold">
                  <span className="text-red-700">FAILING</span> ELEMENTS
                </h1>

                <code className="bg-gray-100 text-sm p-5 rounded font-mono font-bold wrap-break-word whitespace-pre-wrap block">
                  {issue.context}
                </code>

                <h1 className="font-extrabold mt-3">What does this mean?</h1>

                <p className=" font-medium bg-gray-100 p-3 rounded-md border border-gray-200 text-gray-800 wrap-break-word whitespace-pre-wrap overflow-hidden">
                  {issue.message}
                </p>
              </div>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default AuditResult;
