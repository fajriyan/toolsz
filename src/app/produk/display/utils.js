"use client";

const utils = ({ w, h }) => {
  const width = screen?.width || "null";
  const height = screen?.height || "null";
  return (
    <>
      {w && <span>{width}</span>}
      {h && <span>{height}</span>}
    </>
  );
};

export default utils;
