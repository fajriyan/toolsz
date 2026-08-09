"use client";

import { useRef, useState } from "react";

const DEFAULT_SETTINGS = {
   format: "webp",
   quality: 80,
   maxWidth: "",
   maxHeight: "",
};

const DEFAULT_CROP = { x: 0, y: 0, width: 100, height: 100 };

// Batas resolusi kerja saat editing (rotate/crop) agar UI tetap responsif
// untuk foto beresolusi sangat besar. Kompresi akhir tetap memakai
// pengaturan maxWidth/maxHeight yang dipilih user.
const EDIT_MAX_DIMENSION = 2400;

const ALLOWED_FORMATS = new Set(["webp", "jpg", "png"]);
const ORIENTATION_SWAP = new Set([5, 6, 7, 8]);

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

const getBaseName = (name = "image") => name.replace(/\.[^.]+$/, "");

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

const parsePositiveInteger = (value) => {
   const number = Number.parseInt(value, 10);
   return Number.isFinite(number) && number > 0 ? number : 0;
};

const normalizeSettings = (settings = DEFAULT_SETTINGS) => {
   const format = ALLOWED_FORMATS.has(settings.format)
      ? settings.format
      : DEFAULT_SETTINGS.format;
   const quality = clamp(
      Number(settings.quality) || DEFAULT_SETTINGS.quality,
      10,
      100,
   );

   return {
      format,
      quality,
      maxWidth: parsePositiveInteger(settings.maxWidth),
      maxHeight: parsePositiveInteger(settings.maxHeight),
   };
};

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

const resizeToBounds = (width, height, maxWidth, maxHeight) => {
   let targetWidth = width;
   let targetHeight = height;

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

   return {
      targetWidth: Math.max(1, targetWidth),
      targetHeight: Math.max(1, targetHeight),
   };
};

const getCanvasDimensions = (targetWidth, targetHeight, orientation) => {
   if (ORIENTATION_SWAP.has(orientation)) {
      return {
         canvasWidth: targetHeight,
         canvasHeight: targetWidth,
      };
   }

   return {
      canvasWidth: targetWidth,
      canvasHeight: targetHeight,
   };
};

const applyOrientationTransform = (ctx, width, height, orientation) => {
   switch (orientation) {
      case 2:
         ctx.translate(width, 0);
         ctx.scale(-1, 1);
         break;
      case 3:
         ctx.translate(width, height);
         ctx.rotate(Math.PI);
         break;
      case 4:
         ctx.translate(0, height);
         ctx.scale(1, -1);
         break;
      case 5:
         ctx.rotate(0.5 * Math.PI);
         ctx.scale(1, -1);
         break;
      case 6:
         ctx.translate(width, 0);
         ctx.rotate(0.5 * Math.PI);
         break;
      case 7:
         ctx.translate(width, 0);
         ctx.rotate(0.5 * Math.PI);
         ctx.scale(-1, 1);
         break;
      case 8:
         ctx.translate(0, height);
         ctx.rotate(-0.5 * Math.PI);
         break;
      default:
         break;
   }
};

const isJpegFile = (file) =>
   /^image\/jpe?g$/i.test(file.type || "") || /\.jpe?g$/i.test(file.name || "");

const getExifOrientation = async (file) => {
   if (!isJpegFile(file)) return 1;

   try {
      const buffer = await file.slice(0, 256 * 1024).arrayBuffer();
      const view = new DataView(buffer);

      if (view.byteLength < 4 || view.getUint16(0, false) !== 0xffd8) {
         return 1;
      }

      let offset = 2;

      while (offset + 1 < view.byteLength) {
         const marker = view.getUint16(offset, false);
         offset += 2;

         if (marker === 0xffe1 && offset + 2 <= view.byteLength) {
            const segmentLength = view.getUint16(offset, false);
            offset += 2;

            if (offset + 6 > view.byteLength) {
               return 1;
            }

            if (view.getUint32(offset, false) !== 0x45786966) {
               offset += Math.max(0, segmentLength - 2);
               continue;
            }

            const tiffStart = offset + 6;
            const littleEndian = view.getUint16(tiffStart, false) === 0x4949;
            if (view.getUint16(tiffStart + 2, littleEndian) !== 0x002a) {
               return 1;
            }

            const firstIFDOffset = view.getUint32(tiffStart + 4, littleEndian);
            const dirStart = tiffStart + firstIFDOffset;
            if (dirStart + 2 > view.byteLength) {
               return 1;
            }

            const entries = view.getUint16(dirStart, littleEndian);
            for (let index = 0; index < entries; index += 1) {
               const entryOffset = dirStart + 2 + index * 12;
               if (entryOffset + 10 > view.byteLength) break;

               if (view.getUint16(entryOffset, littleEndian) === 0x0112) {
                  const orientation = view.getUint16(
                     entryOffset + 8,
                     littleEndian,
                  );
                  return orientation >= 1 && orientation <= 8 ? orientation : 1;
               }
            }

            return 1;
         }

         if ((marker & 0xff00) !== 0xff00 || offset + 2 > view.byteLength) {
            break;
         }

         const segmentLength = view.getUint16(offset, false);
         offset += segmentLength;
      }
   } catch {
      return 1;
   }

   return 1;
};

