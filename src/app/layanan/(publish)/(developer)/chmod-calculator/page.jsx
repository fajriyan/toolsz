"use client";

import { useEffect, useState } from "react";

const PERMISSIONS = {
  read: 4,
  write: 2,
  execute: 1,
};

const roles = ["owner", "group", "public"];
const permKeys = ["read", "write", "execute"];

export default function ChmodCalculator() {
  const [matrix, setMatrix] = useState({
    owner: { read: true, write: true, execute: true },
    group: { read: true, write: true, execute: true },
    public: { read: true, write: false, execute: true },
  });

  const [symbolicInput, setSymbolicInput] = useState("rwxrwxr-x");
  const [error, setError] = useState("");

  const toggle = (role, perm) => {
    setMatrix((prev) => ({
      ...prev,
      [role]: {
        ...prev[role],
        [perm]: !prev[role][perm],
      },
    }));
  };

  const calculateNumber = (role) =>
    Object.entries(matrix[role]).reduce(
      (sum, [key, value]) => sum + (value ? PERMISSIONS[key] : 0),
      0
    );

  const numericPermission = roles.map(calculateNumber).join("");

  const symbolicPermission = roles
    .map((role) =>
      permKeys
        .map((p) => (matrix[role][p] ? p[0] : "-"))
        .join("")
        .replace("e", "x")
    )
    .join("");

  // sync checkbox ➜ symbolic input
  useEffect(() => {
    setSymbolicInput(symbolicPermission);
    setError("");
  }, [symbolicPermission]);

  const validateSymbolic = (value) => {
    if (value.length !== 9) {
      return "Permission harus 9 karakter (contoh: rwxrwxr-x)";
    }

    const rules = [
      ["r", "-"], // read
      ["w", "-"], // write
      ["x", "-"], // execute
    ];

    for (let i = 0; i < value.length; i++) {
      const allowed = rules[i % 3];
      if (!allowed.includes(value[i])) {
        return `Format tidak valid di posisi ke-${i + 1}`;
      }
    }

    return "";
  };

  const handleSymbolicChange = (value) => {
    setSymbolicInput(value);

    const validationError = validateSymbolic(value);
    if (validationError) {
      setError(validationError);
      return;
    }

    setError("");

    const chars = value.split("");
    const newMatrix = {};

    roles.forEach((role, roleIndex) => {
      newMatrix[role] = {};
      permKeys.forEach((perm, permIndex) => {
        newMatrix[role][perm] = chars[roleIndex * 3 + permIndex] !== "-";
      });
    });

    setMatrix(newMatrix);
  };

  return (
    <div className="max-w-xl mx-auto min-h-[85dvh] px-3 lg:px-0">
      <div className="py-5">
        <h1 className="text-xl text-center font-semibold">
          Chmod Calculator | Developer Tools
        </h1>
        <p className="text-center text-xs mt-1">
          Konversi dan hitung permission file Linux dalam format perintah chmod.
        </p>
      </div>

      <div className="space-y-4 border border-slate-300 p-4 rounded-md mt-5">
        {roles.map((role) => (
          <div key={role}>
            <h2 className="capitalize font-medium">{role}</h2>
            <div className="flex gap-4 mt-2">
              {permKeys.map((perm) => (
                <label key={perm} className="flex items-center gap-1">
                  <input
                    type="checkbox"
                    checked={matrix[role][perm]}
                    onChange={() => toggle(role, perm)}
                  />
                  {perm}
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5">
        <strong>Linux Permissions:</strong>

        <div className="text-lg font-mono">{numericPermission}</div>

        <input
          type="text"
          value={symbolicInput}
          onChange={(e) => handleSymbolicChange(e.target.value)}
          className={`w-full rounded px-3 py-2 font-mono border ${
            error ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="rwxrwxr-x"
        />

        {error && <p className="text-sm text-red-600">{error}</p>}
      </div>

      <div className="border-t pt-4 space-y-2">
        <div className="space-y-1 mt-4">
          <strong>Chmod Command:</strong>

          <div className="bg-gray-100 rounded p-2 font-mono text-sm">
            chmod {numericPermission} -R filename
          </div>

          <div className="bg-gray-100 rounded p-2 font-mono text-sm">
            chmod {symbolicPermission} -R filename
          </div>
        </div>
      </div>
    </div>
  );
}
