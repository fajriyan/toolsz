"use client";

import { useState } from "react";

export default function RobotsTxtGenerator() {
  const [access, setAccess] = useState("Allow");
  const [crawlDelay, setCrawlDelay] = useState("");
  const [sitemap, setSitemap] = useState("");
  const [directives, setDirectives] = useState([]);
  const [preview, setPreview] = useState("User-agent: *\nAllow: /\n");

  const handleAccessChange = (e) => {
    setAccess(e.target.value);
    updatePreview(e.target.value, directives, crawlDelay, sitemap);
  };

  const handleCrawlDelayChange = (e) => {
    setCrawlDelay(e.target.value);
    updatePreview(access, directives, e.target.value, sitemap);
  };

  const handleSitemapChange = (e) => {
    setSitemap(e.target.value);
    updatePreview(access, directives, crawlDelay, e.target.value);
  };

  const handleAddDirective = () => {
    setDirectives([
      ...directives,
      { access: "Allow", direction: "/", bot: "*" },
    ]);
  };

  const handleDirectiveChange = (index, field, value) => {
    const newDirectives = [...directives];
    newDirectives[index][field] = value;
    setDirectives(newDirectives);
    updatePreview(access, newDirectives, crawlDelay, sitemap);
  };

  const handleRemoveDirective = (index) => {
    const newDirectives = directives.filter((_, i) => i !== index);
    setDirectives(newDirectives);
    updatePreview(access, newDirectives, crawlDelay, sitemap);
  };

  const updatePreview = (access, directives, crawlDelay, sitemap) => {
    let previewContent = `User-agent: *\n${access}: /\n`;

    directives.forEach((directive) => {
      previewContent += `\nUser-agent: ${directive.bot}\n${directive.access}: ${directive.direction}\n`;
    });

    if (crawlDelay) {
      previewContent += `\nCrawl-delay: ${crawlDelay}\n`;
    }

    if (sitemap) {
      previewContent += `\nSitemap: ${sitemap}\n`;
    }

    setPreview(previewContent);
  };

  const handleReset = () => {
    setAccess("Allow");
    setCrawlDelay("");
    setSitemap("");
    setDirectives([]);
    setPreview("User-agent: *\nAllow: /\n");
  };

  const handleDownload = () => {
    const blob = new Blob([preview], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "robots.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(preview);
    alert("Copied to clipboard!");
  };

  return (
    <div className="container mx-auto min-h-[83vh] z-0 px-3 md:px-0">
      <div className="py-5">
        <h1 className="text-xl text-center font-semibold">
          Robots.txt Generator
        </h1>
        <p className="text-center text-xs">Hasilkan Robots.txt dengan Mudah</p>
      </div>

      <div className="mt-7 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <div className="mb-4">
            <label className="block mb-2">Default Robot Access</label>
            <select
              value={access}
              onChange={handleAccessChange}
              className="border border-slate-700 rounded w-full py-2 px-3"
            >
              <option value="Allow">Allow</option>
              <option value="Disallow">Disallow</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block mb-2">Crawl Delay (Detik)</label>
            <input
              type="number"
              value={crawlDelay}
              onChange={handleCrawlDelayChange}
              className="border border-slate-700 rounded w-full py-2 px-3"
              placeholder="Contoh: 10"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2">Sitemap URL</label>
            <input
              type="url"
              value={sitemap}
              onChange={handleSitemapChange}
              className="border border-slate-700 rounded w-full py-2 px-3"
              placeholder="Contoh: https://toolsz.vercel.app/sitemap.xml"
            />
          </div>

          <div className="mb-4">
            <button
              onClick={handleAddDirective}
              className="bg-gradient-to-r from-gray-800 to-slate-900 hover:from-slate-950 hover:to-black text-white px-5 py-[7px] rounded-md focus:ring-2 ring-offset-2 ring-slate-800"
            >
              Tambah Directive
            </button>
          </div>

          {directives.map((directive, index) => (
            <div
              key={index}
              className="mb-4 p-4 border border-slate-700 rounded"
            >
              <div className="mb-2 flex justify-between">
                <label className="block mb-2">Directive #{index + 1}</label>
                <button
                  onClick={() => handleRemoveDirective(index)}
                  className="hover:scale-105"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0" />
                  </svg>
                </button>
              </div>
              <div className="flex justify-between gap-5">
                <div className="w-[40%]">
                  <label className="">Bot</label>
                  <input
                    type="text"
                    value={directive.bot}
                    onChange={(e) =>
                      handleDirectiveChange(index, "bot", e.target.value)
                    }
                    className="border border-slate-700 rounded w-full h-[40px] px-3"
                    placeholder="Contoh: Googlebot"
                  />
                </div>
                <div className="w-[20%]">
                  <label className="">Access</label>
                  <select
                    value={directive.access}
                    onChange={(e) =>
                      handleDirectiveChange(index, "access", e.target.value)
                    }
                    className="border border-slate-700 rounded w-full h-[40px] px-3"
                  >
                    <option value="Allow">Allow</option>
                    <option value="Disallow">Disallow</option>
                  </select>
                </div>
                <div className="w-[40%]">
                  <label className="">Direction</label>
                  <input
                    type="text"
                    value={directive.direction}
                    onChange={(e) =>
                      handleDirectiveChange(index, "direction", e.target.value)
                    }
                    className="border border-slate-700 rounded w-full h-[40px] px-3"
                    placeholder="Contoh: /"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="">
          <h2>Preview robots.txt</h2>
          <div className="z-0">
            <div className=" flex space-x-2 mb-4">
              <button
                onClick={handleDownload}
                className="bg-gradient-to-r from-gray-800 to-slate-900 hover:from-slate-950 hover:to-black text-white px-3 py-[7px] rounded-md focus:ring-2 ring-offset-2 ring-slate-800"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-download"
                  viewBox="0 0 16 16"
                >
                  <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5" />
                  <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z" />
                </svg>
              </button>
              <button
                onClick={handleCopy}
                className="bg-gradient-to-r from-gray-800 to-slate-900 hover:from-slate-950 hover:to-black text-white px-3 py-[7px] rounded-md focus:ring-2 ring-offset-2 ring-slate-800"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1z"
                  />
                </svg>
              </button>
              <button
                onClick={handleReset}
                className="bg-gradient-to-r from-gray-800 to-slate-900 hover:from-slate-950 hover:to-black text-white px-3 py-[7px] rounded-md focus:ring-2 ring-offset-2 ring-slate-800"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41m-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9" />
                  <path
                    fill-rule="evenodd"
                    d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5 5 0 0 0 8 3M3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9z"
                  />
                </svg>
              </button>
            </div>
            <textarea
              className="border border-slate-700 rounded w-full h-48 py-2 px-3"
              value={preview}
              readOnly
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  );
}
