"use client";
import { signOut } from "next-auth/react";
import React from "react";

const Logout = () => {
  return (
    <button
      onClick={() => signOut()}
      className="px-4 py-1.5 rounded-full text-sm bg-gray-800 shadow-sm hover:shadow-xs hover:shadow-cyan-500 text-white"
    >
      Logout
    </button>
  );
};

export default Logout;
