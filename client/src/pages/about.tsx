import { useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Globe, Cpu, BarChart, Accessibility } from "lucide-react";
import CustomLayout from "@/layout/customLayout";

export default function About() {
  // ✅ Scroll to top when the page opens
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <CustomLayout>
      <section className="min-h-screen pt-24 pb-16 px-5 md:px-10 ">
        {/* ✅ Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            About <span className="text-indigo-600">AI Analyzer</span>
          </h1>
          <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
            Empowering developers and businesses to create faster, more
            accessible, and SEO-friendly websites using AI-driven analysis.
          </p>
        </div>

        {/* ✅ Mission Section */}
        <div className="max-w-5xl mx-auto mb-16">
          <Card className="shadow-md border-none bg-white rounded-2xl p-6 md:p-10">
            <CardContent>
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                Our Mission
              </h2>
              <p className="text-gray-600 leading-relaxed">
                At <b>AI Analyzer</b>, our mission is to simplify web
                performance optimization and accessibility compliance through
                artificial intelligence. We provide an all-in-one platform that
                helps developers improve site speed, enhance accessibility, and
                maximize SEO scores — ensuring every user gets a seamless web
                experience.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* ✅ Vision Section */}
        <div className="max-w-5xl mx-auto mb-16">
          <Card className="shadow-md border-none bg-indigo-600 text-white rounded-2xl p-6 md:p-10">
            <CardContent>
              <h2 className="text-2xl font-semibold mb-4">Our Vision</h2>
              <p className="leading-relaxed text-indigo-100">
                We envision a digital world where performance and accessibility
                are not afterthoughts — but built into every design, codebase,
                and product launch. AI Analyzer aims to bridge the gap between
                innovation and inclusion through intelligent insights.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* ✅ Feature Highlights */}
        <div className="max-w-6xl mx-auto mb-16">
          <h2 className="text-center text-2xl font-semibold text-gray-900 mb-8">
            What We Analyze
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              {
                title: "Performance",
                icon: BarChart,
                desc: "Measure loading speed, responsiveness, and overall site efficiency.",
              },
              {
                title: "Accessibility",
                icon: Accessibility,
                desc: "Ensure your website meets WCAG and ARIA accessibility standards.",
              },
              {
                title: "SEO",
                icon: Globe,
                desc: "Get insights on your site’s discoverability and meta optimization.",
              },
              {
                title: "Best Practices",
                icon: Cpu,
                desc: "AI checks your site for coding, security, and UX improvements.",
              },
            ].map((feature, i) => (
              <Card
                key={i}
                className="text-center border-none shadow-md hover:shadow-lg transition-all duration-300 bg-white"
              >
                <CardContent className="p-6 flex flex-col items-center">
                  <feature.icon className="w-10 h-10 text-indigo-600 mb-4" />
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{feature.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </CustomLayout>
  );
}
