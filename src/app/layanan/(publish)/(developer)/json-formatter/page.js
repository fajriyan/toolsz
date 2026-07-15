"use client";

import { useState, useMemo, useEffect, useCallback, memo } from "react";

function collectPaths(node, path, acc) {
   if (node !== null && typeof node === "object") {
      const isArr = Array.isArray(node);
      const entries = isArr ? node.map((v, i) => [i, v]) : Object.entries(node);
      if (entries.length > 0) acc.push(path);
      entries.forEach(([k, v]) => collectPaths(v, `${path}.${k}`, acc));
   }
}

function buildLines(
   node,
   keyLabel,
   path,
   depth,
   isLast,
   collapsedPaths,
   lines,
) {
   const comma = isLast ? "" : ",";

   if (node !== null && typeof node === "object") {
      const isArr = Array.isArray(node);
      const entries = isArr ? node.map((v, i) => [i, v]) : Object.entries(node);
      const bracketOpen = isArr ? "[" : "{";
      const bracketClose = isArr ? "]" : "}";

      if (entries.length === 0) {
         lines.push({
            id: path,
            depth,
            kind: "emptyBracket",
            keyLabel,
            bracketOpen,
            bracketClose,
            comma,
         });
         return;
      }

      const isCollapsed = collapsedPaths.has(path);

      if (isCollapsed) {
         lines.push({
            id: path,
            depth,
            kind: "collapsed",
            keyLabel,
            bracketOpen,
            bracketClose,
            count: entries.length,
            comma,
            foldable: true,
            collapsed: true,
            path,
         });
         return;
      }

      lines.push({
         id: path,
         depth,
         kind: "open",
         keyLabel,
         bracketOpen,
         foldable: true,
         collapsed: false,
         path,
      });

      entries.forEach(([k, v], idx) => {
         const childKeyLabel = isArr ? null : k;
         const childPath = `${path}.${k}`;
         buildLines(
            v,
            childKeyLabel,
            childPath,
            depth + 1,
            idx === entries.length - 1,
            collapsedPaths,
            lines,
         );
      });

      lines.push({
         id: `${path}::close`,
         depth,
         kind: "close",
         bracketClose,
         comma,
      });
      return;
   }

   lines.push({
      id: path,
      depth,
      kind: "primitive",
      keyLabel,
      valueType: typeof node === "object" ? "null" : typeof node,
      value: node,
      comma,
   });
}

function renderPrimitive(valueType, value) {
   if (valueType === "string") {
      return <span className="text-emerald-700">"{value}"</span>;
   }
   if (valueType === "number") {
      return <span className="text-blue-600">{value}</span>;
   }
   if (valueType === "boolean") {
      return (
         <span className="text-purple-600">{value ? "true" : "false"}</span>
      );
   }
   return <span className="text-gray-500">null</span>;
}

function KeyPrefix({ label }) {
   if (label === null || label === undefined) return null;
   return (
      <>
         <span className="text-sky-700">"{label}"</span>
         <span className="text-gray-600">: </span>
      </>
   );
}

const LineRow = memo(function LineRow({
   depth,
   kind,
   keyLabel,
   bracketOpen,
   bracketClose,
   count,
   comma,
   foldable,
   collapsed,
   valueType,
   value,
   path,
   indent,
   onToggle,
}) {
   let inner;
   if (kind === "emptyBracket") {
      inner = (
         <>
            <KeyPrefix label={keyLabel} />
            <span className="text-gray-500">
               {bracketOpen}
               {bracketClose}
            </span>
            {comma}
         </>
      );
   } else if (kind === "collapsed") {
      inner = (
         <>
            <KeyPrefix label={keyLabel} />
            <span className="text-gray-500">{bracketOpen}</span>
            <span className="text-gray-400 mx-0.5">…</span>
            <span className="text-gray-500">{bracketClose}</span>
            <span className="text-gray-400 ml-1">({count})</span>
            {comma}
         </>
      );
   } else if (kind === "open") {
      inner = (
         <>
            <KeyPrefix label={keyLabel} />
            <span className="text-gray-500">{bracketOpen}</span>
         </>
      );
   } else if (kind === "close") {
      inner = (
         <span className="text-gray-500">
            {bracketClose}
            {comma}
         </span>
      );
   } else {
      inner = (
         <>
            <KeyPrefix label={keyLabel} />
            {renderPrimitive(valueType, value)}
            {comma}
         </>
      );
   }

   return (
      <div
         className="relative pr-3 whitespace-pre-wrap break-words group-hover:bg-gray-200"
         style={{ paddingLeft: `${depth * indent + (foldable ? 1.2 : 0)}ch` }}
      >
         {foldable && (
            <button
               onClick={() => onToggle(path)}
               className="absolute text-gray-500 hover:text-gray-900 select-none"
               style={{ left: `${depth * indent}ch`, top: 2 }}
               aria-label="toggle fold"
            >
               {collapsed ? "▸" : "▾"}
            </button>
         )}
         {inner}
      </div>
   );
});

