"use client";

import { useRef, useState } from "react";
import JSZip from "jszip";

const formatBytes = (bytes) => {
  if (!Number.isFinite(bytes) || bytes < 0) return "-";
  if (bytes === 0) return "0 B";
  const units = ["B", "KB", "MB", "GB"];
  const index = Math.min(
    Math.floor(Math.log(bytes) / Math.log(1024)),
    units.length - 1,
  );
  const value = bytes / 1024 ** index;
  return `${value.toFixed(value >= 10 ? 0 : 2)} ${units[index]}`;
};

const getBaseName = (name = "document") => name.replace(/\.[^.]+$/, "");

export default function PdfImageExtractorPage() {
  const [file, setFile] = useState(null);
  const [images, setImages] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isExtracting, setIsExtracting] = useState(false);
  const [error, setError] = useState("");
  const [progress, setProgress] = useState("");

  const fileInputRef = useRef(null);
  const dragDepthRef = useRef(0);

  const canExtract = !!file && !isExtracting;

  const onPickFile = (selectedFiles) => {
    const list = Array.from(selectedFiles || []);
    if (list.length === 0) return;
    const picked = list[0];
    if (picked.type !== "application/pdf" && !picked.name.toLowerCase().endsWith(".pdf")) {
      setError("File harus berupa PDF.");
      setFile(null);
      setImages([]);
      return;
    }
    setError("");
    setImages([]);
    setFile(picked);
    setProgress("");
  };

  const handleFileInputChange = (event) => {
    onPickFile(event.target.files);
    event.target.value = "";
  };

  const handleDragEnter = (event) => {
    event.preventDefault();
    dragDepthRef.current += 1;
    setIsDragging(true);
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    dragDepthRef.current = Math.max(0, dragDepthRef.current - 1);
    if (dragDepthRef.current === 0) setIsDragging(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    dragDepthRef.current = 0;
    setIsDragging(false);
    onPickFile(event.dataTransfer.files);
  };

  const handleExtract = async () => {
    if (!file) {
      setError("Pilih file PDF dulu.");
      return;
    }
    setIsExtracting(true);
    setError("");
    setImages([]);
    setProgress("Membaca PDF...");

    try {
      const pdfjsLib = await import("pdfjs-dist");
      // @ts-ignore
      pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

      const extracted = [];
      for (let pageNum = 1; pageNum <= pdf.numPages; pageNum += 1) {
        setProgress(`Memproses halaman ${pageNum}/${pdf.numPages}...`);
        const page = await pdf.getPage(pageNum);
        const operatorList = await page.getOperatorList();
        const objs = page.commonObjs;

        // ponytail: ambil image dari operator list; cukup commonObjs biasa
        for (let i = 0; i < operatorList.fnArray.length; i += 1) {
          const fnId = operatorList.fnArray[i];
          const args = operatorList.argsArray[i] || [];
          // paintImageXObject
          if (fnId === pdfjsLib.OPS.paintImageXObject || fnId === pdfjsLib.OPS.paintJpegXObject) {
            const name = args[0];
            try {
              const img = objs.get(name);
              if (!img) continue;
              let blob = null;
              if (img.data instanceof Uint8Array && img.kind === 2) {
                // raw RGB - buat canvas sederhana
                const canvas = document.createElement("canvas");
                canvas.width = img.width;
                canvas.height = img.height;
                const ctx = canvas.getContext("2d");
                if (!ctx) continue;
                const imageData = ctx.createImageData(img.width, img.height);
                if (img.data.length === img.width * img.height * 3) {
                  for (let j = 0; j < img.data.length; j += 3) {
                    const k = (j / 3) * 4;
                    imageData.data[k] = img.data[j];
                    imageData.data[k + 1] = img.data[j + 1];
                    imageData.data[k + 2] = img.data[j + 2];
                    imageData.data[k + 3] = 255;
                  }
                  ctx.putImageData(imageData, 0, 0);
                } else if (img.data.length === img.width * img.height) {
                  for (let j = 0; j < img.data.length; j += 1) {
                    const k = j * 4;
                    const v = img.data[j];
                    imageData.data[k] = v;
                    imageData.data[k + 1] = v;
                    imageData.data[k + 2] = v;
                    imageData.data[k + 3] = 255;
                  }
                  ctx.putImageData(imageData, 0, 0);
                }
                blob = await new Promise((res) => canvas.toBlob(res, "image/png"));
              } else if (img.data instanceof Uint8Array && img.kind === 1 && img.format === "jpeg") {
                blob = new Blob([img.data], { type: "image/jpeg" });
              } else if (img.data instanceof HTMLImageElement) {
                const canvas = document.createElement("canvas");
                canvas.width = img.data.width;
                canvas.height = img.data.height;
                const ctx = canvas.getContext("2d");
                if (!ctx) continue;
                ctx.drawImage(img.data, 0, 0);
                blob = await new Promise((res) => canvas.toBlob(res, "image/png"));
              } else if (img instanceof ImageBitmap) {
                const canvas = document.createElement("canvas");
                canvas.width = img.width;
                canvas.height = img.height;
                const ctx = canvas.getContext("2d");
                if (!ctx) continue;
                ctx.drawImage(img, 0, 0);
                blob = await new Promise((res) => canvas.toBlob(res, "image/png"));
              }
              if (blob) {
                const url = URL.createObjectURL(blob);
                extracted.push({
                  id: `${pageNum}-${extracted.length + 1}-${Date.now()}`,
                  pageNum,
                  blob,
                  url,
                  name: `${getBaseName(file.name)}-page${pageNum}-${extracted.length + 1}.png`,
                  size: blob.size,
                });
              }
            } catch (e) {
              // skip image if can't decode
            }
          }
        }
      }

      setImages(extracted);
      setProgress(extracted.length === 0 ? "Tidak ada gambar ditemukan di PDF ini." : "");
    } catch (err) {
      setError(err?.message || "Gagal mengekstrak gambar dari PDF.");
    } finally {
      setIsExtracting(false);
      setProgress("");
    }
  };

  const triggerDownload = (blob, fileName) => {
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  const handleDownloadAll = async () => {
    if (images.length === 0) return;
    if (images.length === 1) {
      triggerDownload(images[0].blob, images[0].name);
      return;
    }
    const zip = new JSZip();
    images.forEach((item, index) => {
      const ext = item.name.split(".").pop() || "png";
      zip.file(`${index + 1}-image.${ext}`, item.blob);
    });
    const blob = await zip.generateAsync({ type: "blob" });
    triggerDownload(blob, `${getBaseName(file?.name || "pdf")}-images.zip`);
  };

  const handleReset = () => {
    setFile(null);
    setImages([]);
    setError("");
    setProgress("");
    setIsDragging(false);
    dragDepthRef.current = 0;
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="container mx-auto min-h-[83vh] px-3 md:px-0">
      <div className="py-5 text-center">
        <h1 className="text-xl font-semibold">PDF Image Extractor</h1>
        <p className="mt-1 text-xs text-slate-600">
          Ekstrak gambar yang tertanam di file PDF langsung di browser.
        </p>
      </div>

      <div className="mx-auto grid max-w-6xl gap-4 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs">
          <div
            onDragEnter={handleDragEnter}
            onDragOver={(e) => e.preventDefault()}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`rounded-2xl border-2 border-dashed p-6 text-center transition ${
              isDragging
                ? "border-slate-900 bg-slate-100"
                : "border-slate-300 bg-slate-50/60"
            }`}
          >
            <p className="text-sm font-semibold">Drop file PDF di sini</p>
            <p className="mt-1 text-xs text-slate-500">
              Hanya PDF. Proses sepenuhnya di browser.
            </p>
            <label className="mt-4 inline-flex cursor-pointer items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white">
              <input
                ref={fileInputRef}
                type="file"
                accept="application/pdf,.pdf"
                onChange={handleFileInputChange}
                className="hidden"
              />
              Pilih PDF
            </label>
            {file && (
              <p className="mt-3 text-xs text-slate-600">
                {file.name} • {formatBytes(file.size)}
              </p>
            )}
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={handleExtract}
              disabled={!canExtract}
              className="rounded-full bg-linear-to-r from-slate-900 to-slate-700 px-5 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isExtracting ? "Mengekstrak..." : "Ekstrak Gambar"}
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="rounded-full border border-slate-300 px-5 py-2 text-sm font-medium text-slate-700"
            >
              Reset
            </button>
          </div>

          {(error || progress) && (
            <div className="mt-3 text-xs">
              {error && <p className="text-red-600">{error}</p>}
              {progress && !error && <p className="text-slate-600">{progress}</p>}
            </div>
          )}
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs">
          <div className="flex items-center justify-between gap-2">
            <div>
              <h2 className="text-base font-semibold">Hasil Ekstraksi</h2>
              <p className="text-xs text-slate-500">
                {images.length > 0
                  ? `${images.length} gambar ditemukan`
                  : "Gambar hasil ekstraksi akan muncul di sini."}
              </p>
            </div>
            {images.length > 0 && (
              <button
                type="button"
                onClick={handleDownloadAll}
                className="rounded-full bg-slate-900 px-3 py-1.5 text-xs font-medium text-white"
              >
                Download Semua (ZIP)
              </button>
            )}
          </div>

          {images.length === 0 ? (
            <div className="mt-4 flex min-h-64 items-center justify-center rounded-2xl bg-slate-50 px-6 py-16 text-center text-sm text-slate-500">
              Belum ada gambar diekstrak.
            </div>
          ) : (
            <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-3">
              {images.map((item) => (
                <div
                  key={item.id}
                  className="overflow-hidden rounded-xl border border-slate-200"
                >
                  <div className="relative aspect-square bg-slate-50">
                  <img
                    src={item.url}
                    alt={`Gambar halaman ${item.pageNum}`}
                    className="h-full w-full object-contain"
                  />
                  </div>
                  <div className="flex items-center justify-between gap-2 p-2">
                    <p className="truncate text-xs text-slate-600">
                      Hal {item.pageNum} • {formatBytes(item.size)}
                    </p>
                    <button
                      type="button"
                      onClick={() => triggerDownload(item.blob, item.name)}
                      className="rounded-full border border-slate-300 px-2 py-1 text-xs"
                    >
                      Download
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
