"use client";

import { useState, useEffect, useMemo, useRef } from "react";

const opsiWaktu = {
   menit: Array.from({ length: 60 }, (_, i) => i.toString()),
   jam: Array.from({ length: 24 }, (_, i) => i.toString()),
   tanggal: ["*", ...Array.from({ length: 31 }, (_, i) => (i + 1).toString())],
   bulan: ["*", ...Array.from({ length: 12 }, (_, i) => (i + 1).toString())],
   hari: ["*", "0", "1", "2", "3", "4", "5", "6"],
};

const fields = ["menit", "jam", "tanggal", "bulan", "hari"];
const defaultValues = {
   menit: "0",
   jam: "0",
   tanggal: "*",
   bulan: "*",
   hari: "*",
};
const DEFAULT_CRON = fields.map((f) => defaultValues[f]).join(" ");

const presets = [
   { label: "Pilih Preset Cron...", value: "" },
   { label: "Setiap menit", value: "* * * * *" },
   { label: "Setiap jam (menit ke-0)", value: "0 * * * *" },
   { label: "Setiap hari jam 00:00", value: "0 0 * * *" },
   { label: "Setiap minggu Minggu jam 00:00", value: "0 0 * * 0" },
   { label: "Setiap bulan tanggal 1 jam 00:00", value: "0 0 1 * *" },
];

// Daftar timezone yang bisa dipilih user
const timezones = [
   { value: "Asia/Jakarta", label: "GMT+0700 (WIB)" },
   { value: "Asia/Makassar", label: "GMT+0800 (WITA)" },
   { value: "Asia/Jayapura", label: "GMT+0900 (WIT)" },
   { value: "UTC", label: "GMT+0000 (UTC)" },
   { value: "Asia/Bangkok", label: "GMT+0700 (Bangkok)" },
   { value: "Asia/Singapore", label: "GMT+0800 (Singapore)" },
   { value: "Asia/Tokyo", label: "GMT+0900 (Tokyo)" },
   { value: "Asia/Kolkata", label: "GMT+0530 (India)" },
   { value: "Europe/London", label: "GMT+0000/+0100 (London)" },
   { value: "Europe/Amsterdam", label: "GMT+0100/+0200 (Amsterdam)" },
   { value: "America/New_York", label: "GMT-0500/-0400 (New York)" },
   { value: "America/Los_Angeles", label: "GMT-0800/-0700 (Los Angeles)" },
];

const DEFAULT_TZ = "Asia/Jakarta";

function parseToParts(value) {
   const raw = value.trim().split(/\s+/).filter(Boolean);
   return fields.map((_, i) => raw[i] ?? "");
}

