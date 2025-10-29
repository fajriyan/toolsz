"use client";
import { useState, useEffect } from "react";
import JSZip from "jszip";
import toast from "react-hot-toast";

export default function Page() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [filterType, setFilterType] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [orderBy, setOrderBy] = useState("normal");
  const [sizes, setSizes] = useState({});
  const [selected, setSelected] = useState([]);
  const [includeBackground, setIncludeBackground] = useState(false);

  const [downloading, setDownloading] = useState(false);
  const [downloadingAll, setDownloadingAll] = useState(false);
  const [exporting, setExporting] = useState(false);

  const handleExtract = async () => {
    setLoading(true);
    setResult(null);
    setFilterType("all");
    setSearchTerm("");
    setSelected([]);
    setSizes({});
    try {
      const res = await fetch("/layanan/image-extractor/api", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, includeBackground }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Terjadi kesalahan di server");
      setResult(data);
    } catch (err) {
      toast((t) => (
        <div className="flex items-center gap-2">
          Gagal mengambil data: ${err.message}
          <button onClick={() => toast.dismiss(t.id)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-x-lg"
              viewBox="0 0 16 16"
            >
              <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
            </svg>
          </button>
        </div>
      ));
      console.error("Extractor client error:", err);
    } finally {
      setLoading(false);
    }
  };

  const imageTypes =
    result?.images
      ?.map((src) => src.split(".").pop().split("?")[0].toLowerCase())
      .filter((ext) => ext.length <= 5 && /^[a-z0-9]+$/.test(ext)) || [];

  const uniqueTypes = ["all", ...new Set(imageTypes)];

  useEffect(() => {
    if (!result?.images || orderBy !== "size") return;

    const controller = new AbortController();
    async function fetchSizes() {
      const newSizes = {};
      for (const img of result.images) {
        try {
          const res = await fetch(img, {
            method: "HEAD",
            signal: controller.signal,
          });
          const size = res.headers.get("content-length");
          if (size) newSizes[img] = parseInt(size);
        } catch {}
      }
      setSizes(newSizes);
    }

    fetchSizes();
    return () => controller.abort();
  }, [result, orderBy]);

  const filteredImages =
    result?.images
      ?.filter((src) =>
        filterType === "all" ? true : src.toLowerCase().endsWith(filterType)
      )
      ?.filter((src) => src.toLowerCase().includes(searchTerm.toLowerCase()))
      ?.sort((a, b) => {
        if (orderBy === "size") {
          const sizeA = sizes[a] || 0;
          const sizeB = sizes[b] || 0;
          return sizeB - sizeA;
        }
        return a.localeCompare(b);
      }) || [];

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    toast((t) => (
      <div className="flex items-center gap-2">
        URL berhasil disalin
        <button onClick={() => toast.dismiss(t.id)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-x-lg"
            viewBox="0 0 16 16"
          >
            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
          </svg>
        </button>
      </div>
    ));
  };

  const handleDownload = (src) => {
    const link = document.createElement("a");
    link.href = src;
    link.download = src.split("/").pop().split("?")[0];
    link.target = "_blank";
    link.click();
  };

  const toggleSelect = (src) => {
    setSelected((prev) => {
      if (prev.includes(src)) return prev.filter((s) => s !== src);
      return [...prev, src];
    });
  };

  const selectAll = () => setSelected(filteredImages);
  const clearSelection = () => setSelected([]);

  const downloadAsZip = async (imagesToDownload, zipName, setLoadingState) => {
    if (!imagesToDownload.length) {
      toast((t) => (
        <div className="flex items-center gap-2">
          Tidak ada gambar yang dipilih!
          <button onClick={() => toast.dismiss(t.id)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-x-lg"
              viewBox="0 0 16 16"
            >
              <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
            </svg>
          </button>
        </div>
      ));
      return;
    }

    setLoadingState(true);
    const zip = new JSZip();
    let success = 0;
    let failed = 0;

    try {
      for (const src of imagesToDownload) {
        try {
          const proxyUrl = `/layanan/image-extractor/proxy?url=${encodeURIComponent(
            src
          )}`;
          const res = await fetch(proxyUrl);
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          const blob = await res.blob();
          const filename = decodeURIComponent(
            src.split("/").pop().split("?")[0]
          );
          zip.file(filename || `image_${success + 1}.jpg`, blob);
          success++;
        } catch (err) {
          console.warn(`Gagal download: ${src}`, err);
          failed++;
        }
      }

      if (success === 0) {
        toast((t) => (
          <div className="flex items-center gap-2">
            Semua download gagal. Coba cek URL atau proxy.
            <button onClick={() => toast.dismiss(t.id)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-x-lg"
                viewBox="0 0 16 16"
              >
                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
              </svg>
            </button>
          </div>
        ));
        return;
      }

      const zipBlob = await zip.generateAsync({ type: "blob" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(zipBlob);
      link.download = zipName;
      link.click();

      toast((t) => (
        <div className="flex items-center gap-2">
          Berhasil mengunduh ${success} gambar (${failed} gagal) ke ${zipName}
          <button onClick={() => toast.dismiss(t.id)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-x-lg"
              viewBox="0 0 16 16"
            >
              <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
            </svg>
          </button>
        </div>
      ));
    } finally {
      setLoadingState(false);
    }
  };

  const handleExport = async () => {
    setExporting(true);
    try {
      const blob = new Blob([JSON.stringify(result, null, 2)], {
        type: "application/json",
      });
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = "images.json";
      a.click();
    } finally {
      setExporting(false);
    }
  };

  return (
    <main className="container mx-auto mb-10 px-3 md:px-0 min-h-[80dvh]">
      <div className="py-5">
        <h1 className="text-xl text-center font-semibold">
          Extract Gambar Online Gratis | SEO Tools
        </h1>
        <p className="text-center text-xs">
          Alat sederhana untuk mengekstrak dan mengunduh gambar dari halaman
          web.
        </p>
      </div>

      <div className="flex flex-col md:w-[80%] xl:w-[50%] mx-auto gap-4 mt-8">
        <div className="">
          <input
            type="text"
            placeholder="Masukkan URL Website"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full px-3 py-2 focus-within:outline-none focus:border-cyan-700 border border-gray-300 rounded mb-4"
          />
          <button
            onClick={handleExtract}
            disabled={loading || !url}
            className="block bg-gradient-to-r from-gray-800 to-slate-900 hover:ring-2 ring-cyan-500 font-medium text-white px-3 py-[7px] w-full text-center cursor-pointer rounded-lg"
          >
            {loading ? "Memuat Website..." : "Identifikasi Website"}
          </button>
        </div>
        <label className="flex items-center gap-2 text-sm mb-4">
          <input
            type="checkbox"
            checked={includeBackground}
            onChange={(e) => setIncludeBackground(e.target.checked)}
            className="accent-slate-800"
          />
          Sertakan background-image (CSS)
        </label>
      </div>

      <div className="mt-10">
        {result ? (
          <div className="border rounded-md p-4 space-y-4">
            {result.error ? (
              <p className="text-red-600">{result.error}</p>
            ) : (
              <>
                {/* Controls */}
                <div className="flex flex-wrap gap-3 items-center justify-between">
                  <h2 className="text-md font-semibold">
                    Ditemukan {filteredImages.length} gambar
                  </h2>

                  <div className="flex flex-wrap gap-2">
                    <select
                      value={filterType}
                      onChange={(e) => setFilterType(e.target.value)}
                      className="border border-slate-300 rounded-md px-2 py-1"
                    >
                      {uniqueTypes.map((type) => (
                        <option key={type} value={type}>
                          {type.toUpperCase()}
                        </option>
                      ))}
                    </select>

                    <input
                      type="text"
                      placeholder="Cari gambar..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="border border-slate-300 rounded-md px-2 py-1"
                    />

                    <select
                      value={orderBy}
                      onChange={(e) => setOrderBy(e.target.value)}
                      className="border border-slate-300 rounded-md px-2 py-1"
                    >
                      <option value="normal">Order by: Normal</option>
                      <option value="size">Order by: Size</option>
                    </select>
                  </div>
                </div>

                {/* Action bar */}
                <div className="flex flex-wrap gap-2 justify-between border-b pb-3">
                  <div className="flex gap-2">
                    <button
                      onClick={selectAll}
                      className="bg-gray-200 px-3 py-1 rounded-md text-sm hover:bg-gray-300"
                    >
                      Pilih Semua
                    </button>
                    <button
                      onClick={clearSelection}
                      className="bg-gray-200 px-3 py-1 rounded-md text-sm hover:bg-gray-300"
                    >
                      Hapus Pilihan
                    </button>
                  </div>

                  <div className="flex gap-2 flex-nowrap overflow-x-auto ">
                    <button
                      onClick={() =>
                        downloadAsZip(
                          selected,
                          "selected_images.zip",
                          setDownloading
                        )
                      }
                      disabled={downloading || selected.length === 0}
                      className={`px-4 py-1 rounded-md text-sm text-white min-w-max ${
                        downloading
                          ? "bg-slate-600"
                          : "bg-slate-800 hover:ring-2 ring-cyan-500 cursor-pointer"
                      }`}
                    >
                      {downloading
                        ? "Mengunduh..."
                        : `Download Terpilih (${selected.length})`}
                    </button>

                    <button
                      onClick={() =>
                        downloadAsZip(
                          filteredImages,
                          "all_images.zip",
                          setDownloadingAll
                        )
                      }
                      disabled={downloadingAll || !filteredImages.length}
                      className={`px-4 py-1 rounded-md text-sm text-white min-w-max ${
                        downloadingAll
                          ? "bg-slate-600"
                          : "bg-slate-800 hover:ring-2 ring-cyan-500 cursor-pointer"
                      }`}
                    >
                      {downloadingAll ? "Mengunduh Semua..." : "Download Semua"}
                    </button>

                    <button
                      onClick={handleExport}
                      disabled={exporting}
                      className={`px-4 py-1 rounded-md text-sm text-white min-w-max ${
                        exporting
                          ? "bg-slate-600"
                          : "bg-slate-800 hover:ring-2 ring-cyan-500 cursor-pointer"
                      }`}
                    >
                      {exporting ? "⏳ Mengekspor..." : "Export JSON"}
                    </button>
                  </div>
                </div>

                {/* Grid Gambar */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-4">
                  {filteredImages.map((src, i) => {
                    const size = sizes[src]
                      ? `${(sizes[src] / 1024).toFixed(1)} KB`
                      : "—";
                    const isSelected = selected.includes(src);

                    return (
                      <div
                        key={i}
                        className={`relative border hover:shadow-md hover:-translate-y-1 duration-200 bg-white rounded-xl overflow-hidden shadow-sm flex flex-col ${
                          isSelected ? "ring-2 ring-slate-800" : ""
                        }`}
                      >
                        <label
                          htmlFor={"clickImage" + i}
                          className="cursor-pointer p-3"
                        >
                          <input
                            type="checkbox"
                            id={"clickImage" + i}
                            checked={isSelected}
                            onChange={() => toggleSelect(src)}
                            className="
    absolute top-2 left-2 w-5 h-5 rounded-full border-2 border-gray-400 appearance-none cursor-pointer
    flex items-center justify-center
    transition-all duration-200 ease-in-out
    checked:bg-black checked:border-black checked:scale-110
    checked:before:content-['✓'] checked:before:text-white checked:before:text-[10px]
    active:scale-95
  "
                          />

                          <div className="border border-slate-300 p-2 h-32 sm:h-56  bg-gray-100 rounded-lg">
                            <img
                              src={src}
                              alt={`img-${i}`}
                              className="w-full h-full object-center object-contain"
                            />
                          </div>
                          <div className="text-xs flex-1 flex flex-col justify-between mt-2">
                            <p className="break-all text-gray-600 mb-2 line-clamp-1">
                              {src}
                            </p>
                            <div className="flex items-center justify-between text-gray-500 text-[11px]">
                              <span>{size}</span>
                              <div className="flex gap-2">
                                <button
                                  onClick={() => handleCopy(src)}
                                  className="hover:scale-105 duration-200 hover:bg-slate-100 p-0.5 rounded-full"
                                >
                                  <svg
                                    className="w-5 h-5 text-gray-800"
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
                                      d="M13.213 9.787a3.391 3.391 0 0 0-4.795 0l-3.425 3.426a3.39 3.39 0 0 0 4.795 4.794l.321-.304m-.321-4.49a3.39 3.39 0 0 0 4.795 0l3.424-3.426a3.39 3.39 0 0 0-4.794-4.795l-1.028.961"
                                    />
                                  </svg>
                                </button>
                                <button
                                  onClick={() => handleDownload(src)}
                                  className="hover:scale-105 duration-200 hover:bg-slate-100 p-0.5 rounded-full"
                                >
                                  <svg
                                    className="w-5 h-5 text-gray-800"
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
                                      d="M12 13V4M7 14H5a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1h-2m-1-5-4 5-4-5m9 8h.01"
                                    />
                                  </svg>
                                </button>
                              </div>
                            </div>
                          </div>
                        </label>
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        ) : (
          <div className="mt-10 animate-pulse">
            <div className="border rounded-md p-4 space-y-4">
              <div className="flex flex-wrap gap-3 items-center justify-between">
                <div className="h-4 w-40 bg-gray-200 rounded"></div>
                <div className="flex flex-wrap gap-2">
                  <div className="h-8 w-24 bg-gray-200 rounded"></div>
                  <div className="h-8 w-32 bg-gray-200 rounded"></div>
                  <div className="h-8 w-28 bg-gray-200 rounded"></div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 justify-between border-b pb-3">
                <div className="flex gap-2">
                  <div className="h-8 w-24 bg-gray-200 rounded"></div>
                  <div className="h-8 w-24 bg-gray-200 rounded"></div>
                </div>
                <div className="flex gap-2">
                  <div className="h-8 w-36 bg-gray-200 rounded"></div>
                  <div className="h-8 w-32 bg-gray-200 rounded"></div>
                  <div className="h-8 w-28 bg-gray-200 rounded"></div>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-4">
                {[...Array(10)].map((_, i) => (
                  <div
                    key={i}
                    className="border bg-white rounded-xl overflow-hidden shadow-sm p-3 flex flex-col"
                  >
                    <div className="border border-slate-200 p-2 h-32 sm:h-56 bg-gray-200 rounded-lg"></div>
                    <div className="mt-2 flex-1 flex flex-col justify-between text-xs">
                      <div className="h-3 w-full bg-gray-200 rounded mb-2"></div>
                      <div className="flex items-center justify-between text-[11px]">
                        <div className="h-2 w-4 bg-gray-200 rounded"></div>
                        <div className="flex gap-2">
                          <div className="h-5 w-5 bg-gray-200 rounded-full"></div>
                          <div className="h-5 w-5 bg-gray-200 rounded-full"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