export default function JsonFormatterPage() {
   const [inputJson, setInputJson] = useState("");
   const [outputJson, setOutputJson] = useState("");
   const [indent, setIndent] = useState(3);
   const [error, setError] = useState("");
   const [parsedData, setParsedData] = useState(null);
   const [viewMode, setViewMode] = useState("tree");
   const [collapsedPaths, setCollapsedPaths] = useState(new Set());

   const handleFormat = () => {
      try {
         const parsed = JSON.parse(inputJson);
         setParsedData(parsed);
         setOutputJson(JSON.stringify(parsed, null, indent));
         setViewMode("tree");
         setCollapsedPaths(new Set());
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
         setParsedData(null);
         setViewMode("text");
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

   const toggleFold = useCallback((path) => {
      setCollapsedPaths((prev) => {
         const next = new Set(prev);
         if (next.has(path)) next.delete(path);
         else next.add(path);
         return next;
      });
   }, []);

   const expandAll = () => setCollapsedPaths(new Set());

   const collapseAll = () => {
      if (!parsedData) return;
      const acc = [];
      collectPaths(parsedData, "root", acc);
      setCollapsedPaths(new Set(acc));
   };

   useEffect(() => {
      if (parsedData) {
         setOutputJson(JSON.stringify(parsedData, null, indent));
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [indent]);

   const lines = useMemo(() => {
      if (!parsedData) return [];
      const acc = [];
      buildLines(parsedData, null, "root", 0, true, collapsedPaths, acc);
      return acc;
   }, [parsedData, collapsedPaths]);

   const textLines = outputJson.split("\n");

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
                  <div className="grid grid-cols-[40px_1fr] font-mono text-sm leading-6">
                     {viewMode === "tree" &&
                        lines.map((line, index) => (
                           <div key={line.id} className="contents group">
                              <div className="text-right text-xs flex justify-center items-start pt-1 bg-gray-100 text-gray-500 select-none group-hover:bg-gray-200">
                                 {index + 1}
                              </div>
                              <LineRow
                                 {...line}
                                 indent={indent}
                                 onToggle={toggleFold}
                              />
                           </div>
                        ))}

                     {viewMode === "text" &&
                        textLines.map((line, index) => (
                           <div key={index} className="contents group">
                              <div className="text-right text-xs flex justify-center items-start pt-1 bg-gray-100 text-gray-500 select-none group-hover:bg-gray-200">
                                 {index + 1}
                              </div>
                              <div className="pr-3 whitespace-pre-wrap break-words group-hover:bg-gray-200">
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
                     className="bg-gradient-to-r hover:bg-gradient-to-b text-sm from-gray-800 to-slate-700 hover:to-slate-950 text-white px-5 py-2 rounded-lg flex items-center gap-1"
                  >
                     Format / Beautify
                  </button>

                  <button
                     onClick={handleMinify}
                     className="bg-gradient-to-r hover:bg-gradient-to-b text-sm from-gray-800 to-slate-700 hover:to-slate-950 text-white px-5 py-2 rounded-lg flex items-center gap-1"
                  >
                     Minify / Compact
                  </button>

                  {viewMode === "tree" && parsedData && (
                     <>
                        <button
                           onClick={expandAll}
                           className="border text-sm px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100"
                        >
                           Expand All
                        </button>
                        <button
                           onClick={collapseAll}
                           className="border text-sm px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100"
                        >
                           Collapse All
                        </button>
                     </>
                  )}

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