const loadImage = (src) =>
   new Promise((resolve, reject) => {
      const image = new Image();
      image.onload = () => resolve(image);
      image.onerror = () => reject(new Error("Gagal membaca file gambar."));
      image.src = src;
   });

// Menggambar sebuah <img> ke canvas dengan koreksi orientasi EXIF,
// pada dimensi target tertentu (tanpa crop/resize lanjutan).
const renderOrientedCanvas = (
   image,
   orientation,
   targetWidth,
   targetHeight,
) => {
   const { canvasWidth, canvasHeight } = getCanvasDimensions(
      targetWidth,
      targetHeight,
      orientation,
   );

   const canvas = document.createElement("canvas");
   canvas.width = canvasWidth;
   canvas.height = canvasHeight;

   const ctx = canvas.getContext("2d");
   if (!ctx) throw new Error("Canvas tidak tersedia di browser ini.");

   ctx.imageSmoothingEnabled = true;
   ctx.imageSmoothingQuality = "high";

   applyOrientationTransform(ctx, canvas.width, canvas.height, orientation);
   ctx.drawImage(image, 0, 0, targetWidth, targetHeight);

   return canvas;
};

// Merotasi isi sebuah canvas sejumlah 0/90/180/270 derajat, mengembalikan
// canvas baru (dimensi tertukar untuk 90/270).
const rotateCanvas = (source, degrees) => {
   if (degrees === 0) {
      const clone = document.createElement("canvas");
      clone.width = source.width;
      clone.height = source.height;
      clone.getContext("2d").drawImage(source, 0, 0);
      return clone;
   }

   const swap = degrees === 90 || degrees === 270;
   const canvas = document.createElement("canvas");
   canvas.width = swap ? source.height : source.width;
   canvas.height = swap ? source.width : source.height;

   const ctx = canvas.getContext("2d");
   ctx.translate(canvas.width / 2, canvas.height / 2);
   ctx.rotate((degrees * Math.PI) / 180);
   ctx.drawImage(source, -source.width / 2, -source.height / 2);

   return canvas;
};

// Memotong canvas kerja (hasil rotate) sesuai area crop (dalam persen),
// mengembalikan sebuah Blob PNG (lossless) untuk diproses ke tahap
// resize + kompresi berikutnya.
const buildEditedBlob = (rotatedCanvas, crop) => {
   const sx = clamp(
      Math.round((crop.x / 100) * rotatedCanvas.width),
      0,
      rotatedCanvas.width - 1,
   );
   const sy = clamp(
      Math.round((crop.y / 100) * rotatedCanvas.height),
      0,
      rotatedCanvas.height - 1,
   );
   const sw = clamp(
      Math.round((crop.width / 100) * rotatedCanvas.width),
      1,
      rotatedCanvas.width - sx,
   );
   const sh = clamp(
      Math.round((crop.height / 100) * rotatedCanvas.height),
      1,
      rotatedCanvas.height - sy,
   );

   const cropCanvas = document.createElement("canvas");
   cropCanvas.width = sw;
   cropCanvas.height = sh;
   const ctx = cropCanvas.getContext("2d");
   if (!ctx) throw new Error("Canvas tidak tersedia di browser ini.");
   ctx.drawImage(rotatedCanvas, sx, sy, sw, sh, 0, 0, sw, sh);

   return new Promise((resolve, reject) => {
      cropCanvas.toBlob((blob) => {
         if (!blob) {
            reject(new Error("Gagal memproses crop."));
            return;
         }
         resolve(blob);
      }, "image/png");
   });
};

