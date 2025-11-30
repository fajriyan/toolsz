"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

const GalleryFadeSlide = () => {
  const images = [
    "https://images.unsplash.com/photo-1651611243377-2c15b94ad613?q=80&w=2500&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1740568439425-8ef0deafe965?q=80&w=2532&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1679173480513-8e2d4f583b86?q=80&w=1035&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1676799910063-a349396b70e7?q=80&w=1035&auto=format&fit=crop",
  ];

  const [shuffled, setShuffled] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const randomOrder = [...images].sort(() => Math.random() - 0.5);
    setShuffled(randomOrder);
  }, []);

  useEffect(() => {
    if (shuffled.length === 0) return;
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % shuffled.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [shuffled]);

  return (
    <div className="relative w-full h-[400px] rounded-2xl overflow-hidden">
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
};

export default GalleryFadeSlide;
