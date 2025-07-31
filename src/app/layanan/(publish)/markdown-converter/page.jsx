"use client";

import { useState, useEffect } from "react";
import { marked } from "marked";
import createDOMPurify from "dompurify";

export default function MarkdownConverterPage() {
  const [markdown, setMarkdown] = useState("# Halo Dunia");
  const [activeTab, setActiveTab] = useState("preview"); // 'preview' or 'html'
  const [cleanHtml, setCleanHtml] = useState(""); // HTML hasil setelah disanitasi

  // Jalankan hanya di client setelah render
  useEffect(() => {
    const DOMPurify = createDOMPurify(window);
    const dirtyHtml = marked.parse(markdown);
    const sanitized = DOMPurify.sanitize(dirtyHtml);
    setCleanHtml(sanitized);
  }, [markdown]);

  return (
    <div className="min-h-screen">
      <div className="container mx-auto mb-10 px-3 md:px-0">
        <div className="py-5">
          <h1 className="text-xl text-center font-semibold">
            Markdown to HTML Converter | Developer Tools
          </h1>
          <p className="text-center text-xs">
            Hasilkan HTML dari Markdown secara langsung
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Markdown Editor */}
          <div>
            <label className="block mb-2 font-medium">Markdown Input</label>
            <textarea
              className="w-full h-[400px] p-4 border rounded resize-none font-mono border-slate-700"
              value={markdown}
              onChange={(e) => setMarkdown(e.target.value)}
            />
          </div>

          {/* Tab Section */}
          <div className="flex flex-col h-[430px] relative">
            {/* Tab Buttons */}
            <div className="flex border-b ">
              <button
                onClick={() => setActiveTab("preview")}
                className={`px-4 py-2 font-medium ${
                  activeTab === "preview"
                    ? "bg-slate-800 text-white rounded-md"
                    : "text-gray-600"
                }`}
              >
                HTML Preview
              </button>
              <button
                onClick={() => setActiveTab("html")}
                className={`px-4 py-2 font-medium ${
                  activeTab === "html"
                    ? "bg-slate-800 text-white rounded-md"
                    : "text-gray-600"
                }`}
              >
                HTML Code
              </button>
            </div>

            {/* Tab Content */}
            <div className=" h-full overflow-auto border rounded-b bg-white p-4 border-slate-700 rounded-lg">
              {activeTab === "preview" ? (
                <div
                  className="prose max-w-none"
                  dangerouslySetInnerHTML={{ __html: cleanHtml }}
                />
              ) : (
                <pre className="whitespace-pre-wrap text-sm text-gray-800">
                  {cleanHtml}
                </pre>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
