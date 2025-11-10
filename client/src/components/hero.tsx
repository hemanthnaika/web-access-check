import { appImg } from "@/assets";
import { useState } from "react";
import { useNavigate } from "react-router";

const Hero = () => {
  const navigate = useNavigate();
  const [url, setUrl] = useState("");
  const [pages, setPages] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!url) return alert("Please enter a website URL");
    if (!pages) return alert("Please select no. of pages");

    // Navigate with query params
    navigate(`/check?url=${encodeURIComponent(url)}&pages=${pages}`);
  };

  return (
    <div>
      <div className="flex flex-col items-center max-md:px-2 mt-20 md:mt-32">
        <h1 className="text-center text-5xl leading-[68px] md:text-6xl md:leading-[80px] font-semibold max-w-4xl text-slate-900 mt-6">
          The fastest way to audit your website’s accessibility.
        </h1>

        <p className="text-center text-base text-slate-700 max-w-lg mt-3">
          AccessCheck helps you analyze, fix, and improve accessibility
          effortlessly — so everyone can use your website.
        </p>

        <div className="flex items-center gap-4 mt-8 md:min-w-2xl ">
          <form
            onSubmit={handleSubmit}
            className="bg-primary flex items-center px-2 py-1 rounded-full w-full"
          >
            <input
              aria-label="Enter your website URL"
              type="text"
              placeholder="Enter your website URL"
              className="flex-1 w-full px-5 py-1 rounded-xl outline-none text-sm md:text-md"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />

            <div className="flex items-center gap-1">
              <select
                aria-label="Number of pages"
                className="px-1 md:px-4 py-2 rounded-lg bg-secondary text-black shadow-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none cursor-pointer text-sm md:text-md"
                value={pages}
                onChange={(e) => setPages(e.target.value)}
              >
                <option value="">No. of pages</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </select>

              <button className="bg-indigo-600 text-white px-1 md:px-5 py-2 rounded-xl hover:bg-indigo-500 rounded-r-full">
                Analyze
              </button>
            </div>
          </form>
        </div>

        <div className="bg-white p-5 rounded-lg shadow-lg mt-10">
          <img
            loading="lazy"
            src={appImg}
            alt="AccessCheck Preview"
            className="w-full  max-w-5xl  "
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