export default function CronGenerator() {
   const [cronString, setCronString] = useState(DEFAULT_CRON);
   const [presetValue, setPresetValue] = useState("");
   const [preview, setPreview] = useState([]);
   const [error, setError] = useState(null);
   const [timezone, setTimezone] = useState(DEFAULT_TZ);
   const [tzMenuOpen, setTzMenuOpen] = useState(false);

   const tzMenuRef = useRef(null);

   const parts = useMemo(() => parseToParts(cronString), [cronString]);
   const fieldValues = useMemo(
      () => Object.fromEntries(fields.map((f, i) => [f, parts[i]])),
      [parts],
   );

   const isCompleteFormat =
      parts.length === 5 && parts.every((p) => p.trim() !== "");

   const activeTz = timezones.find((t) => t.value === timezone) ?? timezones[0];

   function updateField(key, value) {
      const idx = fields.indexOf(key);
      const nextParts = [...parts];
      nextParts[idx] = value;
      const safeParts = nextParts.map((p, i) =>
         p.trim() === "" ? defaultValues[fields[i]] : p,
      );
      setCronString(safeParts.join(" "));
      setPresetValue("");
   }

   function clearField(key) {
      updateField(key, defaultValues[key]);
   }

   function onCronStringChange(e) {
      setCronString(e.target.value);
      setPresetValue("");
   }

   function onPresetChange(e) {
      const val = e.target.value;
      setPresetValue(val);
      if (!val) return;
      setCronString(val);
   }

   function onTimezoneSelect(tz) {
      setTimezone(tz);
      setTzMenuOpen(false);
   }

   // Tutup dropdown timezone kalau klik di luar area-nya
   useEffect(() => {
      function handleClickOutside(e) {
         if (tzMenuRef.current && !tzMenuRef.current.contains(e.target)) {
            setTzMenuOpen(false);
         }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
         document.removeEventListener("mousedown", handleClickOutside);
   }, []);

   function formatTanggalOnly(dateStr) {
      const date = new Date(dateStr);
      return date.toLocaleString("id-ID", {
         weekday: "long",
         day: "numeric",
         month: "long",
         year: "numeric",
         timeZone: timezone,
      });
   }

   function formatJamOnly(dateStr) {
      const date = new Date(dateStr);
      return date.toLocaleString("id-ID", {
         hour: "2-digit",
         minute: "2-digit",
         timeZone: timezone,
      });
   }

   const abortRef = useRef(null);

   useEffect(() => {
      if (!isCompleteFormat) {
         setPreview([]);
         setError(
            parts.every((p) => p.trim() === "")
               ? null
               : "Format cron tidak lengkap",
         );
         return;
      }

      const timeout = setTimeout(async () => {
         abortRef.current?.abort();
         const controller = new AbortController();
         abortRef.current = controller;

         try {
            const res = await fetch(
               `/layanan/cron-generator/api?cron=${encodeURIComponent(cronString.trim())}&tz=${encodeURIComponent(timezone)}`,
               { signal: controller.signal },
            );
            const data = await res.json();

            if (res.ok) {
               setPreview(data.preview);
               setError(null);
            } else {
               setError(data.error || "Format cron tidak valid");
               setPreview([]);
            }
         } catch (err) {
            if (err.name !== "AbortError") {
               setError("Gagal mengambil preview cron");
               setPreview([]);
            }
         }
      }, 300);

      return () => clearTimeout(timeout);
      // timezone ikut jadi dependency biar preview auto-refresh saat timezone diganti
   }, [cronString, isCompleteFormat, timezone]);

   return (
      <div className="container mx-auto px-3 md:px-0 pb-20">
         <div className="py-5">
            <h1 className="text-xl text-center font-semibold">
               Crontab Generator | Developer Tools
            </h1>
            <p className="text-center text-xs">
               Buat dan preview cron expression untuk scheduler Anda.
            </p>
         </div>

         {/* Hasil cron expression editable */}
         <div className="mt-3 flex flex-col items-center">
            <div className="relative" ref={tzMenuRef}>
               <textarea
                  rows={1}
                  className="w-full border-2 rounded-md border-slate-800 lg:max-w-xl font-mono p-3 mt-2 focus:outline-none focus:ring text-center text-3xl font-semibold text-slate-800 focus:ring-blue-200"
                  value={cronString}
                  onChange={onCronStringChange}
                  style={{ resize: "none" }}
               />

               <button
                  type="button"
                  onClick={() => setTzMenuOpen((prev) => !prev)}
                  className="text-[11px] min-w-max absolute -bottom-1 right-2 bg-gray-700 text-white py-0.5 px-1 rounded-md hover:bg-gray-600"
               >
                  {activeTz.label}
               </button>

               {tzMenuOpen && (
                  <ul className="absolute right-2 top-full mt-1 z-10 bg-white border border-slate-300 rounded-md shadow-lg max-h-56 overflow-y-auto min-w-[220px] text-left">
                     {timezones.map((tz) => (
                        <li key={tz.value}>
                           <button
                              type="button"
                              onClick={() => onTimezoneSelect(tz.value)}
                              className={`w-full text-left px-3 py-1.5 text-xs hover:bg-gray-100 ${
                                 tz.value === timezone
                                    ? "bg-gray-100 font-semibold"
                                    : ""
                              }`}
                           >
                              {tz.label}
                           </button>
                        </li>
                     ))}
                  </ul>
               )}
            </div>
            {error && (
               <p className="text-red-600 text-sm text-center mt-4">{error}</p>
            )}
         </div>

         {/* Preview jadwal */}
         {preview.length > 0 && (
            <div className="mt-6 max-w-sm mx-auto">
               <p className="font-semibold text-left">
                  5 Jadwal Eksekusi Berikutnya :
               </p>
               <ul className="list-none text-sm mt-1 text-left">
                  {preview.map((time, idx) => (
                     <li
                        key={idx}
                        className="flex justify-between items-center border-b border-gray-300 last:border-none py-1"
                     >
                        <span>{formatTanggalOnly(time)}</span>
                        <span className="text-xs bg-gray-700 text-white py-0.5 px-1 rounded-md">
                           {formatJamOnly(time)}
                        </span>
                     </li>
                  ))}
               </ul>
            </div>
         )}

         <div className="md:w-[80%] xl:w-[50%] mx-auto mt-5">
            <div className="border border-slate-500 rounded-lg p-3 pt-5 relative mt-10">
               <span className="absolute text-sm bg-white -top-3 left-3 px-2">
                  Peraturan Cron
               </span>
               <div className="mb-3">
                  <label
                     htmlFor="preset"
                     className="font-semibold text-xs block mb-2"
                  >
                     Pilih Preset Cron
                  </label>
                  <select
                     id="preset"
                     className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
                     value={presetValue}
                     onChange={onPresetChange}
                  >
                     {presets.map(({ label, value }) => (
                        <option key={value} value={value}>
                           {label}
                        </option>
                     ))}
                  </select>
               </div>

               {fields.map((field) => (
                  <div
                     key={field}
                     className="mb-6 flex gap-4 md:gap-6 items-center"
                  >
                     <div className="w-[50%] lg:w-[70%]">
                        <label
                           htmlFor={`select-${field}`}
                           className="block font-semibold text-xs capitalize mb-1"
                        >
                           {field}
                        </label>
                        <select
                           id={`select-${field}`}
                           className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
                           value={
                              opsiWaktu[field].includes(fieldValues[field])
                                 ? fieldValues[field]
                                 : ""
                           }
                           onChange={(e) => updateField(field, e.target.value)}
                        >
                           <option value="" disabled>
                              (custom)
                           </option>
                           {opsiWaktu[field].map((val) => (
                              <option key={val} value={val}>
                                 {val === "*" ? "Setiap" : val}
                              </option>
                           ))}
                        </select>
                     </div>

                     <div className="w-[50%] lg:w-[30%] relative">
                        <label
                           htmlFor={`input-${field}`}
                           className="block font-semibold text-xs capitalize mb-1"
                        >
                           Custom {field}
                        </label>
                        <input
                           id={`input-${field}`}
                           type="text"
                           placeholder={field}
                           className="w-full border rounded px-3 py-2 capitalize text-md focus:outline-none focus:ring focus:ring-blue-200"
                           value={fieldValues[field]}
                           onChange={(e) => updateField(field, e.target.value)}
                        />
                        {fieldValues[field] !== defaultValues[field] && (
                           <button
                              type="button"
                              className="text-sm absolute right-2 top-8"
                              onClick={() => clearField(field)}
                           >
                              <svg
                                 className="w-5 h-5 text-gray-500"
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
                                    d="M6 18 17.94 6M18 18 6.06 6"
                                 />
                              </svg>
                           </button>
                        )}
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </div>
   );
}
