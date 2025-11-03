"use client";

import { useState } from "react";

export default function HtmlViewer() {
  const [url, setUrl] = useState("");
  const [userAgent, setUserAgent] = useState("googlebot");
  const [html, setHtml] = useState("");
  const [tab, setTab] = useState("code");
  const [loading, setLoading] = useState(false);

  async function handleFetch() {
    setLoading(true);
    setHtml("");
    try {
      const res = await fetch("/layanan/crawler-simulator/api", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, userAgent }),
      });
      const data = await res.json();
      if (data.html) setHtml(data.html);
      else alert(data.error || "Gagal mengambil HTML");
    } catch (e) {
      alert(e.message);
    }
    setLoading(false);
  }

  function beautifyHTML(html) {
    const voidTags = [
      "area",
      "base",
      "br",
      "col",
      "embed",
      "hr",
      "img",
      "input",
      "link",
      "meta",
      "param",
      "source",
      "track",
      "wbr",
    ];

    const lines = html
      .replace(/>\s+</g, ">\n<") // hapus spasi antar tag dan buat newline
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line !== "");

    let indent = 0;
    const formatted = lines.map((line) => {
      const isClosingTag = /^<\//.test(line);
      const isOpeningTag = /^<\w/.test(line) && !/^<\//.test(line);
      const isVoidTag = voidTags.some((tag) => line.startsWith(`<${tag}`));

      if (isClosingTag) indent = Math.max(indent - 2, 0);

      const indentedLine = " ".repeat(indent) + line;

      if (isOpeningTag && !isVoidTag && !line.endsWith("/>")) indent += 2;

      return indentedLine;
    });

    return formatted.join("\n");
  }

  return (
    <main className="container mx-auto mb-10 px-3 md:px-0 min-h-[80dvh]">
      <div className="py-5">
        <h1 className="text-xl text-center font-semibold">
          Crawler Simulator Online | SEO Tools
        </h1>
        <p className="text-center text-xs">
          Alat sederhana untuk simulasi bot Google Crawling website.
        </p>
      </div>

      <div className="flex flex-col md:w-[80%] xl:w-[50%] mx-auto gap-4 mt-8">
        <div className="">
          <input
            type="text"
            placeholder="Masukkan URL Website"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full px-3 py-2 focus-within:outline-none focus:border-cyan-700 border border-gray-300 rounded mb-4"
          />
          <div className="flex gap-3 items-center">
            <select
              value={userAgent}
              onChange={(e) => setUserAgent(e.target.value)}
              className="focus-within:outline-none focus:border-cyan-700 border border-gray-300 rounded  p-2"
            >
              <option value="googlebot">Googlebot</option>
              <option value="bingbot">Bingbot</option>
              <option value="chrome">Chrome</option>
            </select>
            <button
              onClick={handleFetch}
              className="block bg-gradient-to-r from-gray-800 to-slate-900 hover:ring-2 ring-cyan-500 font-medium text-white px-3 py-[7px] w-full text-center cursor-pointer rounded-lg"
            >
              {loading ? "Memuat Website..." : "Identifikasi Website"}
            </button>
          </div>
        </div>
      </div>

      <div className=" mt-10">
        <div>
          <div className="flex gap-2 mb-2">
            <button
              onClick={() => setTab("code")}
              className={`px-4 py-1.5 text-sm rounded-lg ${
                tab === "code" ? "bg-gray-700 text-white" : "bg-gray-100"
              }`}
            >
              Code
            </button>
            <button
              onClick={() => setTab("render")}
              className={`px-4 py-1.5 text-sm rounded-lg ${
                tab === "render" ? "bg-gray-700 text-white" : "bg-gray-100"
              }`}
            >
              Render
            </button>
          </div>
          <div className="border p-2 rounded-md border-slate-300 h-[500px] overflow-auto">
            {tab === "code" ? (
              <pre style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
                {beautifyHTML(html)}
              </pre>
            ) : (
              <iframe srcDoc={html} className="w-full h-full" />
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
