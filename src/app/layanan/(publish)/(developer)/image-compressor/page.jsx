"use client";

import { useEffect, useMemo, useState } from "react";

const DEFAULT_SETTINGS = {
  format: "webp",
  quality: 80,
  maxWidth: "",
  maxHeight: "",
};

const formatBytes = (bytes) => {
  if (!Number.isFinite(bytes) || bytes < 0) return "-";
  if (bytes === 0) return "0 B";
  const units = ["B", "KB", "MB", "GB"];
  const index = Math.min(
    Math.floor(Math.log(bytes) / Math.log(1024)),
    units.length - 1
  );
  const value = bytes / 1024 ** index;
  return `${value.toFixed(value >= 10 ? 0 : 2)} ${units[index]}`;
};

const getBaseName = (name = "image") => name.replace(/\.[^.]+$/, "");

const getOutputExt = (format) => {
  if (format === "jpg") return "jpg";
  if (format === "png") return "png";
  return "webp";
};

const getMimeType = (format) => {
  if (format === "jpg") return "image/jpeg";
  if (format === "png") return "image/png";
  return "image/webp";
};

const loadImage = (src) =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("Gagal membaca file gambar."));
    image.src = src;
  });

const compressImage = async (file, settings) => {
  const sourceUrl = URL.createObjectURL(file);
  try {
    const image = await loadImage(sourceUrl);
    const originalWidth = image.naturalWidth || image.width;
    const originalHeight = image.naturalHeight || image.height;
    let targetWidth = originalWidth;
    let targetHeight = originalHeight;

    const maxWidth = Number(settings.maxWidth) || 0;
    const maxHeight = Number(settings.maxHeight) || 0;

    if (maxWidth > 0 && targetWidth > maxWidth) {
      const ratio = maxWidth / targetWidth;
      targetWidth = maxWidth;
      targetHeight = Math.round(targetHeight * ratio);
    }

    if (maxHeight > 0 && targetHeight > maxHeight) {
      const ratio = maxHeight / targetHeight;
      targetHeight = maxHeight;
      targetWidth = Math.round(targetWidth * ratio);
    }

    const canvas = document.createElement("canvas");
    canvas.width = Math.max(1, targetWidth);
    canvas.height = Math.max(1, targetHeight);

    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas tidak tersedia di browser ini.");

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    if (settings.format === "jpg") {
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

    const mimeType = getMimeType(settings.format);
    const quality =
      settings.format === "png" ? undefined : Number(settings.quality) / 100;

    const blob = await new Promise((resolve, reject) => {
      canvas.toBlob(
        (result) => {
          if (!result) {
            reject(new Error("Kompresi gagal. Coba format atau quality lain."));
            return;
          }
          resolve(result);
        },
        mimeType,
        quality
      );
    });

    return {
      blob,
      originalWidth,
      originalHeight,
      targetWidth: canvas.width,
      targetHeight: canvas.height,
    };
  } finally {
    URL.revokeObjectURL(sourceUrl);
  }
};

export default function ImageCompressorPage() {
  const [file, setFile] = useState(null);
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [isDragging, setIsDragging] = useState(false);
  const [isCompressing, setIsCompressing] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);
  const [originalPreviewUrl, setOriginalPreviewUrl] = useState("");
  const [compressedPreviewUrl, setCompressedPreviewUrl] = useState("");

  useEffect(() => {
    if (!file) {
      setOriginalPreviewUrl("");
      return undefined;
    }

    const url = URL.createObjectURL(file);
    setOriginalPreviewUrl(url);

    return () => URL.revokeObjectURL(url);
  }, [file]);

  useEffect(() => {
    if (!result?.blob) {
      setCompressedPreviewUrl("");
      return undefined;
    }

    const url = URL.createObjectURL(result.blob);
    setCompressedPreviewUrl(url);

    return () => URL.revokeObjectURL(url);
  }, [result]);

  const canCompress = Boolean(file) && !isCompressing;
  const outputExt = useMemo(() => getOutputExt(settings.format), [settings.format]);

  const onPickFile = (selectedFile) => {
    if (!selectedFile) return;

    if (!selectedFile.type?.startsWith("image/")) {
      setError("File harus berupa gambar.");
      return;
    }

    setError("");
    setFile(selectedFile);
    setResult(null);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);
    const droppedFile = event.dataTransfer.files?.[0];
    onPickFile(droppedFile);
  };

  const handleCompress = async () => {
    if (!file) {
      setError("Pilih gambar dulu.");
      return;
    }

    setIsCompressing(true);
    setError("");

    try {
      const output = await compressImage(file, settings);
      const baseName = getBaseName(file.name);
      const fileName = `${baseName}-compressed.${outputExt}`;

      setResult({
        blob: output.blob,
        fileName,
        originalSize: file.size,
        compressedSize: output.blob.size,
        originalWidth: output.originalWidth,
        originalHeight: output.originalHeight,
        targetWidth: output.targetWidth,
        targetHeight: output.targetHeight,
      });
    } catch (err) {
      setError(err?.message || "Kompresi gagal.");
    } finally {
      setIsCompressing(false);
    }
  };

  const handleDownload = () => {
    if (!result?.blob) return;

    const url = URL.createObjectURL(result.blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = result.fileName;
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  const savings =
    result?.originalSize && result?.compressedSize
      ? Math.max(
          0,
          Math.round(100 - (result.compressedSize / result.originalSize) * 100)
        )
      : 0;

  return (
    <div className="container mx-auto min-h-[83vh] px-3 md:px-0">
      <div className="py-5 text-center">
        <h1 className="text-xl font-semibold">Image Compressor</h1>
        <p className="mt-1 text-xs text-slate-600">
          Kompres gambar langsung di browser tanpa backend.
        </p>
      </div>

      <div className="mx-auto grid max-w-6xl gap-4 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            className={`rounded-2xl border-2 border-dashed p-6 text-center transition ${
              isDragging
                ? "border-slate-900 bg-slate-50"
                : "border-slate-300 bg-slate-50/60"
            }`}
          >
            <p className="text-sm font-semibold">Drop image di sini</p>
            <p className="mt-1 text-xs text-slate-500">
              atau pilih file JPG, PNG, dan WebP dari perangkatmu.
            </p>

            <label className="mt-4 inline-flex cursor-pointer items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => onPickFile(e.target.files?.[0])}
              />
              Pilih Gambar
            </label>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <label className="block">
              <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500">
                Format output
              </span>
              <select
                value={settings.format}
                onChange={(e) =>
                  setSettings((prev) => ({ ...prev, format: e.target.value }))
                }
                className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-900"
              >
                <option value="webp">WebP</option>
                <option value="jpg">JPG</option>
                <option value="png">PNG</option>
              </select>
            </label>

            <label className="block">
              <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500">
                Quality
              </span>
              <div className="flex items-center gap-3 rounded-xl border border-slate-300 px-3 py-2">
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={settings.quality}
                  disabled={settings.format === "png"}
                  onChange={(e) =>
                    setSettings((prev) => ({
                      ...prev,
                      quality: e.target.value,
                    }))
                  }
                  className="w-full accent-slate-900"
                />
                <span className="w-10 text-right text-sm font-medium text-slate-700">
                  {settings.format === "png" ? "-" : settings.quality}
                </span>
              </div>
              {settings.format === "png" && (
                <p className="mt-1 text-xs text-slate-500">
                  Quality tidak dipakai untuk PNG.
                </p>
              )}
            </label>

            <label className="block">
              <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500">
                Max width
              </span>
              <input
                type="number"
                min="0"
                placeholder="Kosongkan untuk asli"
                value={settings.maxWidth}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    maxWidth: e.target.value,
                  }))
                }
                className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-900"
              />
            </label>

            <label className="block">
              <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500">
                Max height
              </span>
              <input
                type="number"
                min="0"
                placeholder="Kosongkan untuk asli"
                value={settings.maxHeight}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    maxHeight: e.target.value,
                  }))
                }
                className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-900"
              />
            </label>
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={handleCompress}
              disabled={!canCompress}
              className="rounded-full bg-gradient-to-r from-slate-900 to-slate-700 px-5 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isCompressing ? "Mengecilkan..." : "Compress Image"}
            </button>
            <button
              type="button"
              onClick={() => {
                setFile(null);
                setResult(null);
                setError("");
                setSettings(DEFAULT_SETTINGS);
              }}
              className="rounded-full border border-slate-300 px-5 py-2 text-sm font-medium text-slate-700"
            >
              Reset
            </button>
          </div>

          {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

          {file && (
            <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm font-semibold">File dipilih</p>
              <div className="mt-2 grid gap-1 text-sm text-slate-600">
                <span>{file.name}</span>
                <span>{formatBytes(file.size)}</span>
                <span>{file.type || "image"}</span>
              </div>
            </div>
          )}
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between gap-2">
            <div>
              <h2 className="text-base font-semibold">Hasil Kompresi</h2>
              <p className="text-xs text-slate-500">
                Preview before/after dan file hasil download.
              </p>
            </div>
            {result && (
              <button
                type="button"
                onClick={handleDownload}
                className="rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700"
              >
                Download
              </button>
            )}
          </div>

          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <PreviewCard
              title="Original"
              subtitle={file ? formatBytes(file.size) : "Belum ada file"}
              src={originalPreviewUrl}
              alt="Original preview"
            />
            <PreviewCard
              title="Compressed"
              subtitle={result ? formatBytes(result.compressedSize) : "Belum diproses"}
              src={compressedPreviewUrl}
              alt="Compressed preview"
            />
          </div>

          {result && (
            <div className="mt-5 rounded-2xl bg-slate-50 p-4">
              <div className="grid gap-3 sm:grid-cols-2">
                <InfoRow label="Original Size" value={formatBytes(result.originalSize)} />
                <InfoRow
                  label="Compressed Size"
                  value={formatBytes(result.compressedSize)}
                />
                <InfoRow
                  label="Resolution"
                  value={`${result.originalWidth} x ${result.originalHeight}`}
                />
                <InfoRow
                  label="Output Resolution"
                  value={`${result.targetWidth} x ${result.targetHeight}`}
                />
              </div>
              <div className="mt-4 rounded-xl bg-white px-4 py-3 text-sm font-medium text-slate-800">
                Hemat sekitar {savings}% ukuran file.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function PreviewCard({ title, subtitle, src, alt }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200">
      <div className="border-b border-slate-200 bg-slate-50 px-4 py-3">
        <p className="text-sm font-semibold">{title}</p>
        <p className="text-xs text-slate-500">{subtitle}</p>
      </div>
      <div className="flex min-h-64 items-center justify-center bg-slate-100">
        {src ? (
          <img
            src={src}
            alt={alt}
            className="max-h-80 w-full object-contain"
          />
        ) : (
          <div className="px-6 py-16 text-center text-sm text-slate-500">
            Preview akan muncul di sini.
          </div>
        )}
      </div>
    </div>
  );
}

function InfoRow({ label, value }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white px-4 py-3">
      <p className="text-xs uppercase tracking-wide text-slate-500">{label}</p>
      <p className="mt-1 text-sm font-semibold text-slate-900">{value}</p>
    </div>
  );
}