const compressWithCanvas = async (image, settings, orientation) => {
   const originalWidth = image.naturalWidth || image.width;
   const originalHeight = image.naturalHeight || image.height;
   const { targetWidth, targetHeight } = resizeToBounds(
      originalWidth,
      originalHeight,
      settings.maxWidth,
      settings.maxHeight,
   );
   const { canvasWidth, canvasHeight } = getCanvasDimensions(
      targetWidth,
      targetHeight,
      orientation,
   );

   const canvas = document.createElement("canvas");
   canvas.width = canvasWidth;
   canvas.height = canvasHeight;

   const ctx = canvas.getContext("2d");
   if (!ctx) throw new Error("Canvas tidak tersedia di browser ini.");

   ctx.imageSmoothingEnabled = true;
   ctx.imageSmoothingQuality = "high";

   if (settings.format === "jpg") {
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
   }

   applyOrientationTransform(ctx, canvas.width, canvas.height, orientation);
   ctx.drawImage(image, 0, 0, targetWidth, targetHeight);

   const mimeType = getMimeType(settings.format);
   const quality =
      settings.format === "png" ? undefined : settings.quality / 100;

   const blob = await new Promise((resolve, reject) => {
      canvas.toBlob(
         (result) => {
            if (!result) {
               reject(
                  new Error("Kompresi gagal. Coba format atau quality lain."),
               );
               return;
            }
            resolve(result);
         },
         mimeType,
         quality,
      );
   });

   return {
      blob,
      originalWidth,
      originalHeight,
      targetWidth: canvas.width,
      targetHeight: canvas.height,
   };
};

const createCompressionWorker = () => {
   const workerSource = `
    const ORIENTATION_SWAP = new Set([5, 6, 7, 8]);

    const resizeToBounds = (width, height, maxWidth, maxHeight) => {
      let targetWidth = width;
      let targetHeight = height;

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

      return {
        targetWidth: Math.max(1, targetWidth),
        targetHeight: Math.max(1, targetHeight),
      };
    };

    const getCanvasDimensions = (targetWidth, targetHeight, orientation) => {
      if (ORIENTATION_SWAP.has(orientation)) {
        return {
          canvasWidth: targetHeight,
          canvasHeight: targetWidth,
        };
      }

      return {
        canvasWidth: targetWidth,
        canvasHeight: targetHeight,
      };
    };

    const applyOrientationTransform = (ctx, width, height, orientation) => {
      switch (orientation) {
        case 2:
          ctx.translate(width, 0);
          ctx.scale(-1, 1);
          break;
        case 3:
          ctx.translate(width, height);
          ctx.rotate(Math.PI);
          break;
        case 4:
          ctx.translate(0, height);
          ctx.scale(1, -1);
          break;
        case 5:
          ctx.rotate(0.5 * Math.PI);
          ctx.scale(1, -1);
          break;
        case 6:
          ctx.translate(width, 0);
          ctx.rotate(0.5 * Math.PI);
          break;
        case 7:
          ctx.translate(width, 0);
          ctx.rotate(0.5 * Math.PI);
          ctx.scale(-1, 1);
          break;
        case 8:
          ctx.translate(0, height);
          ctx.rotate(-0.5 * Math.PI);
          break;
        default:
          break;
      }
    };

    const getMimeType = (format) => {
      if (format === "jpg") return "image/jpeg";
      if (format === "png") return "image/png";
      return "image/webp";
    };

    self.onmessage = async (event) => {
      const { file, settings, orientation } = event.data;

      try {
        const bitmap = await createImageBitmap(file);
        const originalWidth = bitmap.width;
        const originalHeight = bitmap.height;
        const { targetWidth, targetHeight } = resizeToBounds(
          originalWidth,
          originalHeight,
          settings.maxWidth,
          settings.maxHeight
        );
        const { canvasWidth, canvasHeight } = getCanvasDimensions(
          targetWidth,
          targetHeight,
          orientation
        );

        const canvas = new OffscreenCanvas(
          Math.max(1, canvasWidth),
          Math.max(1, canvasHeight)
        );
        const ctx = canvas.getContext("2d");

        if (!ctx) {
          throw new Error("Canvas tidak tersedia di browser ini.");
        }

        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";

        if (settings.format === "jpg") {
          ctx.fillStyle = "#ffffff";
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }

        applyOrientationTransform(ctx, canvas.width, canvas.height, orientation);
        ctx.drawImage(bitmap, 0, 0, targetWidth, targetHeight);
        bitmap.close?.();

        const blob = await canvas.convertToBlob({
          type: getMimeType(settings.format),
          quality: settings.format === "png" ? undefined : settings.quality / 100,
        });

        self.postMessage({
          ok: true,
          blob,
          originalWidth,
          originalHeight,
          targetWidth: canvas.width,
          targetHeight: canvas.height,
        });
      } catch (error) {
        self.postMessage({
          ok: false,
          message: error?.message || "Kompresi gagal.",
        });
      }
    };
  `;

   const workerUrl = URL.createObjectURL(
      new Blob([workerSource], { type: "application/javascript" }),
   );

   return {
      workerUrl,
      worker: new Worker(workerUrl),
   };
};

