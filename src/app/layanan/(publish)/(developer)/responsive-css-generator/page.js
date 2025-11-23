"use client";

import { useState, useMemo, useRef } from "react";

export default function Page() {
  const [cssInput, setCssInput] = useState(`.container {
  width: 100%;
  padding: 20px;
}

h1 {
  font-size: 24px;
}`);
  const [mobile, setMobile] = useState(true);
  const [tablet, setTablet] = useState(true);
  const [desktop, setDesktop] = useState(true);
  const [includeBase, setIncludeBase] = useState(false);
  const [generated, setGenerated] = useState("");
  const [copied, setCopied] = useState(false);

  // NEW: Width state
  const [previewWidth, setPreviewWidth] = useState(600);
  const isResizing = useRef(false);

  const breakpoints = {
    mobile: "@media (max-width: 768px)",
    tablet: "@media (min-width: 769px) and (max-width: 1024px)",
    desktop: "@media (min-width: 1025px)",
  };

  function wrapWithMedia(media, css) {
    const trimmed = css.trim();
    if (!trimmed) return "";
    return `${media} {\n${indentCss(trimmed)}\n}\n`;
  }

  function indentCss(css, spaces = 2) {
    const pad = " ".repeat(spaces);
    return css
      .split("\n")
      .map((l) => (l.trim() === "" ? "" : pad + l))
      .join("\n");
  }

  function generate() {
    const parts = [];

    if (includeBase) {
      const base = cssInput.trim();
      if (base) parts.push(`${base}\n`);
    }

    if (!mobile && !tablet && !desktop) {
      setGenerated(cssInput.trim());
      return;
    }

    if (mobile) parts.push(wrapWithMedia(breakpoints.mobile, cssInput));
    if (tablet) parts.push(wrapWithMedia(breakpoints.tablet, cssInput));
    if (desktop) parts.push(wrapWithMedia(breakpoints.desktop, cssInput));

    setGenerated(parts.join("\n"));
    setCopied(false);
  }

  function handleCopy() {
    if (!generated) return;
    navigator.clipboard.writeText(generated).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  }

  function handleDownload() {
    const text = generated || cssInput;
    const blob = new Blob([text], { type: "text/css" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "responsive.css";
    a.click();
    URL.revokeObjectURL(url);
  }

  const previewCss = useMemo(
    () => generated || cssInput,
    [generated, cssInput]
  );

  // NEW: Resize events
  function startResize() {
    isResizing.current = true;
    document.body.style.userSelect = "none";
  }

  function stopResize() {
    isResizing.current = false;
    document.body.style.userSelect = "";
  }

  function onResize(e) {
    if (!isResizing.current) return;
    setPreviewWidth(Math.max(250, e.clientX - 50)); // minimum width 250px
  }

  // Listen global mouse events
  if (typeof window !== "undefined") {
    window.onmousemove = onResize;
    window.onmouseup = stopResize;
  }

  return (
    <main className="container mx-auto min-h-[84vh] pb-10 px-3 lg:px-0 mb-10 overflow-hidden">
      <div className="py-5">
        <h1 className="text-xl text-center font-semibold">
          Responsive CSS Generator | Developer Tools
        </h1>
        <p className="text-center text-xs">
          Pilih device & masukkan CSS. Klik Generate untuk membungkus CSS dengan
          media queries.
        </p>
      </div>

      <div className="max-w-5xl mx-auto bg-white border border-slate-300 rounded-2xl p-6 mt-5 md:mt-8">
        {/* breakpoints */}
        <section className="mb-6">
          <label className="block mb-2 font-medium">Breakpoints</label>
          <div className="flex flex-wrap gap-3 items-center">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={mobile}
                onChange={(e) => setMobile(e.target.checked)}
              />{" "}
              Mobile
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={tablet}
                onChange={(e) => setTablet(e.target.checked)}
              />{" "}
              Tablet
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={desktop}
                onChange={(e) => setDesktop(e.target.checked)}
              />{" "}
              Desktop
            </label>
            <label className="flex items-center gap-2 text-sm ml-4">
              <input
                type="checkbox"
                checked={includeBase}
                onChange={(e) => setIncludeBase(e.target.checked)}
              />{" "}
              Include base
            </label>
          </div>
          <div className="text-xs text-slate-600 mt-1">
            Mobile (max-width: 768px), Tablet (769px - 1024px), Desktop
            (min-width: 1025px)
          </div>
        </section>

        {/* CSS input */}
        <section className="mb-6">
          <label className="block mb-2 font-medium">
            Masukkan Main CSS Disini
          </label>
          <textarea
            value={cssInput}
            onChange={(e) => setCssInput(e.target.value)}
            rows={10}
            className="w-full p-4 border border-slate-200 rounded-lg resize-none font-mono text-sm bg-slate-50"
          />
        </section>

        {/* actions */}
        <div className="flex flex-wrap items-start gap-3 mb-6">
          <button
            onClick={generate}
            className="bg-gradient-to-r hover:bg-gradient-to-b from-gray-800 to-slate-900 hover:to-slate-950 text-white px-5 py-[7px] rounded-md flex items-center gap-1"
          >
            Generate Responsive CSS
          </button>

          <button
            onClick={handleCopy}
            className="md:ml-auto px-4 py-2 border rounded-lg text-sm"
            disabled={!generated}
          >
            {copied ? "Copied!" : "Copy Hasil"}
          </button>

          <button
            onClick={handleDownload}
            className="px-4 py-2 border rounded-lg text-sm"
          >
            Download .css
          </button>
        </div>

        {/* generated output */}
        <section className="mb-6">
          <label className="block mb-2 font-medium">Hasil Generated CSS</label>
          <textarea
            readOnly
            value={generated || "Klik Generate untuk melihat hasil."}
            rows={12}
            className="w-full p-4 border border-slate-200 rounded-lg resize-none font-mono text-sm bg-slate-50"
          />
        </section>

        {/* RESIZABLE LIVE PREVIEW */}
        <section>
          <label className="block mb-2 font-medium">
            Live Preview (Resizable)
          </label>

          <div className="relative border border-slate-200 rounded-lg p-4 bg-white">
            <style>{previewCss}</style>

            {/* Resizable container wrapper */}
            <div
              className="border rounded-lg shadow-sm bg-white overflow-hidden relative"
              style={{ width: previewWidth }}
            >
              <div className="container p-4">
                <h1 className="text-xl font-semibold mb-2">Preview Heading</h1>
                <p className="text-sm">
                  Resize kanan untuk melihat efek responsive tanpa devtools.
                </p>
              </div>

              {/* drag handle */}
              <div
                onMouseDown={startResize}
                className="absolute top-0 right-0 h-full w-3 cursor-ew-resize bg-transparent hover:bg-slate-200/40"
              />
            </div>

            <p className="text-xs text-slate-500 mt-3">
              Width: {previewWidth}px — tarik sisi kanan untuk mengubah ukuran
              preview.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
