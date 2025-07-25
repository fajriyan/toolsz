"use client";

import { useState, useEffect } from "react";

const opsiWaktu = {
  menit: Array.from({ length: 60 }, (_, i) => i.toString()), // 0-59
  jam: Array.from({ length: 24 }, (_, i) => i.toString()), // 0-23
  tanggal: ["*", ...Array.from({ length: 31 }, (_, i) => (i + 1).toString())], // * + 1-31
  bulan: ["*", ...Array.from({ length: 12 }, (_, i) => (i + 1).toString())], // * + 1-12
  hari: ["*", "0", "1", "2", "3", "4", "5", "6"], // * + 0-6 (minggu-sabtu)
};

const fields = ["menit", "jam", "tanggal", "bulan", "hari"];

const presets = [
  {
    label: "Pilih Preset Cron...",
    value: "",
  },
  {
    label: "Setiap menit",
    value: "0 * * * *",
  },
  {
    label: "Setiap jam (menit ke-0)",
    value: "0 0 * * *",
  },
  {
    label: "Setiap hari jam 00:00",
    value: "0 0 0 * *",
  },
  {
    label: "Setiap minggu Minggu jam 00:00",
    value: "0 0 * * 0",
  },
  {
    label: "Setiap bulan tanggal 1 jam 00:00",
    value: "0 0 1 * *",
  },
];

export default function CronGenerator() {
  const [cronSelect, setCronSelect] = useState({
    menit: "0",
    jam: "0",
    tanggal: "*",
    bulan: "*",
    hari: "*",
  });

  const [cronManual, setCronManual] = useState({
    menit: "",
    jam: "",
    tanggal: "",
    bulan: "",
    hari: "",
  });

  const [cronString, setCronString] = useState(
    `0 ${cronSelect.menit} ${cronSelect.jam} ${cronSelect.tanggal} ${cronSelect.bulan} ${cronSelect.hari}`
  );

  const [preview, setPreview] = useState([]);
  const [error, setError] = useState(null);

  // Preset dropdown state
  const [presetValue, setPresetValue] = useState("");

  const cronFinal = {};
  fields.forEach((key) => {
    cronFinal[key] =
      cronManual[key].trim() === "" ? cronSelect[key] : cronManual[key].trim();
  });

  useEffect(() => {
    setCronString(
      `0 ${cronFinal.menit} ${cronFinal.jam} ${cronFinal.tanggal} ${cronFinal.bulan} ${cronFinal.hari}`
    );
  }, [
    cronFinal.menit,
    cronFinal.jam,
    cronFinal.tanggal,
    cronFinal.bulan,
    cronFinal.hari,
  ]);

  useEffect(() => {
    async function fetchPreview() {
      try {
        const res = await fetch(
          `/layanan/cron-generator/api?cron=${encodeURIComponent(cronString)}`
        );
        const data = await res.json();

        if (res.ok) {
          setPreview(data.preview);
          setError(null);
        } else {
          setError(data.error || "Format cron tidak valid");
          setPreview([]);
        }
      } catch {
        setError("Gagal mengambil preview cron");
        setPreview([]);
      }
    }
    fetchPreview();
  }, [cronString]);

  function parseCronString(value) {
    const parts = value.trim().split(/\s+/);
    if (parts.length === 6) parts.shift();
    if (parts.length !== 5) return null;
    return {
      menit: parts[0],
      jam: parts[1],
      tanggal: parts[2],
      bulan: parts[3],
      hari: parts[4],
    };
  }

  function onCronStringChange(e) {
    const val = e.target.value;
    setCronString(val);

    const parsed = parseCronString(val);
    if (parsed) {
      setCronManual({
        menit: "",
        jam: "",
        tanggal: "",
        bulan: "",
        hari: "",
      });
      setCronSelect(parsed);
      setPresetValue(""); // reset preset dropdown kalau manual edit
      setError(null);
    } else {
      setError("Format cron tidak valid saat parsing manual");
    }
  }

  // Saat preset dipilih
  function onPresetChange(e) {
    const val = e.target.value;
    setPresetValue(val);

    if (!val) return; // kalau kosong, jangan ubah apa2

    const parsed = parseCronString(val);
    if (parsed) {
      setCronManual({
        menit: "",
        jam: "",
        tanggal: "",
        bulan: "",
        hari: "",
      });
      setCronSelect(parsed);
      setError(null);
    } else {
      setError("Preset tidak valid");
    }
  }

  return (
    <div className="container mx-auto px-3 md:px-0 pb-20">
      <div className="py-5">
        <h1 className="text-xl text-center font-semibold">
          Cron Generator | Developer Tools 
        </h1>
        <p className="text-center text-xs">
          Buat dan preview cron expression untuk scheduler Anda.
        </p>
      </div>

      {/* Hasil cron expression editable */}
      <div className="mt-6 flex flex-col items-center">
        <textarea
          rows={1}
          className="w-full border-2 rounded-md border-slate-800 lg:max-w-xl font-mono p-3 mt-2 focus:outline-none focus:ring text-center text-3xl font-semibold text-slate-800 focus:ring-blue-200"
          value={cronString}
          onChange={onCronStringChange}
          style={{ resize: "none" }}
        />
        {error && (
          <p className="text-red-600 mt-1 text-sm text-center">{error}</p>
        )}
      </div>

      {/* Preview jadwal */}
      <div className="mt-6">
        <p className="font-semibold text-center">
          5 Jadwal Eksekusi Berikutnya:
        </p>
        {error ? (
          <p className="text-red-600">{error}</p>
        ) : (
          <ul className="list-none text-sm mt-1 text-center">
            {preview.map((time, idx) => (
              <li key={idx}>{time}</li>
            ))}
          </ul>
        )}
      </div>

      {/* Dropdown Preset */}
      <div className="mb-6 mt-5">
        <label htmlFor="preset" className="font-semibold block mb-2">
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

      {/* Input manual dan select per field */}
      {fields.map((field) => (
        <div key={field} className="mb-6 grid grid-cols-2 gap-6 items-center">
          <div>
            <label
              htmlFor={`select-${field}`}
              className="block font-semibold text-xs capitalize mb-1"
            >
              {field}
            </label>
            <select
              id={`select-${field}`}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
              value={cronSelect[field]}
              onChange={(e) =>
                setCronSelect((prev) => ({
                  ...prev,
                  [field]: e.target.value,
                }))
              }
              disabled={cronManual[field].trim() !== ""}
            >
              {opsiWaktu[field].map((val) => (
                <option key={val} value={val}>
                  {val === "*" ? "Setiap" : val}
                </option>
              ))}
            </select>
          </div>

          <div className="relative">
            <label
              htmlFor={`input-${field}`}
              className="block font-semibold text-xs capitalize mb-1"
            >
              Custom {field}
            </label>
            <input
              id={`input-${field}`}
              type="text"
              placeholder={`${field}`}
              className="w-full border rounded px-3 py-2 capitalize text-md focus:outline-none focus:ring focus:ring-blue-200"
              value={cronManual[field]}
              onChange={(e) =>
                setCronManual((prev) => ({
                  ...prev,
                  [field]: e.target.value,
                }))
              }
            />
            {cronManual[field].trim() !== "" && (
              <button
                type="button"
                className="text-sm absolute right-2 top-8"
                onClick={() =>
                  setCronManual((prev) => ({ ...prev, [field]: "" }))
                }
              >
                <svg
                  class="w-5 h-5 text-gray-500"
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
  );
}
