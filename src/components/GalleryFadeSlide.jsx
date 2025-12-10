"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function GalleryFadeSlide({
  images = [],
  className = "h-[400px]",
}) {
  const [shuffled, setShuffled] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!images.length) return;

    const randomOrder = [...images].sort(() => Math.random() - 0.5);
    setShuffled(randomOrder);
  }, [images]);

  useEffect(() => {
    if (!shuffled.length) return;

    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % shuffled.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [shuffled]);

  return (
    <div className={`relative w-full ${className} rounded-2xl overflow-hidden`}>
      {shuffled.map((src, i) => (
        <Image
          key={i}
          src={src}
          alt={`Gallery ${i}`}
          width={950}
          height={900}
          className={`absolute hidden md:block h-full w-full object-cover rounded-2xl transition-opacity duration-1000 ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
    </div>
  );
}
