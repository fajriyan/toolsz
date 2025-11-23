"use client";

import { useState } from "react";
import JSZip from "jszip";
import toast from "react-hot-toast";

export default function Page() {
  const [url, setUrl] = useState("");
  const [includeBg, setIncludeBg] = useState(false);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);

  const extractVideos = async () => {
    if (!url) {
      toast.error("URL tidak boleh kosong");
      return;
    }

    setLoading(true);
    setVideos([]);

    try {
      const res = await fetch("/layanan/video-extractor/api", {
        method: "POST",
        body: JSON.stringify({
          url,
          includeBackground: includeBg,
        }),
      });

      const data = await res.json();

      if (data.error) {
        toast.error(data.error);
      } else {
        setVideos(data.videos || []);
        toast.success("Berhasil mengambil video");
      }
    } catch (e) {
      toast.error("Gagal memproses");
    }

    setLoading(false);
  };

  const downloadZip = async () => {
    if (videos.length === 0) {
      toast.error("Tidak ada video untuk di-download");
      return;
    }

    setLoading(true);
    const zip = new JSZip();

    try {
      for (let i = 0; i < videos.length; i++) {
        const videoUrl = videos[i];
        const filename = `video_${i + 1}${getExtension(videoUrl)}`;

        const res = await fetch(videoUrl);
        const blob = await res.blob();
        zip.file(filename, blob);
      }

      const content = await zip.generateAsync({ type: "blob" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(content);
      link.download = "videos.zip";
      link.click();
    } catch (err) {
      toast.error("Gagal membuat ZIP");
    }

    setLoading(false);
  };

  const getExtension = (url) => {
    const match = url.match(/\.\w+$/);
    return match ? match[0] : ".mp4";
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Video Extractor</h1>

      <input
        type="text"
        placeholder="Masukkan URL..."
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="w-full p-3 border rounded"
      />

      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={includeBg}
          onChange={(e) => setIncludeBg(e.target.checked)}
        />
        Sertakan background video (CSS background / data-bg-video)
      </label>

      <button
        onClick={extractVideos}
        disabled={loading}
        className="px-4 py-2 rounded bg-blue-600 text-white"
      >
        {loading ? "Loading..." : "Extract Video"}
      </button>

      {videos.length > 0 && (
        <div className="space-y-4">
          <h2 className="font-semibold">Ditemukan: {videos.length} video</h2>

          <button
            onClick={downloadZip}
            className="px-4 py-2 rounded bg-green-600 text-white"
          >
            Download ZIP
          </button>

          <div className="space-y-3">
            {videos.map((v, i) => (
              <div key={i} className="p-3 border rounded">
                <video src={v} controls className="w-full rounded" />
                <a
                  href={v}
                  download
                  className="text-blue-600 underline text-sm"
                >
                  Download video {i + 1}
                </a>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