const compressImageWithWorker = async (file, settings, orientation) => {
   const { worker, workerUrl } = createCompressionWorker();

   try {
      return await new Promise((resolve, reject) => {
         let cleanedUp = false;

         const cleanup = () => {
            if (cleanedUp) return;
            cleanedUp = true;
            worker.terminate();
            URL.revokeObjectURL(workerUrl);
         };

         worker.onmessage = (event) => {
            const { ok, blob, message, ...data } = event.data || {};
            cleanup();

            if (!ok) {
               reject(new Error(message || "Kompresi gagal."));
               return;
            }

            resolve({
               blob,
               ...data,
            });
         };

         worker.onerror = () => {
            cleanup();
            reject(new Error("Kompresi gagal. Coba lagi di browser lain."));
         };

         worker.postMessage({ file, settings, orientation });
      });
   } catch (error) {
      worker.terminate();
      URL.revokeObjectURL(workerUrl);
      throw error;
   }
};

const compressImageOnMainThread = async (file, settings, orientation) => {
   const sourceUrl = URL.createObjectURL(file);
   try {
      const image = await loadImage(sourceUrl);
      return await compressWithCanvas(image, settings, orientation);
   } finally {
      URL.revokeObjectURL(sourceUrl);
   }
};

const compressImage = async (file, settings) => {
   const normalizedSettings = normalizeSettings(settings);
   const orientation = await getExifOrientation(file);

   if (
      typeof Worker !== "undefined" &&
      typeof OffscreenCanvas !== "undefined" &&
      typeof createImageBitmap === "function"
   ) {
      try {
         return await compressImageWithWorker(
            file,
            normalizedSettings,
            orientation,
         );
      } catch {
         return await compressImageOnMainThread(
            file,
            normalizedSettings,
            orientation,
         );
      }
   }

   return await compressImageOnMainThread(
      file,
      normalizedSettings,
      orientation,
   );
};

