"use client";

import { useState } from "react";

const devices = {
  "iPhone XR": { width: 414, height: 896 },
  "iPhone 14 Pro": { width: 430, height: 932 },
  "iPad Air": { width: 820, height: 1180 },
  "Samsung Galaxy S20": { width: 360, height: 800 },
  'MacBook Pro 16"': { width: 1536, height: 960 },
  "Surface Pro 7": { width: 912, height: 1368 },
};

export default function ResponsiveTester() {
  const [url, setUrl] = useState("");
  const [selectedDevice, setSelectedDevice] = useState("iPhone XR");

  const device = devices[selectedDevice];

  return (
    <div className="mb-[100px]">
      <div className="container mx-auto pb-[80px] sm:py-0 sm:min-h-[83vh] z-0 px-3 md:px-0">
        <div className="py-5 mb-10">
          <h1 className="text-xl text-center font-semibold">
            Responsive Tester, Cek Responsive Website
          </h1>
          <p className="text-center text-xs">
            Cek Kemampuan Responsive pada Website Kalian dengan Preset yang umum
            digunakan
          </p>
        </div>
        <div className="">
          <div className="">
            <div className="mb-6 flex flex-col sm:flex-row sm:items-center gap-4">
              <input
                type="text"
                placeholder="Enter URL (e.g. https://toolsz.vercel.app)"
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
                  {Object.keys(devices).map((deviceKey) => (
                    <option key={deviceKey} value={deviceKey}>
                      {deviceKey}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="border py-6 min-h-[500px]">
            {url && (
              <div className="flex justify-center">
                <div
                  className="border-2 border-gray-400 bg-white overflow-hidden"
                  style={{
                    width: device.width,
                    height: device.height,
                  }}
                >
                  <iframe
                    src={url}
                    className="w-full h-full"
                    sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                  />
                </div>
              </div>
            )}
          </div>

          <a href="https://github.com/fajriyan/toolsz/issues" target="_blank" rel="nofollow" className="mt-4 text-xs text-slate-600 hover:underline ">Request Preset Responsive</a>
        </div>
      </div>
    </div>
  );
}
