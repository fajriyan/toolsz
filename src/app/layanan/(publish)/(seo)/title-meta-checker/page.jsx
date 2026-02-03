"use client";
import { useState } from "react";
import LengthIndicator from "./LengthIndicator";

export default function TitleMetaChecker() {
  const [url, setUrl] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const checkSEO = async () => {
    setLoading(true);
    setData(null);

    const res = await fetch("/layanan/title-meta-checker/api", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }),
    });

    const json = await res.json();
    setData(json);
    setLoading(false);
  };

  return (
    <div className="container mx-auto min-h-[84vh] z-0 px-3 md:px-0">
      <div className="py-5">
        <h1 className="text-xl text-center font-semibold">
          Meta Title & Description Checker | Developer Tools
        </h1>
        <p className="text-center text-xs">
          Cek meta title dan meta description website dengan cepat untuk
          optimasi SEO dan tampilan hasil pencarian yang lebih baik.
        </p>
      </div>
      <div className="md:w-[80%] xl:w-[50%] mx-auto">
        <input
          type="text"
          placeholder="https://fajriyan.pages.dev"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full px-3 py-2 focus-within:outline-none focus:border-cyan-700 border border-gray-300 rounded"
        />

        <button
          onClick={checkSEO}
          disabled={loading}
          className="bg-gradient-to-r mt-4 hover:bg-gradient-to-b text-sm from-gray-800 to-slate-700 hover:to-slate-950 text-white px-5 py-2 rounded-lg flex items-center gap-1"
        >
          {loading ? "Checking..." : "Cek Website"}
        </button>

        <div className="mt-10">
          {data && (
            <div className="space-y-6">
              {/* TITLE */}
              <div>
                <h2 className="font-semibold">PAGE TITLE</h2>
                <p>{data.title.text}</p>
                <ul className="text-sm mt-3">
                  <li>Character : {data.title.character}</li>
                  <li>Pixel : {data.title.pixel}px</li>
                  <li>Word : {data.title.word}</li>
                </ul>

                {data.title.warning && (
                  <p className="text-red-500 text-sm">{data.title.warning}</p>
                )}
                <div className="mt-3">
                  <LengthIndicator
                    value={data.title.character}
                    max={65}
                    min={50}
                  />
                </div>
              </div>

              {/* META */}
              <div>
                <h2 className="font-semibold">META DESCRIPTION</h2>
                <p>{data.meta.text}</p>
                <ul className="text-sm mt-3">
                  <li>Character : {data.meta.character}</li>
                  <li>Pixel : {data.meta.pixel}px</li>
                  <li>Word : {data.meta.word}</li>
                </ul>
                {data.meta.warning && (
                  <p className="text-red-500 text-sm">{data.meta.warning}</p>
                )}
                <div className="mt-3">
                  <LengthIndicator
                    value={data.meta.character}
                    max={170}
                    min={140}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
