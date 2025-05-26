"use client";
import React, { useEffect, useState } from "react";

function Changelog() {
  const [data, setData] = useState("");

  useEffect(() => {
    async function fetchLatestCommit() {
      try {
        const response = await fetch(
          "https://api.github.com/repos/fajriyan/toolsz/commits"
        );
        const data = await response.json();
        if (data && data.length > 0) {
          console.log(data[0]);
          setData(data[0]);
        }
      } catch (error) {
        console.error("Failed to fetch commit message:", error);
      }
    }
    fetchLatestCommit();
  }, []);

  return (
    <p className="px-3 text-[16px] line-clamp-1">
      {data?.commit?.author?.name + " : "}
      <span className="capitalize">{data?.commit?.message || "Loading latest commit..."}</span>
    </p>
  );
}

export default Changelog;
