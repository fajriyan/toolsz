"use client";

import { useRef, useState } from "react";
import { cdnGroups } from "./data";
import toast from "react-hot-toast";

export default function CDNGenerator() {
  const [selected, setSelected] = useState([]);
  const [showUsage, setShowUsage] = useState(false);

  console.log(selected);
  const handleToggle = (name) => {
    setSelected((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name],
    );
  };

  const getScripts = () => {
    let allScripts = [];
    Object.values(cdnGroups).forEach((group) => {
      group.forEach((item) => {
        if (selected.includes(item.name)) {
          allScripts = [...allScripts, ...item.scripts];
        }
      });
    });
    return allScripts.join("\n");
  };

  const getUsages = () => {
    let result = [];
    Object.values(cdnGroups).forEach((group) => {
      group.forEach((item) => {
        if (selected.includes(item.name) && item.usage) {
          result.push(`// ${item.name} Usage\n${item.usage}`);
        }
      });
    });
    return result.join("\n\n");
  };

  const previewRef = useRef(null);
  const handleCopy = () => {
    if (previewRef.current) {
      navigator.clipboard.writeText(getScripts());
      toast((t) => (
        <div className="flex items-center gap-2">
          Copy behasil
          <button onClick={() => toast.dismiss(t.id)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-x-lg"
              viewBox="0 0 16 16"
            >
              <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
            </svg>
          </button>
        </div>
      ));
    }
  };

  return (
    <>
      <div className="container mx-auto min-h-screen px-3 md:px-0 pb-10">
        <div className="py-5">
          <h1 className="text-xl text-center font-semibold">
            Easy CDN Importer | Developer Tools
          </h1>
          <p className="text-center text-xs">
            Pakai CDN dengan cepat hanya checklist saja
          </p>
        </div>

        <div className="flex flex-col gap-8 md:w-[80%] xl:w-[50%] mx-auto">
          <div className="border border-slate-500 rounded-lg p-3 pt-5 relative mt-5">
            <span className="absolute text-sm bg-white -top-3 left-3 px-2">
              Pengaturan
            </span>
            {Object.entries(cdnGroups).map(([group, items]) => (
              <div key={group} className="mb-6">
                <h2 className="text-sm font-semibold">{group}</h2>
                <div className="grid grid-cols-2 gap-3 mt-3">
                  {items.map((item) => (
                    <label
                      key={item.name}
                      className="flex items-center gap-2 text-sm"
                    >
                      <input
                        type="checkbox"
                        checked={selected.includes(item.name)}
                        onChange={() => handleToggle(item.name)}
                        className="peer hidden"
                      />
                      <span
                        className="w-5 h-5 rounded border border-gray-400 flex items-center justify-center
                   peer-checked:bg-gray-700 peer-checked:border-gray-700
                   transition"
                      >
                        <svg
                          className="w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-7.25 7.25a1 1 0 01-1.414 0l-3.25-3.25a1 1 0 011.414-1.414l2.543 2.543 6.543-6.543a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </span>
                      {item.name}
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {selected && selected.length > 0 && (
            <div className="border border-slate-500 rounded-lg p-3 pt-5 relative mt-5">
              <span className="absolute text-sm bg-white -top-3 left-3 px-2">
                Output CDN Scripts
              </span>
              <textarea
                className="w-full min-h-[150px] p-2 font-mono border-none focus-within:outline-none resize-none rounded-md text-xs overflow-x-auto"
                value={getScripts()}
                ref={previewRef}
                readOnly
              />

              <button
                onClick={handleCopy}
                className="bg-gradient-to-r absolute top-3 right-3 from-gray-800 to-slate-900 hover:from-slate-950 hover:to-black text-white px-3 py-[7px] rounded-md focus:ring-2 ring-offset-2 ring-slate-800"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-copy"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1z"
                  />
                </svg>
              </button>
            </div>
          )}
        </div>

        {selected && selected.length > 0 && (
          <div className="mt-6  md:w-[80%] xl:w-[50%] mx-auto">
            <label className="flex items-center gap-2 text-sm text-slate-600">
              <input
                type="checkbox"
                checked={showUsage}
                onChange={() => setShowUsage(!showUsage)}
                className="peer hidden"
              />
              <span
                className="w-4 h-4 rounded border border-gray-400 flex items-center justify-center
                   peer-checked:bg-gray-700 peer-checked:border-gray-700
                   transition"
              >
                <svg
                  className="w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-7.25 7.25a1 1 0 01-1.414 0l-3.25-3.25a1 1 0 011.414-1.414l2.543 2.543 6.543-6.543a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              Tampilkan contoh penggunaan
            </label>

            {showUsage && (
              <div className="mt-4">
                <h3 className="mb-2 font-semibold">Basic Usage:</h3>
                <textarea
                  className="w-full h-96 overflow-y-scroll p-4 font-mono border border-slate-300 rounded-md text-xs"
                  value={getUsages()}
                  readOnly
                />
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
