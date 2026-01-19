"use client";

import { useState } from "react";
import toast from "react-hot-toast";

function hexToRgb(hex) {
  hex = hex.replace("#", "");
  if (hex.length === 3) {
    hex = hex
      .split("")
      .map((c) => c + c)
      .join("");
  }
  const num = parseInt(hex, 16);
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255,
  };
}

function rgbToHex(r, g, b) {
  return "#" + [r, g, b].map((v) => v.toString(16).padStart(2, "0")).join("");
}

function tint(hex, p) {
  const { r, g, b } = hexToRgb(hex);
  return rgbToHex(
    Math.round(r + (255 - r) * p),
    Math.round(g + (255 - g) * p),
    Math.round(b + (255 - b) * p),
  );
}

function shade(hex, p) {
  const { r, g, b } = hexToRgb(hex);
  return rgbToHex(
    Math.round(r * (1 - p)),
    Math.round(g * (1 - p)),
    Math.round(b * (1 - p)),
  );
}

export default function TintShadeGenerator() {
  const [hexInput, setHexInput] = useState("#10b981");
  const [baseColor, setBaseColor] = useState("#10b981");
  const [steps, setSteps] = useState(10);

  const percentages = Array.from({ length: steps }, (_, i) =>
    Math.round(((i + 1) * 100) / steps),
  );

  function saveSettings(hex) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(hex);
      }, 500);
    });
  }

  function handleGenerate() {
    if (!/^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(hexInput)) {
      toast.error("HEX tidak valid");
      return;
    }
    setBaseColor(hexInput);
    toast.promise(saveSettings(hexInput), {
      loading: "Generate Tint & Shade",
      success: <p>Generate Berhasil</p>,
      error: <p>Generate Gagal</p>,
    });
  }

  function generateScale() {
    return percentages.map((p) => {
      const percent = p / 100;
      return {
        p,
        tint: tint(baseColor, percent),
        shade: shade(baseColor, percent),
      };
    });
  }

  function copyAllHex() {
    const list = generateScale()
      .flatMap((i) => [i.tint, i.shade])
      .join("\n");
    navigator.clipboard.writeText(list);
    toast(`Copy Semua Hex Berhasil`, {
      icon: "👌",
      style: {
        borderRadius: "10px",
        background: "#fff",
        color: "#000",
      },
    });
  }

  function copyHex(hex) {
    navigator.clipboard.writeText(hex);
    toast(`Copy Berhasil : ${hex}`, {
      icon: "👌",
      style: {
        borderRadius: "10px",
        background: "#fff",
        color: "#000",
      },
    });
  }

  function copyTailwind() {
    const scale = generateScale();
    const tailwind = {
      50: tint(baseColor, 0.9),
      100: tint(baseColor, 0.7),
      200: tint(baseColor, 0.5),
      300: tint(baseColor, 0.3),
      400: tint(baseColor, 0.1),
      500: baseColor,
      600: shade(baseColor, 0.1),
      700: shade(baseColor, 0.3),
      800: shade(baseColor, 0.5),
      900: shade(baseColor, 0.7),
    };

    const text = `export const colors = {
  primary: ${JSON.stringify(tailwind, null, 2)}
};`;

    navigator.clipboard.writeText(text);
    toast(`Export Tailwind Berhasil`, {
      icon: "🦋",
      style: {
        borderRadius: "10px",
        background: "#fff",
        color: "#000",
      },
    });
  }

  const scale = generateScale();

  return (
    <main className="">
      <div className="container mx-auto min-h-[84vh] z-0 px-3 md:px-0 pb-20">
        <div className="py-5">
          <h1 className="text-xl text-center font-semibold">
            Tint & Shade Generator | Developer Tools
          </h1>
          <p className="text-center text-xs">
            Generate variasi tint dan shade dari warna dasar secara instan
            dengan format warna dalam HEX dan TailwindCSS.
          </p>
        </div>

        <div className="md:w-[80%] xl:w-[50%] mx-auto">
          <div className="border border-slate-500 rounded-lg p-3 pt-5 relative mt-5">
            <span className="absolute text-sm bg-white -top-3 left-3 px-2">
              Pengaturan
            </span>

            <div className="flex flex-wrap gap-3 items-end">
              <input
                type="text"
                value={hexInput}
                onChange={(e) => setHexInput(e.target.value)}
                className="bg-white border border-slate-700 rounded px-3 py-2 w-32 font-mono"
              />

              <input
                type="color"
                value={hexInput}
                onChange={(e) => setHexInput(e.target.value)}
                className="h-10 w-10 border border-slate-700 rounded"
              />

              <select
                value={steps}
                onChange={(e) => setSteps(Number(e.target.value))}
                className="bg-white border border-slate-700 rounded px-3 py-2"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
              </select>

              <button
                onClick={handleGenerate}
                className="bg-gradient-to-r hover:bg-gradient-to-b text-sm from-gray-800 to-slate-700 hover:to-slate-950 text-white px-3 py-2.5 rounded-lg flex gap-2 items-center"
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
                    d="M21 13v-2a1 1 0 0 0-1-1h-.757l-.707-1.707.535-.536a1 1 0 0 0 0-1.414l-1.414-1.414a1 1 0 0 0-1.414 0l-.536.535L14 4.757V4a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v.757l-1.707.707-.536-.535a1 1 0 0 0-1.414 0L4.929 6.343a1 1 0 0 0 0 1.414l.536.536L4.757 10H4a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h.757l.707 1.707-.535.536a1 1 0 0 0 0 1.414l1.414 1.414a1 1 0 0 0 1.414 0l.536-.535 1.707.707V20a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-.757l1.707-.708.536.536a1 1 0 0 0 1.414 0l1.414-1.414a1 1 0 0 0 0-1.414l-.535-.536.707-1.707H20a1 1 0 0 0 1-1Z"
                  />
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                  />
                </svg>
                Generate
              </button>

              <button
                onClick={copyAllHex}
                className="bg-gradient-to-r hover:bg-gradient-to-b text-sm from-gray-800 to-slate-700 hover:to-slate-950 text-white px-3 py-2.5 rounded-lg flex gap-2 items-center"
              >
                <svg
                  className="w-5 h-5 text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="m3 2 1.578 17.834L12 22l7.468-2.165L21 2H3Zm13.3 14.722-4.293 1.204H12l-4.297-1.204-.297-3.167h2.108l.15 1.526 2.335.639 2.34-.64.245-3.05h-7.27l-.187-2.006h7.64l.174-2.006H6.924l-.176-2.006h10.506l-.954 10.71Z" />
                </svg>
                Copy HEX
              </button>

              <button
                onClick={copyTailwind}
                className="bg-gradient-to-r hover:bg-gradient-to-b text-sm from-gray-800 to-slate-700 hover:to-slate-950 text-white px-3 py-2.5 rounded-lg flex gap-2 items-center"
              >
                <svg
                  className="w-5 h-5 text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M11.782 5.72a4.773 4.773 0 0 0-4.8 4.173 3.43 3.43 0 0 1 2.741-1.687c1.689 0 2.974 1.972 3.758 2.587a5.733 5.733 0 0 0 5.382.935c2-.638 2.934-2.865 3.137-3.921-.969 1.379-2.44 2.207-4.259 1.231-1.253-.673-2.19-3.438-5.959-3.318ZM6.8 11.979A4.772 4.772 0 0 0 2 16.151a3.431 3.431 0 0 1 2.745-1.687c1.689 0 2.974 1.972 3.758 2.587a5.733 5.733 0 0 0 5.382.935c2-.638 2.933-2.865 3.137-3.921-.97 1.379-2.44 2.208-4.259 1.231-1.253-.673-2.19-3.443-5.963-3.317Z" />
                </svg>
                Export Tailwind
              </button>
            </div>
          </div>

          <div className="mt-10 border border-slate-500 rounded-lg p-3 pt-5 relative">
            <span className="absolute text-sm bg-white -top-3 left-3 px-2">
              Tint & Shade Output
            </span>

            <div className="">
              <div className="grid grid-cols-2 md:grid-cols-steps gap-4">
                <div className="space-y-4">
                  {/* BASE */}
                  <div
                    onClick={() => copyHex(baseColor)}
                    className="cursor-pointer group relative"
                  >
                    <div
                      className="h-24 rounded border border-slate-400 group-hover:ring-2 ring-cyan-700"
                      style={{ background: baseColor }}
                    />
                    <p className="text-center mt-2 font-mono text-xs bg-white px-1 absolute top-1 left-2 rounded">
                      Base {baseColor}
                    </p>
                    <svg
                      className="w-5 h-5 text-white absolute top-2 right-2"
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
                  </div>
                  {/* TINT */}
                  {scale.map((i) => (
                    <div
                      key={`tint-${i.p}`}
                      onClick={() => copyHex(i.tint)}
                      className="cursor-pointer group relative"
                    >
                      <div
                        className="h-24 rounded border border-slate-400 group-hover:ring-2 ring-cyan-700"
                        style={{ background: i.tint }}
                      />
                      <p className="text-center mt-2 text-xs font-mono bg-white px-1 absolute top-1 left-2 rounded">
                        {i.p}% {i.tint}
                      </p>
                      <svg
                        className="w-5 h-5 text-white absolute top-2 right-2"
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
                    </div>
                  ))}
                </div>

                <div className="space-y-4">
                  {/* BASE */}
                  <div
                    onClick={() => copyHex(baseColor)}
                    className="cursor-pointer group relative"
                  >
                    <div
                      className="h-24 rounded border border-slate-400 group-hover:ring-2 ring-cyan-700"
                      style={{ background: baseColor }}
                    />
                    <p className="text-center mt-2 font-mono text-xs bg-white px-1 absolute top-1 left-2 rounded">
                      Base {baseColor}
                    </p>

                    <svg
                      className="w-5 h-5 text-white absolute top-2 right-2"
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
                  </div>
                  {/* SHADE */}
                  {scale.map((i) => (
                    <div
                      key={`shade-${i.p}`}
                      onClick={() => copyHex(i.shade)}
                      className="cursor-pointer group relative"
                    >
                      <div
                        className="h-24 rounded border border-slate-400 group-hover:ring-2 ring-cyan-700"
                        style={{ background: i.shade }}
                      />
                      <p className="text-center mt-2 text-xs font-mono bg-white px-1 absolute top-1 left-2 rounded">
                        {i.p}% {i.shade}
                      </p>
                      <svg
                        className="w-5 h-5 text-white absolute top-2 right-2"
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
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
