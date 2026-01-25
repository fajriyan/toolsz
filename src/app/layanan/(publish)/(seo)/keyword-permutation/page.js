"use client";

import { useState, useMemo } from "react";

export default function KeywordPermutation() {
  const [open, setOpen] = useState(false);
  const [groups, setGroups] = useState(["", "", ""]);

  const parsedGroups = useMemo(() => {
    return groups
      .map((g) =>
        g
          .split("\n")
          .map((v) => v.trim())
          .filter(Boolean),
      )
      .filter((g) => g.length > 0);
  }, [groups]);

  const results = useMemo(() => {
    if (parsedGroups.length === 0) return [];

    return parsedGroups.reduce((acc, curr) => {
      if (acc.length === 0) return curr;
      return acc.flatMap((a) => curr.map((c) => `${a} ${c}`));
    }, []);
  }, [parsedGroups]);

  const updateGroup = (index, value) => {
    const clone = [...groups];
    clone[index] = value;
    setGroups(clone);
  };

  const addGroup = () => setGroups([...groups, ""]);

  const removeGroup = (index) =>
    setGroups(groups.filter((_, i) => i !== index));

  const copyToClipboard = () => {
    navigator.clipboard.writeText(results.join("\n"));
    alert("Copied to clipboard");
  };

  const clearAll = () => setGroups(["", "", ""]);

  const downloadFile = (url, filename) => {
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const exportTXT = () => {
    const blob = new Blob([results.join("\n")], {
      type: "text/plain;charset=utf-8",
    });
    downloadFile(URL.createObjectURL(blob), "keyword-permutation.txt");
  };

  const exportCSV = () => {
    const csv = results.map((k) => `"${k.replace(/"/g, '""')}"`).join("\n");

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8",
    });
    downloadFile(URL.createObjectURL(blob), "keyword-permutation.csv");
  };

  return (
    <div className="">
      <div className="container mx-auto mb-10 px-3 md:px-0 min-h-[80dvh]">
        <div className="py-5">
          <h1 className="text-xl text-center font-semibold">
            Keyword Permutation Generator | SEO Tools
          </h1>
          <p className="text-center text-xs text-gray-600">
            Buat berbagai kombinasi keyword secara instan untuk riset SEO,
            konten, dan optimasi pencarian.
          </p>
        </div>

        <div className="border border-slate-500 rounded-lg p-3 pt-5 relative mt-5">
          <span className="absolute text-sm bg-white -top-3 left-3 px-2">
            Pengaturan
          </span>
          <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-4">
            {groups.map((group, index) => (
              <div key={index} className="border rounded-lg px-3 py-2">
                <div className="flex justify-between mb-2">
                  <span className="font-semibold text-sm">
                    Keyword ({index + 1})
                  </span>
                  {groups.length > 1 && (
                    <button
                      onClick={() => removeGroup(index)}
                      className="text-red-500 text-sm"
                    >
                      <svg
                        className="w-4 h-4"
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
                          d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"
                        />
                      </svg>
                    </button>
                  )}
                </div>

                <textarea
                  rows={6}
                  value={group}
                  onChange={(e) => updateGroup(index, e.target.value)}
                  placeholder="Pisahkan dengan Break / Line"
                  className="w-full border rounded-md p-2 text-sm resize-none"
                />

                <p className="text-xs text-gray-500 mt-1">
                  {group.split("\n").filter((v) => v.trim()).length} Keyword
                </p>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-3 mt-6">
            <button
              onClick={addGroup}
              className="bg-gradient-to-r hover:bg-gradient-to-b text-sm from-gray-800 to-slate-700 hover:to-slate-950 text-white px-4 py-2 rounded-lg flex items-center gap-1"
            >
              <svg
                className="w-5 h-5 text-white"
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
                  d="M5 12h14m-7 7V5"
                />
              </svg>
              Tambah Keyword
            </button>

            <button
              onClick={copyToClipboard}
              className="bg-gradient-to-r hover:bg-gradient-to-b text-sm from-gray-800 to-slate-700 hover:to-slate-950 text-white px-4 py-2 rounded-lg flex items-center gap-1"
            >
              <svg
                className="w-5 h-5 text-white"
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
                  d="M15 4h3a1 1 0 0 1 1 1v15a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h3m0 3h6m-6 5h6m-6 4h6M10 3v4h4V3h-4Z"
                />
              </svg>
              Copy Semua
            </button>

            <div className="relative inline-block text-left">
              {/* Button utama */}
              <button
                onClick={() => setOpen(!open)}
                className="bg-gradient-to-r hover:bg-gradient-to-b text-sm from-gray-800 to-slate-700 hover:to-slate-950 text-white px-5 py-2 rounded-lg flex items-center gap-1"
              >
                Export
                <svg
                  className="w-4 h-4"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {/* Dropdown menu */}
              {open && (
                <div className="absolute right-0 z-10 mt-2 w-44 rounded-md bg-white shadow-lg ring-1 ring-black/5">
                  <button
                    onClick={() => {
                      exportTXT();
                      setOpen(false);
                    }}
                    className="flex w-full items-center gap-2 px-4 py-2 text-xs hover:bg-gray-100"
                  >
                    Export TXT
                  </button>

                  <button
                    onClick={() => {
                      exportCSV();
                      setOpen(false);
                    }}
                    className="flex w-full items-center gap-2 px-4 py-2 text-xs hover:bg-gray-100"
                  >
                    Export CSV
                  </button>
                </div>
              )}
            </div>

            <button onClick={clearAll} className="">
              <svg
                className="w-6 h-6 text-gray-800"
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
                  d="M7.757 12h8.486M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="border border-slate-500 rounded-lg p-3 pt-5 relative mt-10">
          <span className="absolute text-sm bg-white -top-3 left-3 px-2">
            Output Keyword Permutation
          </span>
          <div className="">
            <textarea
              readOnly
              value={results.join("\n")}
              rows={12}
              className="w-full border rounded-md p-3 text-sm bg-gray-50"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
