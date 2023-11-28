"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Menu = [
  { id: 1, title: "Beranda", url: "/" },
  { id: 2, title: "Dummy File", url: "/dummy-file" },
  { id: 3, title: "Word Counter", url: "/word-counter" },
  { id: 4, title: "Lorem Generator", url: "/lorem-generator" },
];

const Navbar = () => {
  const currentRoute = usePathname();

  return (
    <>
      <div className="bg-white text-black border-b">
        <div className="container mx-auto flex items-center h-[60px]">
          <div className="w-[13%]">
            toolsz
            {/* <Image src="/next.svg" alt="Logo" width={100} height={100} /> */}
          </div>
          <div className="flex justify-center gap-5 w-[73%]">
            {Menu.map((m) => (
              <Link
                href={m.url}
                key={m.id}
                className={
                  currentRoute === m.url
                    ? "border-b-2 border-slate-500 py-[17px]"
                    : "hover:border-b-2 border-slate-500 py-[17px]"
                }
              >
                {m.title}
              </Link>
            ))}
          </div>
          <div className="flex justify-end w-[13%]">
            <button className="border border-slate-800 px-2 py-1 rounded-xl">
              Contact Me
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
