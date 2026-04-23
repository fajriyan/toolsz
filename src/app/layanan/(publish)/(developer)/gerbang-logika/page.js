"use client";

import { useMemo, useState } from "react";

const gateDefinitions = {
  AND: {
    label: "AND",
    description: "Hanya menyala jika semua tombol hidup.",
    analogy:
      "Seperti dua sakelar lampu yang harus keduanya ON agar lampu menyala.",
  },
  OR: {
    label: "OR",
    description: "Menyala jika salah satu atau kedua tombol hidup.",
    analogy: "Seperti dua pintu darurat; cukup satu terbuka untuk keluar.",
  },
  NOT: {
    label: "NOT",
    description: "Membalik keadaan satu tombol.",
    analogy: "Seperti sakelar lampu terbalik: OFF menjadi ON, ON menjadi OFF.",
  },
  NAND: {
    label: "NAND",
    description: "Kebalikan dari AND.",
    analogy: "Seperti alarm yang berbunyi kecuali kedua sensor aktif.",
  },
  NOR: {
    label: "NOR",
    description: "Kebalikan dari OR.",
    analogy: "Seperti lampu yang hanya mati bila salah satu tombol aktif.",
  },
  XOR: {
    label: "XOR",
    description: "Menyala hanya jika satu tombol aktif, bukan kedua-duanya.",
    analogy:
      "Seperti percikan listrik dari dua kabel; hanya terjadi bila salah satu kabel terhubung saja.",
  },
  XNOR: {
    label: "XNOR",
    description: "Kebalikan dari XOR.",
    analogy:
      "Seperti dua sahabat yang setuju: lampu menyala bila keduanya sama-sama ON atau sama-sama OFF.",
  },
};

const computeOutput = (gate, inputA, inputB) => {
  switch (gate) {
    case "AND":
      return inputA && inputB;
    case "OR":
      return inputA || inputB;
    case "NOT":
      return !inputA;
    case "NAND":
      return !(inputA && inputB);
    case "NOR":
      return !(inputA || inputB);
    case "XOR":
      return Boolean(inputA) !== Boolean(inputB);
    case "XNOR":
      return Boolean(inputA) === Boolean(inputB);
    default:
      return false;
  }
};

