"use client";
import { signOut } from "next-auth/react";
import React from "react";

const Logout = () => {
  return (
    <button
      onClick={() => signOut()}
      className="mt-6 px-4 py-2 bg-gray-800 text-white rounded"
    >
      Logout
    </button>
  );
};

export default Logout;
