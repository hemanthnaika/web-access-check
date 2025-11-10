import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import CustomLayout from "@/layout/customLayout";
import { Mail, MapPin, Phone } from "lucide-react";

export default function Contact() {
  // ✅ Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <CustomLayout>
      <section className="min-h-screen pt-24 pb-16 px-5 md:px-10 ">
        {/* ✅ Header Section */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            Contact 
          </h1>
          <p className="text-gray-600 mt-3 max-w-xl mx-auto">
            Have questions about your accessibility reports or want to
            collaborate? Reach out — we’re happy to help!
          </p>
        </div>

        {/* ✅ Contact Form */}
        <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
          {/* Left: Contact Form */}
          <div className="bg-white rounded-2xl shadow-md p-6 md:p-8">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Send us a Message
            </h2>
            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                alert("Message sent successfully!");
              }}
            >
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter your name"
                  className="mt-1"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  className="mt-1"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700"
                >
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Write your message here..."
                  className="mt-1"
                  rows={5}
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
              >
                Send Message
              </Button>
            </form>
          </div>

          {/* Right: Contact Info */}
          <div className="flex flex-col justify-center bg-indigo-600 text-white rounded-2xl p-6 md:p-8 shadow-md">
            <h2 className="text-xl font-semibold mb-4">Get in Touch</h2>
            <p className="mb-6 text-indigo-100">
              Reach out to our AI Accessibility team — we usually respond within
              24 hours.
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-indigo-200" />
                <span>support@aiaccessibility.com</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-indigo-200" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-indigo-200" />
                <span>Mangaluru, India</span>
              </div>
            </div>

            <div className="mt-8">
              <Button
                variant="secondary"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="bg-white text-indigo-700 hover:bg-gray-100 w-full"
              >
                Back to Top ↑
              </Button>
            </div>
          </div>
        </div>
      </section>
    </CustomLayout>
  );
}
