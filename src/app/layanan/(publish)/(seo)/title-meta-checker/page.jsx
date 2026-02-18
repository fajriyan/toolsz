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
    <div className="container mx-auto min-h-[84vh] z-0 px-3 md:px-0 pb-20">
      <div className="py-5">
        <h1 className="text-xl text-center font-semibold">
          Meta Title & Description Checker | SEO Tools
        </h1>
        <p className="text-center text-xs">
          Cek meta title dan meta description website dengan cepat untuk
          optimasi SEO dan tampilan hasil pencarian yang lebih baik.
        </p>
      </div>
      <div className="md:w-[80%] xl:w-[50%] mx-auto mt-5">
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
          {loading ? "Checking..." : "Inspeksi Website"}
        </button>

        <div className="mt-10">
          {data && (
            <div className="border border-slate-500 rounded-lg p-3 pt-5 relative mt-5">
              <span className="absolute text-sm bg-white -top-3 left-3 px-2">
                 Preview hasil di Google
              </span>

              {/* URL */}
              <div className="text-sm text-green-700 truncate mb-1">
                {url || "https://example.com/page"}
              </div>

              {/* TITLE */}
              <div className="text-[20px] text-blue-600 hover:underline cursor-pointer leading-tight">
                {data.title.text || "Contoh Meta Title Website"}
              </div>

              {/* DESCRIPTION */}
              <div className="text-sm text-gray-600 mt-1 leading-snug">
                {data.meta.text ||
                  "Contoh meta description akan muncul di sini sesuai isi meta description website."}
              </div>
            </div>
          )}

          {data && (
            <div className="border border-slate-500 rounded-lg p-3 pt-5 relative mt-5">
              <span className="absolute text-sm bg-white -top-3 left-3 px-2">
                Hasil Inspeksi
              </span>
              <div className="space-y-6">
                {/* TITLE */}
                <div>
                  <h2 className="font-semibold text-xs">PAGE TITLE</h2>
                  <p className="text-gray-700 text-md">{data.title.text}</p>
                  <div className="mt-3">
                    <LengthIndicator
                      value={data.title.character}
                      max={65}
                      min={50}
                    />
                  </div>
                  <ul className="text-sm mt-3 flex flex-wrap gap-2 sm:gap-3">
                    <li>Character : {data.title.character}</li>|
                    <li>Pixel : {data.title.pixel}px</li>|
                    <li>Word : {data.title.word}</li>
                  </ul>

                  {data.title.warning && (
                    <p className="text-red-500 text-sm">{data.title.warning}</p>
                  )}
                </div>

                {/* META */}
                <div className="pt-5 border-t border-gray-300">
                  <h2 className="font-semibold text-xs">META DESCRIPTION</h2>
                  <p className="text-gray-700 text-md">{data.meta.text}</p>
                  <div className="mt-3">
                    <LengthIndicator
                      value={data.meta.character}
                      max={170}
                      min={140}
                    />
                  </div>
                  <ul className="text-sm mt-3 flex flex-wrap gap-2 sm:gap-3">
                    <li>Character : {data.meta.character}</li>|
                    <li>Pixel : {data.meta.pixel}px</li>|
                    <li>Word : {data.meta.word}</li>
                  </ul>
                  {data.meta.warning && (
                    <p className="text-red-500 text-sm">{data.meta.warning}</p>
                  )}
                </div>

                <div className="border border-blue-300 bg-blue-50 rounded-lg p-4 mt-6 text-sm">
                  <h3 className="font-semibold mb-2">Recommendation SEO</h3>

                  <div className="mb-3">
                    <p className="font-medium">Meta Title</p>
                    <ul className="list-disc ml-5">
                      <li>Ideal: 50–60 karakter</li>
                      <li>Maksimal: 65 karakter</li>
                      <li>Minimal: 30 karakter</li>
                    </ul>
                  </div>

                  <div>
                    <p className="font-medium">Meta Description</p>
                    <ul className="list-disc ml-5">
                      <li>Ideal: 140–160 karakter</li>
                      <li>Maksimal: 170 karakter</li>
                      <li>Minimal: 70 karakter</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
