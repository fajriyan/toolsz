"use client";

import { useState } from "react";

export default function JsonFormatterPage() {
  const [inputJson, setInputJson] = useState("");
  const [outputJson, setOutputJson] = useState("");
  const [indent, setIndent] = useState(3);
  const [error, setError] = useState("");

  const handleFormat = () => {
    try {
      const parsed = JSON.parse(inputJson);
      const formatted = JSON.stringify(parsed, null, indent);
      setOutputJson(formatted);
      setError("");
    } catch (err) {
      setError("Invalid JSON format");
    }
  };

  const handleMinify = () => {
    try {
      const parsed = JSON.parse(inputJson);
      const minified = JSON.stringify(parsed);
      setOutputJson(minified);
      setError("");
    } catch (err) {
      setError("Invalid JSON format");
    }
  };

  const handleDownload = () => {
    const blob = new Blob([outputJson], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "formatted.json";
    a.click();

    URL.revokeObjectURL(url);
  };

  const outputLines = outputJson.split("\n");

  const isStringValueLine = (line) => /^(\s*)"[^"]+":\s*"/.test(line);

  const getValueIndent = (line) => {
    const match = line.match(/^(\s*"[^"]+":\s*)"/);
    return match ? match[1].length : 0;
  };

  return (
    <div className="">
      <div className="container mx-auto min-h-[84vh] px-3 lg:px-0 pb-20">
        <div className="py-5">
          <h1 className="text-xl text-center font-semibold">
            JSON Formatter | Developer Tools
          </h1>
          <p className="text-center text-xs">
            Beautify, minify, dan kelola JSON dengan cepat dan rapi.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <textarea
            placeholder="Paste JSON Disini"
            value={inputJson}
            style={{ resize: "none" }}
            onChange={(e) => setInputJson(e.target.value)}
            className="border rounded p-3 min-h-[300px] font-mono text-sm"
          />

          <div className="border rounded h-[400px] lg:h-[500px] overflow-auto bg-gray-50">
            <div className="grid grid-cols-[40px_1fr] font-mono text-sm leading-6 ">
              {outputLines.map((line, index) => (
                <div key={index} className="contents group">
                  <div className="text-right text-xs flex justify-center items-start pt-1 bg-gray-100 text-gray-500 select-none  group-hover:bg-gray-200">
                    {index + 1}
                  </div>

                  <div
                    className=" pr-3 whitespace-pre-wrap break-words group-hover:bg-gray-200"
                    style={
                      isStringValueLine(line)
                        ? {
                            paddingLeft: `${getValueIndent(line)}ch`,
                            textIndent: `-${getValueIndent(line)}ch`,
                          }
                        : {}
                    }
                  >
                    {line || " "}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 items-center mt-7">
          <div className="flex flex-col w-full sm:flex-row gap-3 border border-slate-300 rounded-xl p-2 sm:w-max">
            <select
              value={indent}
              onChange={(e) => setIndent(Number(e.target.value))}
              className="border px-3 py-2 rounded-lg"
            >
              <option value={2}>Tab 2</option>
              <option value={3}>Tab 3</option>
              <option value={4}>Tab 4</option>
              <option value={5}>Tab 5</option>
            </select>

            <button
              onClick={handleFormat}
              className=" bg-gradient-to-r hover:bg-gradient-to-b text-sm from-gray-800 to-slate-700 hover:to-slate-950 text-white px-5 py-2 rounded-lg flex items-center gap-1"
            >
              Format / Beautify
            </button>

            <button
              onClick={handleMinify}
              className="bg-gradient-to-r hover:bg-gradient-to-b text-sm from-gray-800 to-slate-700 hover:to-slate-950 text-white px-5 py-2 rounded-lg flex items-center gap-1"
            >
              Minify / Compact
            </button>

            <button
              onClick={handleDownload}
              disabled={!outputJson}
              className="text-gray-800 disabled:opacity-50 text-xs"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                className="bi bi-file-earmark-arrow-down"
                viewBox="0 0 16 16"
              >
                <path d="M8.5 6.5a.5.5 0 0 0-1 0v3.793L6.354 9.146a.5.5 0 1 0-.708.708l2 2a.5.5 0 0 0 .708 0l2-2a.5.5 0 0 0-.708-.708L8.5 10.293z" />
                <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2M9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5z" />
              </svg>
            </button>
          </div>

          {error && <p className="text-red-600">{error}</p>}
        </div>
      </div>
    </div>
  );
}
