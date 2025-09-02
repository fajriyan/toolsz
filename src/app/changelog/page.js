"use client"; // Jika di Next.js app router

import React, { useEffect, useState } from "react";

const SkeletonRow = () => (
  <tr>
    {[0, 1, 2, 3].map((i) => (
      <td key={i} className="border px-2 py-1">
        <div className="h-7 bg-gray-200 rounded animate-pulse"></div>
      </td>
    ))}
  </tr>
);

const Changelog = () => {
  const [commits, setCommits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://api.github.com/repos/fajriyan/toolsz/commits")
      .then((res) => {
        if (!res.ok) throw new Error("Gagal fetch commit dari GitHub");
        return res.json();
      })
      .then((data) => {
        setCommits(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (error) return <p className="text-center py-5 text-red-500">{error}</p>;

  return (
    <div className="container mx-auto py-3 px-3 md:px-0">
      <div className="py-5">
        <h1 className="text-xl text-center font-semibold">Changelog</h1>
        <p className="text-center text-xs mt-1">
          Semua Rekam Update dari Website <span> Toolsz </span>
        </p>
      </div>

      <table className="w-full mt-5 mb-10 border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100 text-sm">
            <th className="border px-2 py-1 w-[10%]">SHA</th>
            <th className="border px-2 py-1 w-[10%]">Tanggal</th>
            <th className="border px-2 py-1">Keterangan</th>
            <th className="border px-2 py-1 w-[10%]">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {loading
            ? Array.from({ length: 20 }).map((_, i) => <SkeletonRow key={i} />)
            : commits.map((commit) => (
                <tr key={commit.sha} className="text-sm">
                  <td className="border px-2 py-1 text-center">
                    {commit.sha.substring(0, 7)}
                  </td>
                  <td className="border px-2 py-1 text-center">
                    {new Date(commit.commit.author.date).toLocaleDateString()}
                  </td>
                  <td className="border px-2 py-1">{commit.commit.message}</td>
                  <td className="border px-2 py-1 text-center">
                    <button
                      onClick={() =>
                        window.open(
                          `https://github.com/fajriyan/toolsz/commit/${commit.sha}`,
                          "_blank"
                        )
                      }
                      className="bg-black py-1 px-3 rounded-lg text-xs font-semibold text-white hover:bg-cyan-800"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
        </tbody>
      </table>
    </div>
  );
};

export default Changelog;
