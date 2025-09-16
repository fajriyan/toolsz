"use client";

import { useState } from "react";

const devices = {
  Mobile: {
    "iPhone SE (3rd gen)": { width: 375, height: 667 },
    "iPhone XR": { width: 414, height: 896 },
    "iPhone 14 Pro": { width: 430, height: 932 },
    "iPhone 15 Pro Max": { width: 430, height: 932 },
    "Google Pixel 7": { width: 412, height: 915 },
    "Google Pixel 8 Pro": { width: 412, height: 934 },
    "Samsung Galaxy S20": { width: 360, height: 800 },
    "Samsung Galaxy S22": { width: 390, height: 844 },
    "Samsung Galaxy S24 Ultra": { width: 412, height: 915 },
    "OnePlus 11": { width: 412, height: 919 },
  },
  Tablet: {
    "iPad Mini (6th gen)": { width: 744, height: 1133 },
    "iPad Air (5th gen)": { width: 820, height: 1180 },
    'iPad Pro 11" (2022)': { width: 834, height: 1194 },
    'iPad Pro 12.9" (2022)': { width: 1024, height: 1366 },
    "Samsung Galaxy Tab S8": { width: 800, height: 1280 },
    "Microsoft Surface Pro 7": { width: 912, height: 1368 },
  },
  Laptop: {
    'MacBook Air 13" (M2)': { width: 1440, height: 900 },
    'MacBook Pro 14" (M3)': { width: 1512, height: 982 },
    'MacBook Pro 16"': { width: 1536, height: 960 },
    "Dell XPS 13": { width: 1920, height: 1200 },
    "Surface Laptop Studio": { width: 1504, height: 1000 },
    "Full HD Desktop (1080p)": { width: 1920, height: 1080 },
    "2K Desktop (1440p)": { width: 2560, height: 1440 },
    "4K Desktop (2160p)": { width: 3840, height: 2160 },
  },
};

export default function ResponsiveTester() {
  const [url, setUrl] = useState("");
  const [selectedDevice, setSelectedDevice] = useState("iPhone XR");
  const [htmlContent, setHtmlContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const device = devices[selectedDevice];

  const fetchHtml = async () => {
    setLoading(true);
    setError("");
    setHtmlContent("");

    try {
      const res = await fetch("/layanan/responsive-tester/api", {
        method: "POST",
        body: JSON.stringify({ url }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Gagal mengambil konten");

      // gabungkan head+body (optional: inject <base> biar link relatif jalan)
      const fullHtml = `
        <head>
          <base href="${url}">
          ${data.head || ""}
        </head>
        <body>
          ${data.body || ""}
        </body>
      `;

      setHtmlContent(fullHtml);
    } catch (err) {
      setError(err.message);
    }

    setLoading(false);
  };

  return (
    <div className="mb-[100px]">
      <div className="container mx-auto pb-[80px] sm:py-0 sm:min-h-[83vh] px-3 md:px-0">
        <div className="py-5 mb-10 text-center">
          <h1 className="text-xl font-semibold">
            Responsive Tester | SEO Tools
          </h1>
          <p className="text-xs">
            Cek Responsive website di semua Tampilan dengan Cepat.
          </p>
        </div>

        <div className="mb-6 flex flex-col sm:flex-row sm:items-center gap-4">
          <input
            type="text"
            placeholder="Enter URL (e.g. https://example.com)"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full p-3 rounded border border-gray-300"
          />

          <div className="sm:w-[35%] md:w-[20%]">
            <select
              value={selectedDevice}
              onChange={(e) => setSelectedDevice(e.target.value)}
              className="w-full p-3 rounded border border-gray-300"
            >
              {Object.keys(devices).map((group) => (
                <optgroup key={group} label={group}>
                  {Object.keys(devices[group]).map((deviceKey) => (
                    <option key={deviceKey} value={deviceKey}>
                      {deviceKey}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
          </div>

          <button
            onClick={fetchHtml}
            disabled={loading || !url}
            className="px-4 py-2 bg-gray-800 text-white rounded"
          >
            {loading ? "Loading..." : "Preview"}
          </button>
        </div>

        <div className="border py-6 min-h-[500px]">
          {error && <p className="text-red-500 text-center">{error}</p>}

          {htmlContent && (
            <div className="flex justify-center">
              <div
                className="border-2 border-gray-400 bg-white overflow-auto"
                style={{ width: device.width, height: device.height }}
              >
                <iframe
                  srcDoc={htmlContent}
                  sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                  className="w-full h-full"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
