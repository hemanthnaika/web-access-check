import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Accessibility, Rocket, Search, Sparkles } from "lucide-react";
import CustomLayout from "../layout/customLayout";

export default function Services() {
  return (
    <CustomLayout>
      <section className="mt-24 mb-20 text-center">
        <h1 className="text-3xl font-bold text-indigo-700">
          Our AI-Powered Web Audit Services
        </h1>
        <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
          Discover how our AI Accessibility Analyzer helps you build faster,
          more accessible, and SEO-friendly websites — powered by data and
          automation.
        </p>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6 md:px-16">
        {/* Accessibility */}
        <Card className="hover:shadow-lg transition duration-300">
          <CardHeader>
            <div className="flex justify-center text-indigo-600 mb-3">
              <Accessibility size={42} />
            </div>
            <CardTitle>Accessibility Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 text-sm leading-relaxed">
              We detect accessibility issues using WCAG 2.1 standards — ensuring
              your website is inclusive and usable by everyone. Our AI suggests
              fixes for contrast, ARIA labels, and structure issues.
            </p>
          </CardContent>
        </Card>

        {/* Performance */}
        <Card className="hover:shadow-lg transition duration-300">
          <CardHeader>
            <div className="flex justify-center text-indigo-600 mb-3">
              <Rocket size={42} />
            </div>
            <CardTitle>Performance Optimization</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 text-sm leading-relaxed">
              We measure Core Web Vitals, analyze render-blocking resources, and
              suggest CDN, caching, and JavaScript optimization tips to improve
              loading speed and responsiveness.
            </p>
          </CardContent>
        </Card>

        {/* SEO */}
        <Card className="hover:shadow-lg transition duration-300">
          <CardHeader>
            <div className="flex justify-center text-indigo-600 mb-3">
              <Search size={42} />
            </div>
            <CardTitle>SEO Health Check</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 text-sm leading-relaxed">
              Our AI identifies missing meta tags, unoptimized titles, and
              keyword opportunities to enhance your search ranking and
              visibility on Google and other search engines.
            </p>
          </CardContent>
        </Card>

        {/* AI Recommendations */}
        <Card className="hover:shadow-lg transition duration-300">
          <CardHeader>
            <div className="flex justify-center text-indigo-600 mb-3">
              <Sparkles size={42} />
            </div>
            <CardTitle>AI-Powered Recommendations</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 text-sm leading-relaxed">
              Get actionable insights powered by our AI engine. From improving
              load speed to optimizing user experience, our assistant gives
              human-readable, prioritized suggestions.
            </p>
          </CardContent>
        </Card>
      </section>

      <section className="text-center my-16 ">
        <h2 className="text-2xl font-bold text-gray-800 mb-3">
          Ready to Analyze Your Website?
        </h2>
        <p className="text-gray-600 mb-6">
          Paste your website URL and get a detailed AI audit in seconds.
        </p>
        <Button
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl"
          onClick={() => (window.location.href = "/")}
        >
          Run Accessibility Audit
        </Button>
      </section>
    </CustomLayout>
  );
}
