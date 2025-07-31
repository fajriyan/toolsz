"use client";

import { useState } from "react";
import { diffLines } from "diff";
import { diffWords } from "diff";

export default function ComparePage() {
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");
  const [diffResult1, setDiffResult1] = useState([]);
  const [diffResult2, setDiffResult2] = useState([]);
  const [mode, setMode] = useState("words");

  const handleCompare = () => {
    const diffs = diffLines(text1, text2);

    let lineNum1 = 1;
    let lineNum2 = 1;

    const result1 = diffs
      .map((part, index) => {
        const lines = part.value
          .split("\n")
          .filter((line, idx, arr) => idx !== arr.length - 1); // Hapus line kosong terakhir
        return lines.map((line, lineIndex) => {
          const style = {
            backgroundColor: part.removed ? "#fbb" : "transparent",
            display: "flex",
            whiteSpace: "pre-wrap",
          };
          const lineContent = part.removed || !part.added ? line : "";
          const content =
            lineContent !== "" ? (
              <>
                <span
                  style={{
                    width: "2em",
                    textAlign: "right",
                    marginRight: "0.5em",
                    color: "#999",
                  }}
                >
                  {lineNum1++}
                </span>
                <span>{lineContent}</span>
              </>
            ) : null;
          return (
            content && (
              <div key={`${index}-${lineIndex}`} style={style}>
                {content}
              </div>
            )
          );
        });
      })
      .flat();

    const result2 = diffs
      .map((part, index) => {
        const lines = part.value
          .split("\n")
          .filter((line, idx, arr) => idx !== arr.length - 1); // Hapus line kosong terakhir
        return lines.map((line, lineIndex) => {
          const style = {
            backgroundColor: part.added ? "#bfb" : "transparent",
            display: "flex",
            whiteSpace: "pre-wrap",
          };
          const lineContent = part.added || !part.removed ? line : "";
          const content =
            lineContent !== "" ? (
              <>
                <span
                  style={{
                    width: "2em",
                    textAlign: "right",
                    marginRight: "0.5em",
                    color: "#999",
                  }}
                >
                  {lineNum2++}
                </span>
                <span>{lineContent}</span>
              </>
            ) : null;
          return (
            content && (
              <div key={`${index}-${lineIndex}`} style={style}>
                {content}
              </div>
            )
          );
        });
      })
      .flat();

    setDiffResult1(result1);
    setDiffResult2(result2);
  };

  const handleCompareWords = () => {
    const diffs = diffWords(text1, text2); // Pakai diffWords untuk membandingkan per kata

    const result1 = diffs.map((part, index) => {
      const style = {
        backgroundColor: part.removed ? "#fbb" : "transparent",
        display: "inline",
        whiteSpace: "pre-wrap",
      };
      return (
        <span key={index} style={style}>
          {part.removed || !part.added ? part.value : ""}
        </span>
      );
    });

    const result2 = diffs.map((part, index) => {
      const style = {
        backgroundColor: part.added ? "#bfb" : "transparent",
        display: "inline",
        whiteSpace: "pre-wrap",
      };
      return (
        <span key={index} style={style}>
          {part.added || !part.removed ? part.value : ""}
        </span>
      );
    });

    setDiffResult1(result1);
    setDiffResult2(result2);
  };

  return (
    <div className="container mx-auto mb-10 px-3 md:px-0 min-h-screen">
      <div className="py-5">
        <h1 className="text-xl text-center font-semibold">
          Text Compare | SEO Tools
        </h1>
        <p className="text-center text-xs">
          Komparasikan 2 text dengan mudah dengan sekali klik
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 sm:space-x-4 min-h-[300px]">
        <textarea
          value={text1}
          onChange={(e) => setText1(e.target.value)}
          placeholder="Masukan Input Text Pertama"
          className="w-full min-h-[200px] sm:w-1/2 border p-2 border-slate-600 rounded-md"
        />
        <textarea
          value={text2}
          onChange={(e) => setText2(e.target.value)}
          placeholder="Masukan Input Text Kedua"
          className="w-full min-h-[200px] sm:w-1/2 border p-2 border-slate-600 rounded-md"
        />
      </div>
      <div className="mt-4 text-center ">
        <div className="flex gap-3">
          <select
            className="px-3 py-2 border border-slate-500 rounded-lg"
            onChange={(e) => setMode(e.target.value)}
          >
            <option value="words">Words</option>
            <option value="line">Line</option>
          </select>
          <button
            onClick={mode == "line" ? handleCompare : handleCompareWords}
            className="flex bg-gradient-to-r from-gray-800 to-slate-900 hover:from-cyan-950 hover:to-cyan-950 font-medium text-white px-3 py-[7px] min-w-max rounded-lg gap-1 items-center"
          >
            Compare
          </button>
        </div>
        <div className="mt-2 flex text-xs gap-1 sm:gap-2">
          <svg
            className="w-4 h-4 text-gray-800 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 11h2v5m-2 0h4m-2.592-8.5h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
          <span className="w-[95%] text-left">
            Gunakan mode Words untuk text paragraf dan mode Line untuk code
            (json, html, dll)
          </span>
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:space-x-4 min-h-[300px]">
        <div className="w-full min-h-[200px] sm:w-1/2 border p-2 border-slate-600 rounded-md">
          <div>{diffResult1}</div>
        </div>
        <div className="w-full min-h-[200px] sm:w-1/2 border p-2 border-slate-600 rounded-md">
          <div>{diffResult2}</div>
        </div>
      </div>
    </div>
  );
}
