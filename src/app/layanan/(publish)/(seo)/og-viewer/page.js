"use client";

import { useState } from "react";

export default function OgPreviewPage() {
   const [url, setUrl] = useState("");
   const [data, setData] = useState(null);
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState(null);
   const [tab, setTab] = useState("facebook");

   async function handleCheck(e) {
      e.preventDefault();
      if (!url) return;

      setLoading(true);
      setError(null);
      setData(null);

      try {
         const res = await fetch(
            `/layanan/og-viewer/api?url=${encodeURIComponent(url)}`,
         );
         const json = await res.json();

         if (!res.ok) {
            setError(json.error || "Terjadi kesalahan");
            return;
         }

         setData(json);
      } catch {
         setError("Gagal menghubungi server");
      } finally {
         setLoading(false);
      }
   }

   return (
      <div className="min-h-[85dvh] md:w-[80%] xl:w-[50%] mx-auto mt-5 px-4">
         <div className="mb-10">
            <h1 className="text-xl text-center font-semibold">
               Open Graph Preview | SEO Tools
            </h1>
            <p className="text-center text-xs">
               Cek tampilan share card (Facebook, Twitter, WhatsApp) dari meta
               tag Open Graph suatu URL.
            </p>
         </div>

         <div className="">
            <form onSubmit={handleCheck} className="flex gap-2 mb-8">
               <input
                  type="url"
                  required
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://contoh.com/artikel"
                  className="w-full px-3 py-2 focus-within:outline-none focus:border-cyan-700 border border-gray-300 rounded-md"
               />
               <button
                  type="submit"
                  disabled={loading}
                  className="block bg-gradient-to-r from-gray-800 to-slate-900 hover:ring-2 ring-cyan-500 font-medium text-white px-3 py-[7px] w-max text-center cursor-pointer rounded-lg"
               >
                  {loading ? "Mengecek..." : "Cek"}
               </button>
            </form>

            {error && (
               <div className="mb-6 rounded-lg bg-red-50 text-red-600 px-4 py-3 text-sm">
                  {error}
               </div>
            )}

            {data && (
               <div>
                  {/* Tab switcher */}
                  <div className="flex gap-2 mb-4 border-b">
                     {["facebook", "twitter", "whatsapp"].map((t) => (
                        <button
                           key={t}
                           onClick={() => setTab(t)}
                           className={`px-4 py-2 text-sm font-medium capitalize border-b-2 -mb-px ${
                              tab === t
                                 ? "border-gray-800 text-gray-800"
                                 : "border-transparent text-gray-500 hover:text-gray-700"
                           }`}
                        >
                           {t}
                        </button>
                     ))}
                  </div>

                  {/* Facebook style */}
                  {tab === "facebook" && (
                     <div className="border rounded-lg overflow-hidden max-w-md bg-white shadow-sm">
                        {data.image ? (
                           <img
                              src={data.image}
                              alt=""
                              className="w-full aspect-[1.91/1] object-cover bg-gray-100"
                           />
                        ) : (
                           <div className="w-full aspect-[1.91/1] bg-gray-100 flex items-center justify-center text-gray-400 text-sm">
                              Tidak ada og:image
                           </div>
                        )}
                        <div className="p-3 bg-gray-50">
                           <p className="text-xs text-gray-500 uppercase">
                              {data.domain}
                           </p>
                           <p className="font-semibold text-gray-900 line-clamp-2">
                              {data.title || "(Tidak ada title)"}
                           </p>
                           <p className="text-sm text-gray-500 line-clamp-1">
                              {data.description || "(Tidak ada description)"}
                           </p>
                        </div>
                     </div>
                  )}

                  {/* Twitter/X style */}
                  {tab === "twitter" && (
                     <div className="border rounded-2xl overflow-hidden max-w-md bg-white shadow-sm">
                        {data.image ? (
                           <img
                              src={data.image}
                              alt=""
                              className="w-full aspect-[1.91/1] object-cover bg-gray-100"
                           />
                        ) : (
                           <div className="w-full aspect-[1.91/1] bg-gray-100 flex items-center justify-center text-gray-400 text-sm">
                              Tidak ada image
                           </div>
                        )}
                        <div className="p-3">
                           <p className="text-sm text-gray-500">
                              {data.domain}
                           </p>
                           <p className="font-semibold text-gray-900 line-clamp-1">
                              {data.twitterTitle ||
                                 data.title ||
                                 "(Tidak ada title)"}
                           </p>
                           <p className="text-sm text-gray-500 line-clamp-2">
                              {data.twitterDescription ||
                                 data.description ||
                                 "(Tidak ada description)"}
                           </p>
                        </div>
                     </div>
                  )}

                  {/* WhatsApp style */}
                  {tab === "whatsapp" && (
                     <div className="border rounded-lg overflow-hidden max-w-xs bg-white shadow-sm">
                        {data.image ? (
                           <img
                              src={data.image}
                              alt=""
                              className="w-full aspect-square object-cover bg-gray-100"
                           />
                        ) : (
                           <div className="w-full aspect-square bg-gray-100 flex items-center justify-center text-gray-400 text-sm">
                              Tidak ada image
                           </div>
                        )}
                        <div className="p-2.5 bg-gray-50">
                           <p className="font-semibold text-sm text-gray-900 line-clamp-2">
                              {data.title || "(Tidak ada title)"}
                           </p>
                           <p className="text-xs text-gray-500 line-clamp-2">
                              {data.description || "(Tidak ada description)"}
                           </p>
                           <p className="text-xs text-gray-400 uppercase mt-1">
                              {data.domain}
                           </p>
                        </div>
                     </div>
                  )}

                  {/* Raw meta tags */}
                  <details className="mt-6 text-sm">
                     <summary className="cursor-pointer text-gray-500 hover:text-gray-700">
                        Lihat raw meta tags
                     </summary>
                     <pre className="mt-2 bg-gray-50 border rounded-lg p-4 overflow-x-auto text-xs">
                        {JSON.stringify(data, null, 2)}
                     </pre>
                  </details>
               </div>
            )}
         </div>
      </div>
   );
}