const LogicGate = () => {
  const [gate, setGate] = useState("AND");
  const [inputA, setInputA] = useState(false);
  const [inputB, setInputB] = useState(false);

  const output = useMemo(
    () => computeOutput(gate, inputA, inputB),
    [gate, inputA, inputB],
  );
  const activeInputs = gate === "NOT" ? ["A"] : ["A", "B"];

  return (
    <div className="min-h-screen px-3 xl:px-0 pb-20">
      <div className="py-5">
        <h1 className="text-xl text-center font-semibold">
          Gerbang Logika | Developer Tools
        </h1>
        <p className="text-center text-xs">
          Pilih gerbang logika, tekan tombol input, dan lihat apakah lampu
          menyala. Di bawah, kamu juga dapat membaca analogi setiap gerbang.
        </p>
      </div>
      <div className="mx-auto max-w-6xl space-y-8">
        <section className="bg-white">
          <div className="mt-8 flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
            <div className="space-y-5 xl:basis-2/3">
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                <label className="mb-3 block text-sm font-medium text-slate-700">
                  Pilih Gerbang
                </label>
                <div className="flex flex-wrap gap-3">
                  {Object.keys(gateDefinitions).map((key) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setGate(key)}
                      className={`rounded-2xl px-4 py-2 text-sm font-medium transition ${gate === key ? "bg-slate-900 text-white" : "bg-white text-slate-700 ring-1 ring-slate-200 hover:bg-slate-100"}`}
                    >
                      {gateDefinitions[key].label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                {activeInputs.includes("A") && (
                  <div className="rounded-3xl border border-slate-200 bg-white p-6">
                    <div className="mb-4 flex items-center justify-between gap-4">
                      <div>
                        <p className="text-sm font-medium text-slate-700">
                          Tombol A
                        </p>
                        <p className="text-xs text-slate-500">Input pertama</p>
                      </div>
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${inputA ? "bg-emerald-100 text-emerald-800" : "bg-rose-100 text-rose-800"}`}
                      >
                        {inputA ? "ON" : "OFF"}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setInputA((prev) => !prev)}
                      className={`w-full rounded-3xl px-5 py-3 text-sm font-semibold transition ${inputA ? "bg-emerald-500 text-white shadow-lg shadow-emerald-200/80" : "bg-slate-200 text-slate-700 hover:bg-slate-300"}`}
                    >
                      {inputA ? "Matikan" : "Nyalakan"}
                    </button>
                  </div>
                )}

                {activeInputs.includes("B") && (
                  <div className="rounded-3xl border border-slate-200 bg-white p-6">
                    <div className="mb-4 flex items-center justify-between gap-4">
                      <div>
                        <p className="text-sm font-medium text-slate-700">
                          Tombol B
                        </p>
                        <p className="text-xs text-slate-500">Input kedua</p>
                      </div>
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${inputB ? "bg-emerald-100 text-emerald-800" : "bg-rose-100 text-rose-800"}`}
                      >
                        {inputB ? "ON" : "OFF"}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setInputB((prev) => !prev)}
                      className={`w-full rounded-3xl px-5 py-3 text-sm font-semibold transition ${inputB ? "bg-emerald-500 text-white shadow-lg shadow-emerald-200/80" : "bg-slate-200 text-slate-700 hover:bg-slate-300"}`}
                    >
                      {inputB ? "Matikan" : "Nyalakan"}
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-slate-900 p-6 min-h-[300px] text-white shadow-slate-500/20 xl:basis-1/3">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.2em] text-slate-300">
                    Status Output
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold">
                    Lampu {output ? "Menyala" : "Padam"}
                  </h2>
                </div>
                <div
                  className={`flex h-20 w-20 items-center justify-center rounded-full border-4 transition-all duration-500 ${
                    output
                      ? "border-emerald-300 bg-emerald-400/20"
                      : "border-slate-600 bg-slate-800"
                  }`}
                >
                  <div
                    className={`h-12 w-12 rounded-full ${
                      output ? "bg-emerald-400 animate-flicker" : "bg-slate-700"
                    }`}
                  />
                </div>
              </div>

              <div className="mt-6 rounded-3xl bg-slate-800/80 p-4 text-sm leading-6 text-slate-300">
                <p className="font-semibold text-slate-100">
                  Gerbang: {gateDefinitions[gate].label}
                </p>
                <p className="mt-2 text-slate-300 text-xs">
                  {gateDefinitions[gate].description}
                </p>
                <p className="mt-1 text-slate-200 text-xs">
                  Analogi: {gateDefinitions[gate].analogy}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="flex gap-7 overflow-x-scroll hidescroll">
          {Object.entries(gateDefinitions).map(([key, value]) => (
            <article
              key={key}
              className="rounded-3xl border min-w-[450px] border-slate-200 bg-white p-6 shadow-sm"
            >
              <h3 className="text-xl font-semibold text-slate-900">
                {value.label}
              </h3>
              <p className="mt-3 text-slate-600">{value.description}</p>
              <p className="mt-4 rounded-3xl bg-slate-50 p-4 text-sm text-slate-700">
                {value.analogy}
              </p>
              <div className="mt-4 flex items-center gap-2 text-xs text-slate-500">
                <span className="rounded-full bg-slate-100 px-2 py-1">
                  A: {key === "NOT" ? "use only" : "input"}
                </span>
                {key !== "NOT" && (
                  <span className="rounded-full bg-slate-100 px-2 py-1">
                    B: input
                  </span>
                )}
              </div>
            </article>
          ))}
        </section>
      </div>
    </div>
  );
};

export default LogicGate;
