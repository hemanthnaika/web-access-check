import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import CustomLayout from "@/layout/customLayout";

export default function Contact() {
  const [loading, setLoading] = useState(false);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    const form = event.currentTarget;
    const formData = new FormData(form);
    formData.append("access_key", import.meta.env.VITE_WEB3API_KEY);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (data.success) {
        alert("Success send the message");
        form.reset();
      } else {
        alert("Error");
      }
    } catch (error) {
      console.error("Submission failed:", error);
      alert("Error sending message. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <CustomLayout>
      <section className="min-h-screen pt-24 pb-16 px-5 md:px-10">
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
        <div className=" max-w-xl mx-auto flex items-center justify-center">
          <div className="bg-white rounded-2xl shadow-md p-6 md:p-8 w-full">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Send us a Message
            </h2>
            <form className="space-y-4" onSubmit={onSubmit}>
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
                  className="mt-1 "
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
                disabled={loading}
                className={`w-full ${
                  loading
                    ? "bg-indigo-400 cursor-not-allowed"
                    : "bg-indigo-600 hover:bg-indigo-700"
                } text-white`}
              >
                {loading ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </div>
        </div>
      </section>
    </CustomLayout>
  );
}
