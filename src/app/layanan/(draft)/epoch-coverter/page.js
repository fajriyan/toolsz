"use client";

import { useEffect, useMemo, useState } from "react";

export default function EpochConverterPage() {
  const [nowSec, setNowSec] = useState(() => Math.floor(Date.now() / 1000));
  const [inputEpoch, setInputEpoch] = useState(
    String(Math.floor(Date.now() / 1000))
  );
  const [assumeMillis, setAssumeMillis] = useState(false);
  const [relative, setRelative] = useState("");
  const [errorEpoch, setErrorEpoch] = useState(""); // pesan error untuk input epoch

  // Fields for date -> epoch
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [day, setDay] = useState(new Date().getDate());
  const [hour, setHour] = useState(new Date().getHours() % 12 || 12);
  const [minute, setMinute] = useState(new Date().getMinutes());
  const [second, setSecond] = useState(new Date().getSeconds());
  const [ampm, setAmpm] = useState(new Date().getHours() >= 12 ? "PM" : "AM");
  const [zoneMode, setZoneMode] = useState("local"); // local or gmt

  useEffect(() => {
    const t = setInterval(() => setNowSec(Math.floor(Date.now() / 1000)), 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    // Validasi inputEpoch
    if (!inputEpoch || !inputEpoch.toString().trim()) {
      setErrorEpoch("Input epoch tidak boleh kosong.");
      setRelative("");
      return;
    }

    const intRegex = /^\s*-?\d+\s*$/;
    if (!intRegex.test(inputEpoch)) {
      setErrorEpoch(
        "Input epoch harus berupa angka bulat (detik atau milidetik)."
      );
      setRelative("");
      return;
    }

    // valid
    setErrorEpoch("");

    // update relative time
    const epochToMs = (val) => (Math.abs(val) > 1e12 ? val : val * 1000);
    const num = Number(inputEpoch);
    const ms = epochToMs(num);
    const diffSec = Math.floor((Date.now() - ms) / 1000);
    setRelative(formatRelative(diffSec));
  }, [inputEpoch]);

  function formatDateIntl(date, locale = "id-ID", timeZone = undefined) {
    const opts = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    };
    if (timeZone) opts.timeZone = timeZone;
    return date.toLocaleString(locale, opts);
  }

  function epochToDateStrings(epochInput) {
    if (!epochInput || !String(epochInput).trim()) {
      return { seconds: "-", milliseconds: "-", gmt: "-", local: "-" };
    }
    const parsed = Number(epochInput);
    if (!Number.isFinite(parsed)) {
      return { seconds: "-", milliseconds: "-", gmt: "-", local: "-" };
    }

    if (assumeMillis || Math.abs(parsed) > 1e12) {
      const ms = parsed;
      const dUtc = new Date(ms);
      return {
        seconds: Math.floor(ms / 1000),
        milliseconds: ms,
        gmt: formatDateIntl(dUtc, "id-ID", "UTC") + " (GMT)",
        local: formatDateIntl(dUtc),
      };
    } else {
      const ms = parsed * 1000;
      const dUtc = new Date(ms);
      return {
        seconds: parsed,
        milliseconds: ms,
        gmt: formatDateIntl(dUtc, "id-ID", "UTC") + " (GMT)",
        local: formatDateIntl(dUtc),
      };
    }
  }

  function formatRelative(diffSec) {
    const rtf = new Intl.RelativeTimeFormat("id", { numeric: "auto" });
    const divisions = [
      { amount: 60, name: "second" },
      { amount: 60, name: "minute" },
      { amount: 24, name: "hour" },
      { amount: 7, name: "day" },
      { amount: 4.34524, name: "week" },
      { amount: 12, name: "month" },
      { amount: Number.POSITIVE_INFINITY, name: "year" },
    ];

    let duration = Math.abs(diffSec);
    let unit = "second";

    for (let i = 0; i < divisions.length; i++) {
      if (duration < divisions[i].amount) {
        unit = divisions[i].name;
        break;
      }
      duration = duration / divisions[i].amount;
    }
    duration = Math.floor(duration);

    if (diffSec >= 0) {
      return unit === "second" && duration <= 5
        ? "beberapa detik yang lalu"
        : rtf.format(-duration, unit);
    } else {
      return rtf.format(duration, unit);
    }
  }

  const converted = useMemo(
    () => epochToDateStrings(inputEpoch),
    [inputEpoch, assumeMillis]
  );

  function handleDateToEpoch() {
    let y = Number(year);
    let m = Number(month) - 1;
    let d = Number(day);
    let h = Number(hour) % 12;
    if (ampm === "PM") h += 12;
    let min = Number(minute);
    let s = Number(second);
    let epochSec;
    if (zoneMode === "gmt") {
      epochSec = Math.floor(Date.UTC(y, m, d, h, min, s) / 1000);
    } else {
      const localDate = new Date(y, m, d, h, min, s);
      epochSec = Math.floor(localDate.getTime() / 1000);
    }
    setInputEpoch(String(epochSec));
  }

  return (
    <main className="min-h-screen bg-slate-50 p-6 md:p-12 text-slate-800">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-6 md:p-10">
        <h1 className="text-2xl md:text-3xl font-semibold mb-2">
          Epoch → Tanggal (Bahasa Indonesia)
        </h1>
        <p className="text-slate-600 mb-6">
          Alat sederhana untuk mengonversi Unix epoch (detik/ms) ke tanggal dan
          sebaliknya.
        </p>

        {/* Bagian epoch ke tanggal */}
        <section className="mb-6">
          <div className="bg-slate-100 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-slate-500">
                  Waktu Unix saat ini (detik)
                </div>
                <div className="text-lg font-mono">{nowSec}</div>
              </div>
              <div>
                <button
                  className="px-3 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                  onClick={() => {
                    setInputEpoch(String(nowSec));
                    setErrorEpoch("");
                  }}
                >
                  Gunakan sekarang
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-6">
          <h2 className="font-medium mb-2">Konversi epoch ke tanggal</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-center mb-1">
            <input
              type="text"
              className={`p-2 border rounded-md col-span-2 font-mono ${
                errorEpoch ? "border-red-500" : ""
              }`}
              value={inputEpoch}
              onChange={(e) => setInputEpoch(e.target.value)}
              aria-label="Input epoch"
            />
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={assumeMillis}
                onChange={(e) => setAssumeMillis(e.target.checked)}
              />
              Anggap input sebagai milidetik
            </label>
          </div>

          {errorEpoch && (
            <p className="text-red-500 text-sm mt-1" role="alert">
              {errorEpoch}
            </p>
          )}

          <div className="bg-slate-50 p-4 rounded-md mt-3">
            <div className="mb-2">
              {assumeMillis
                ? "Menganggap sebagai milidetik (ms)"
                : "Menganggap sebagai detik (s) jika jumlah digit ≤ 12"}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-slate-500">Epoch (detik)</div>
                <div className="font-mono text-lg">{converted.seconds}</div>
                <div className="text-sm text-slate-500 mt-2">
                  Epoch (milidetik)
                </div>
                <div className="font-mono">{converted.milliseconds}</div>
              </div>
              <div>
                <div className="text-sm text-slate-500">
                  Tanggal dan waktu (GMT)
                </div>
                <div>{converted.gmt}</div>
                <div className="text-sm text-slate-500 mt-2">
                  Tanggal dan waktu (zona Anda)
                </div>
                <div>{converted.local}</div>
                <div className="text-sm text-slate-400 mt-2">
                  Relative: {relative || "-"}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Bagian tanggal ke epoch */}
        <section className="mb-6">
          <h2 className="font-medium mb-2">Konversi tanggal ke epoch</h2>
          {/* ... bagian input tanggal sama persis dengan kode kamu, tidak berubah */}
        </section>

        <footer className="text-sm text-slate-500 mt-6">
          Mendukung timestamp Unix dalam detik dan milidetik. Format tanggal
          menggunakan bahasa Indonesia.
        </footer>
      </div>
    </main>
  );
}