export default function ImageCompressorPage() {
   const [file, setFile] = useState(null);
   const [settings, setSettings] = useState(DEFAULT_SETTINGS);
   const [isDragging, setIsDragging] = useState(false);
   const [isCompressing, setIsCompressing] = useState(false);
   const [isPreparing, setIsPreparing] = useState(false);
   const [error, setError] = useState("");
   const [result, setResult] = useState(null);
   const [originalPreviewUrl, setOriginalPreviewUrl] = useState("");
   const [compressedPreviewUrl, setCompressedPreviewUrl] = useState("");

   const [rotation, setRotation] = useState(0);
   const [crop, setCrop] = useState(DEFAULT_CROP);
   const [workingPreviewUrl, setWorkingPreviewUrl] = useState("");
   const [workingDims, setWorkingDims] = useState({ width: 0, height: 0 });
   const [isCropOpen, setIsCropOpen] = useState(false);

   const fileInputRef = useRef(null);
   const dragDepthRef = useRef(0);
   const orientedCanvasRef = useRef(null);
   const rotatedCanvasRef = useRef(null);
   const objectUrlsRef = useRef({ original: "", compressed: "" });

   const canCompress = Boolean(file) && !isCompressing && !isPreparing;
   const outputExt = getOutputExt(settings.format);

   const cropPixelWidth =
      Math.round((crop.width / 100) * workingDims.width) || 0;
   const cropPixelHeight =
      Math.round((crop.height / 100) * workingDims.height) || 0;
   const isCropActive =
      rotation !== 0 ||
      crop.x !== 0 ||
      crop.y !== 0 ||
      crop.width !== 100 ||
      crop.height !== 100;

   const applyRotation = (base, degrees) => {
      const rotated = rotateCanvas(base, degrees);
      rotatedCanvasRef.current = rotated;
      setWorkingDims({ width: rotated.width, height: rotated.height });
      setWorkingPreviewUrl(rotated.toDataURL("image/jpeg", 0.85));
   };

   const onPickFile = async (selectedFile) => {
      if (!selectedFile) return;

      if (!selectedFile.type?.startsWith("image/")) {
         setError("File harus berupa gambar.");
         return;
      }

      // Reset semua state terkait file/editor sebelumnya
      if (objectUrlsRef.current.original)
         URL.revokeObjectURL(objectUrlsRef.current.original);
      if (objectUrlsRef.current.compressed)
         URL.revokeObjectURL(objectUrlsRef.current.compressed);
      objectUrlsRef.current = { original: "", compressed: "" };

      setError("");
      setResult(null);
      setFile(selectedFile);
      setCompressedPreviewUrl("");
      setRotation(0);
      setCrop(DEFAULT_CROP);
      setWorkingPreviewUrl("");
      setWorkingDims({ width: 0, height: 0 });
      setIsCropOpen(false);
      orientedCanvasRef.current = null;
      rotatedCanvasRef.current = null;

      const previewUrl = URL.createObjectURL(selectedFile);
      objectUrlsRef.current.original = previewUrl;
      setOriginalPreviewUrl(previewUrl);

      setIsPreparing(true);
      const sourceUrl = URL.createObjectURL(selectedFile);
      try {
         const orientation = await getExifOrientation(selectedFile);
         const image = await loadImage(sourceUrl);
         const { targetWidth, targetHeight } = resizeToBounds(
            image.naturalWidth,
            image.naturalHeight,
            EDIT_MAX_DIMENSION,
            EDIT_MAX_DIMENSION,
         );
         const oriented = renderOrientedCanvas(
            image,
            orientation,
            targetWidth,
            targetHeight,
         );
         orientedCanvasRef.current = oriented;
         applyRotation(oriented, 0);
      } catch (err) {
         setError(err?.message || "Gagal membaca gambar.");
      } finally {
         URL.revokeObjectURL(sourceUrl);
         setIsPreparing(false);
      }
   };

   const handleFileInputChange = (event) => {
      const selectedFile = event.target.files?.[0];
      onPickFile(selectedFile);
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
      if (dragDepthRef.current === 0) {
         setIsDragging(false);
      }
   };

   const handleDrop = (event) => {
      event.preventDefault();
      dragDepthRef.current = 0;
      setIsDragging(false);
      const droppedFile = event.dataTransfer.files?.[0];
      onPickFile(droppedFile);
   };

   const handleRotate = (delta) => {
      if (!orientedCanvasRef.current || isPreparing) return;
      const next = (((rotation + delta) % 360) + 360) % 360;
      setRotation(next);
      applyRotation(orientedCanvasRef.current, next);
      setCrop(DEFAULT_CROP);
      setResult(null);
   };

   const handleResetCrop = () => {
      setCrop(DEFAULT_CROP);
      setResult(null);
   };

   const handleCompress = async () => {
      if (!file) {
         setError("Pilih gambar dulu.");
         return;
      }

      if (!rotatedCanvasRef.current) {
         setError(
            "Gambar belum siap diproses. Tunggu sebentar lalu coba lagi.",
         );
         return;
      }

      setIsCompressing(true);
      setError("");

      try {
         const editedBlob = await buildEditedBlob(
            rotatedCanvasRef.current,
            crop,
         );
         const output = await compressImage(editedBlob, settings);
         const baseName = getBaseName(file.name);
         const fileName = `${baseName}-compressed.${outputExt}`;
         const changePercent = Math.round(
            (1 - output.blob.size / file.size) * 100,
         );

         setResult({
            blob: output.blob,
            fileName,
            originalSize: file.size,
            compressedSize: output.blob.size,
            originalWidth: output.originalWidth,
            originalHeight: output.originalHeight,
            targetWidth: output.targetWidth,
            targetHeight: output.targetHeight,
            changePercent,
         });

         if (objectUrlsRef.current.compressed) {
            URL.revokeObjectURL(objectUrlsRef.current.compressed);
         }
         const compressedUrl = URL.createObjectURL(output.blob);
         objectUrlsRef.current.compressed = compressedUrl;
         setCompressedPreviewUrl(compressedUrl);
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

   const handleReset = () => {
      if (objectUrlsRef.current.original)
         URL.revokeObjectURL(objectUrlsRef.current.original);
      if (objectUrlsRef.current.compressed)
         URL.revokeObjectURL(objectUrlsRef.current.compressed);
      objectUrlsRef.current = { original: "", compressed: "" };

      setFile(null);
      setResult(null);
      setError("");
      setSettings(DEFAULT_SETTINGS);
      setIsDragging(false);
      dragDepthRef.current = 0;
      setOriginalPreviewUrl("");
      setCompressedPreviewUrl("");

      setRotation(0);
      setCrop(DEFAULT_CROP);
      setWorkingPreviewUrl("");
      setWorkingDims({ width: 0, height: 0 });
      setIsCropOpen(false);
      orientedCanvasRef.current = null;
      rotatedCanvasRef.current = null;

      if (fileInputRef.current) {
         fileInputRef.current.value = "";
      }
   };

   const formatIsJpg = settings.format === "jpg";
   const compressionLabel = result
      ? result.changePercent > 0
         ? `Hemat sekitar ${result.changePercent}% ukuran file.`
         : result.changePercent < 0
           ? `Hasil lebih besar sekitar ${Math.abs(result.changePercent)}% dibanding file asli.`
           : "Ukuran file tidak berubah."
      : "";

   return (
      <div className="container mx-auto min-h-[83vh] px-3 md:px-0">
         <div className="py-5 text-center">
            <h1 className="text-xl font-semibold">Image Compressor</h1>
            <p className="mt-1 text-xs text-slate-600">
               Kompres, potong, dan putar gambar langsung di browser tanpa
               backend.
            </p>
         </div>

         <div className="mx-auto grid max-w-6xl gap-4 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
               <div
                  onDragEnter={handleDragEnter}
                  onDragOver={(e) => e.preventDefault()}
                  onDragLeave={handleDragLeave}
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
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleFileInputChange}
                     />
                     Pilih Gambar
                  </label>
               </div>

               {file && (
                  <div className="mt-4">
                     <button
                        type="button"
                        onClick={() => setIsCropOpen((prev) => !prev)}
                        disabled={isPreparing}
                        className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 disabled:cursor-not-allowed disabled:opacity-60"
                     >
                        <CropIcon />
                        {isCropOpen ? "Tutup Crop & Rotate" : "Crop & Rotate"}
                        {isCropActive && (
                           <span className="rounded-full bg-slate-900 px-2 py-0.5 text-[10px] font-semibold text-white">
                              Aktif
                           </span>
                        )}
                     </button>

                     {isCropOpen && (
                        <div className="mt-3 rounded-2xl border border-slate-200 bg-white p-4">
                           <div className="flex flex-wrap items-center justify-between gap-3">
                              <p className="text-xs text-slate-500">
                                 Geser kotak untuk memilih area crop. Ganti
                                 rotasi akan mereset area crop.
                              </p>
                              <div className="flex flex-wrap gap-2">
                                 <button
                                    type="button"
                                    onClick={() => handleRotate(-90)}
                                    disabled={isPreparing}
                                    className="inline-flex items-center gap-1.5 rounded-full border border-slate-300 px-3 py-1.5 text-xs font-medium text-slate-700 disabled:cursor-not-allowed disabled:opacity-60"
                                 >
                                    <RotateIcon direction="left" />
                                    Putar Kiri
                                 </button>
                                 <button
                                    type="button"
                                    onClick={() => handleRotate(90)}
                                    disabled={isPreparing}
                                    className="inline-flex items-center gap-1.5 rounded-full border border-slate-300 px-3 py-1.5 text-xs font-medium text-slate-700 disabled:cursor-not-allowed disabled:opacity-60"
                                 >
                                    <RotateIcon direction="right" />
                                    Putar Kanan
                                 </button>
                                 <button
                                    type="button"
                                    onClick={handleResetCrop}
                                    disabled={isPreparing}
                                    className="rounded-full border border-slate-300 px-3 py-1.5 text-xs font-medium text-slate-700 disabled:cursor-not-allowed disabled:opacity-60"
                                 >
                                    Reset Crop
                                 </button>
                              </div>
                           </div>

                           <div className="mt-3">
                              {isPreparing || !workingPreviewUrl ? (
                                 <div className="flex h-56 items-center justify-center rounded-xl bg-slate-100 text-sm text-slate-500">
                                    Menyiapkan gambar...
                                 </div>
                              ) : (
                                 <CropEditor
                                    src={workingPreviewUrl}
                                    crop={crop}
                                    onCropChange={(next) => {
                                       setCrop(next);
                                       setResult(null);
                                    }}
                                    width={workingDims.width}
                                    height={workingDims.height}
                                 />
                              )}
                           </div>

                           {workingDims.width > 0 && (
                              <p className="mt-2 text-xs text-slate-500">
                                 Area crop: {cropPixelWidth} x {cropPixelHeight}{" "}
                                 px dari {workingDims.width} x{" "}
                                 {workingDims.height} px
                              </p>
                           )}
                        </div>
                     )}
                  </div>
               )}

               <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <label className="block">
                     <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Format output
                     </span>
                     <select
                        value={settings.format}
                        onChange={(e) =>
                           setSettings((prev) => ({
                              ...prev,
                              format: e.target.value,
                           }))
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
                     {formatIsJpg && (
                        <p className="mt-1 text-xs text-amber-700">
                           Jika gambar punya transparansi, bagian itu akan diisi
                           putih saat disimpan sebagai JPG.
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
                     onClick={handleReset}
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
                     subtitle={
                        result
                           ? formatBytes(result.compressedSize)
                           : "Belum diproses"
                     }
                     src={compressedPreviewUrl}
                     alt="Compressed preview"
                  />
               </div>

               {result && (
                  <div className="mt-5 rounded-2xl bg-slate-50 p-4">
                     <div className="grid gap-3 sm:grid-cols-2">
                        <InfoRow
                           label="Original Size"
                           value={formatBytes(result.originalSize)}
                        />
                        <InfoRow
                           label="Compressed Size"
                           value={formatBytes(result.compressedSize)}
                        />
                        <InfoRow
                           label="Resolusi (setelah crop)"
                           value={`${result.originalWidth} x ${result.originalHeight}`}
                        />
                        <InfoRow
                           label="Resolusi Akhir"
                           value={`${result.targetWidth} x ${result.targetHeight}`}
                        />
                     </div>
                     <div
                        className={`mt-4 rounded-xl px-4 py-3 text-sm font-medium ${
                           result.changePercent > 0
                              ? "bg-emerald-50 text-emerald-800"
                              : result.changePercent < 0
                                ? "bg-amber-50 text-amber-800"
                                : "bg-white text-slate-800"
                        }`}
                     >
                        {compressionLabel}
                     </div>
                  </div>
               )}
            </div>
         </div>
      </div>
   );
}

function RotateIcon({ direction = "left" }) {
   return (
      <svg
         viewBox="0 0 24 24"
         width="14"
         height="14"
         fill="none"
         stroke="currentColor"
         strokeWidth="2"
         strokeLinecap="round"
         strokeLinejoin="round"
         style={{ transform: direction === "right" ? "scaleX(-1)" : undefined }}
      >
         <path d="M3 12a9 9 0 1 1 3 6.7" />
         <path d="M3 7v6h6" />
      </svg>
   );
}

function CropIcon() {
   return (
      <svg
         viewBox="0 0 24 24"
         width="14"
         height="14"
         fill="none"
         stroke="currentColor"
         strokeWidth="2"
         strokeLinecap="round"
         strokeLinejoin="round"
      >
         <path d="M6 2v14a2 2 0 0 0 2 2h14" />
         <path d="M18 22V8a2 2 0 0 0-2-2H2" />
      </svg>
   );
}

function CropEditor({ src, crop, onCropChange, width, height }) {
   const containerRef = useRef(null);
   const dragRef = useRef(null);
   const MIN_SIZE = 8;

   const computeNextCrop = (mode, start, dxPct, dyPct) => {
      if (mode === "move") {
         const newX = clamp(start.x + dxPct, 0, 100 - start.width);
         const newY = clamp(start.y + dyPct, 0, 100 - start.height);
         return { x: newX, y: newY, width: start.width, height: start.height };
      }

      const left = start.x;
      const top = start.y;
      const right = start.x + start.width;
      const bottom = start.y + start.height;

      let newLeft = left;
      let newTop = top;
      let newRight = right;
      let newBottom = bottom;

      if (mode.includes("w"))
         newLeft = clamp(left + dxPct, 0, right - MIN_SIZE);
      if (mode.includes("e"))
         newRight = clamp(right + dxPct, left + MIN_SIZE, 100);
      if (mode.includes("n")) newTop = clamp(top + dyPct, 0, bottom - MIN_SIZE);
      if (mode.includes("s"))
         newBottom = clamp(bottom + dyPct, top + MIN_SIZE, 100);

      return {
         x: newLeft,
         y: newTop,
         width: newRight - newLeft,
         height: newBottom - newTop,
      };
   };

   const onMove = (event) => {
      const drag = dragRef.current;
      if (!drag) return;
      const dxPct =
         ((event.clientX - drag.startClientX) / drag.rect.width) * 100;
      const dyPct =
         ((event.clientY - drag.startClientY) / drag.rect.height) * 100;
      onCropChange(computeNextCrop(drag.mode, drag.startCrop, dxPct, dyPct));
   };

   const onUp = () => {
      dragRef.current = null;
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
   };

   const startDrag = (mode) => (event) => {
      event.preventDefault();
      event.stopPropagation();
      const rect = containerRef.current.getBoundingClientRect();
      dragRef.current = {
         mode,
         rect,
         startClientX: event.clientX,
         startClientY: event.clientY,
         startCrop: { ...crop },
      };
      window.addEventListener("pointermove", onMove);
      window.addEventListener("pointerup", onUp);
   };

   const handles = [
      { id: "nw", left: 0, top: 0, cursor: "nwse-resize" },
      { id: "ne", left: 100, top: 0, cursor: "nesw-resize" },
      { id: "sw", left: 0, top: 100, cursor: "nesw-resize" },
      { id: "se", left: 100, top: 100, cursor: "nwse-resize" },
   ];

   return (
      <div
         ref={containerRef}
         className="relative w-full select-none overflow-hidden rounded-xl bg-slate-900"
         style={{
            aspectRatio: width && height ? `${width} / ${height}` : "4 / 3",
         }}
      >
         <img
            src={src}
            alt="Crop preview"
            className="absolute inset-0 h-full w-full object-fill"
            draggable={false}
         />

         <div
            className="pointer-events-none absolute inset-x-0 top-0 bg-black/50"
            style={{ height: `${crop.y}%` }}
         />
         <div
            className="pointer-events-none absolute inset-x-0 bottom-0 bg-black/50"
            style={{ height: `${100 - crop.y - crop.height}%` }}
         />
         <div
            className="pointer-events-none absolute bg-black/50"
            style={{
               left: 0,
               top: `${crop.y}%`,
               width: `${crop.x}%`,
               height: `${crop.height}%`,
            }}
         />
         <div
            className="pointer-events-none absolute bg-black/50"
            style={{
               right: 0,
               top: `${crop.y}%`,
               width: `${100 - crop.x - crop.width}%`,
               height: `${crop.height}%`,
            }}
         />

         <div
            onPointerDown={startDrag("move")}
            className="absolute cursor-move border-2 border-white"
            style={{
               left: `${crop.x}%`,
               top: `${crop.y}%`,
               width: `${crop.width}%`,
               height: `${crop.height}%`,
               touchAction: "none",
            }}
         >
            {handles.map((h) => (
               <div
                  key={h.id}
                  onPointerDown={startDrag(h.id)}
                  className="absolute h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-slate-900 bg-white"
                  style={{
                     left: `${h.left}%`,
                     top: `${h.top}%`,
                     cursor: h.cursor,
                     touchAction: "none",
                  }}
               />
            ))}
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
         <p className="text-xs uppercase tracking-wide text-slate-500">
            {label}
         </p>
         <p className="mt-1 text-sm font-semibold text-slate-900">{value}</p>
      </div>
   );
}
