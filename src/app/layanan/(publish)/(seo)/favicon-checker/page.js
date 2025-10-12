"use client";

import { useState } from "react";

export default function FaviconCheckerPage() {
  const [url, setUrl] = useState("");
  const [icons, setIcons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [openStates, setOpenStates] = useState([]);

  const fetchIcons = async () => {
    setLoading(true);
    setError("");
    setIcons([]);

    try {
      const res = await fetch("/layanan/favicon-checker/api", {
        method: "POST",
        body: JSON.stringify({ url }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Gagal mengambil icon");

      setIcons(data.icons);
      setOpenStates(new Array(data.icons.length).fill(false));
    } catch (err) {
      setError(err.message);
    }

    setLoading(false);
  };

  return (
    <div className="container mx-auto mb-10 px-4 md:px-0">
      <div className="py-5 mb-8 text-center">
        <h1 className="text-xl text-center font-semibold">
          Favicon & Apple Icon Checker | SEO Tools
        </h1>
        <p className="text-center text-xs">
          Cek icon yang digunakan pada halaman website kalian
        </p>
      </div>

      <div className=" md:w-[80%] xl:w-[50%] mx-auto min-h-[67dvh]">
        <input
          type="text"
          placeholder="Masukkan URL (https://...)"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full px-3 py-2 focus-within:outline-none focus:border-cyan-700 border border-gray-300 rounded mb-4"
        />
        <button
          onClick={fetchIcons}
          disabled={loading}
          className="block bg-gradient-to-r w-max from-gray-800 to-slate-900 hover:ring-2 ring-cyan-500 font-medium text-white px-3 py-[7px] text-center cursor-pointer rounded-lg"
        >
          {loading ? "Memuat..." : "Periksa Favicon"}
        </button>

        {error && <p className="text-red-600 mt-4 text-center">{error}</p>}

        {icons.length > 0 && (
          <div className="mt-8 border border-gray-300 rounded p-4 overflow-hidden">
            <h3 className="text-lg font-semibold mb-4">Favicon Check</h3>

            {/* Logic status */}
            <ul className="space-y-4 text-sm">
              {/* Website Favicon */}
              <li>
                {icons.find((i) => i.rel.includes("icon")) ? (
                  <span className="text-green-600 font-medium">
                    ✅ Your website seems to have a favicon.
                  </span>
                ) : (
                  <div>
                    <p className="text-red-600 font-medium">
                      ❌ Your website does not have a favicon.
                    </p>
                    <pre className="mt-2 bg-gray-100 p-2 rounded text-xs text-gray-800 overflow-auto">
                      {`<link rel="icon" href="/favicon.ico">`}
                    </pre>
                  </div>
                )}
              </li>

              {/* Android Chrome */}
              <li>
                {icons.find(
                  (i) => i.rel.includes("icon") && i.sizes?.includes("192x192")
                ) ? (
                  <span className="text-green-600">
                    ✅ Android Chrome favicon is set.
                  </span>
                ) : (
                  <div>
                    <p className="text-yellow-600">
                      ⚠️ Android Chrome favicon not set.
                    </p>
                    <pre className="mt-2 bg-gray-100 p-2 rounded text-xs text-gray-800 overflow-auto">
                      {`<link rel="icon" type="image/png" sizes="192x192" href="/android-chrome-192x192.png">`}
                    </pre>
                  </div>
                )}
              </li>

              {/* iOS Apple Touch Icon */}
              <li>
                {icons.find((i) => i.rel.includes("apple-touch-icon")) ? (
                  <span className="text-green-600">✅ iOS favicon is set.</span>
                ) : (
                  <div>
                    <p className="text-red-600">❌ iOS favicon not set.</p>
                    <pre className="mt-2 bg-gray-100 p-2 rounded text-xs text-gray-800 overflow-auto">
                      {`<link rel="apple-touch-icon" href="/apple-touch-icon.png">`}
                    </pre>
                  </div>
                )}
              </li>
            </ul>

            {/* Optional: tampilkan daftar icon mentah */}
            <div className="mt-6">
              <h4 className="font-semibold mb-3">Detected Icons:</h4>
              <ul className="space-y-2">
                {icons.map((icon, i) => {
                  const isOpen = openStates[i];

                  const toggleOpen = () => {
                    setOpenStates((prev) => {
                      const newStates = [...prev];
                      newStates[i] = !newStates[i];
                      return newStates;
                    });
                  };

                  const absoluteHref = icon.href?.startsWith("http")
                    ? icon.href
                    : new URL(icon.href, url).href;

                  const linkTag = `<link rel="${icon.rel}" href="${icon.href}"${
                    icon.sizes ? ` sizes="${icon.sizes}"` : ""
                  }${icon.type ? ` type="${icon.type}"` : ""}>`;

                  return (
                    <li
                      key={i}
                      className="border rounded-md overflow-hidden bg-white"
                    >
                      <button
                        onClick={toggleOpen}
                        className="w-full text-left px-4 py-2 font-medium bg-gray-100 hover:bg-gray-200 flex justify-between items-center"
                      >
                        <div className="flex gap-2 items-center">
                          <img
                            src={absoluteHref}
                            alt="icon"
                            className="w-8 h-8"
                            onError={(e) => (e.target.style.display = "none")}
                          />
                          <div className="text-sm">
                            <strong>Size:</strong>{" "}
                            {icon.sizes ? icon.sizes : "null"}
                            <p className="text-xs">
                              {icon.rel ? icon.rel : "null"} |{" "}
                              {icon.type ? icon.type : "null"}
                            </p>
                          </div>
                        </div>
                        <span>
                          {isOpen ? (
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
                                d="m16 14-4-4-4 4"
                              />
                            </svg>
                          ) : (
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
                                d="m8 10 4 4 4-4"
                              />
                            </svg>
                          )}
                        </span>
                      </button>

                      {isOpen && (
                        <div className="p-4 space-y-2 border-t text-sm">
                          <div className="flex items-center justify-between gap-2">
                            <div className="flex gap-2">
                              <img
                                src={absoluteHref}
                                alt="icon"
                                className="w-8 h-8"
                                onError={(e) =>
                                  (e.target.style.display = "none")
                                }
                              />

                              <div className="">
                                {icon.sizes ? (
                                  <p>
                                    <strong>Size:</strong> {icon.sizes}
                                  </p>
                                ) : (
                                  <p>
                                    <strong>Size:</strong> null
                                  </p>
                                )}
                                {icon.type ? (
                                  <p>
                                    <strong>Type:</strong> {icon.type}
                                  </p>
                                ) : (
                                  <p>
                                    <strong>Type:</strong> null
                                  </p>
                                )}
                              </div>
                            </div>
                            <a
                              href={absoluteHref}
                              className="block"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
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
                                  strokeWidth="2"
                                  d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z"
                                />
                                <path
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                />
                              </svg>
                            </a>
                          </div>

                          <div>
                            <p className="text-gray-500">HTML Tag:</p>
                            <pre className="bg-gray-100 p-2 rounded text-xs overflow-auto">
                              {linkTag}
                            </pre>
                          </div>
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
