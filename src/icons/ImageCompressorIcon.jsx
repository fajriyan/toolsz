import React from "react";

const ImageCompressorIcon = (props) => {
  return (
    <svg
      className="w-5 h-5 text-gray-800"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M4 7a2 2 0 0 1 2-2h4m8 0a2 2 0 0 1 2 2v4m0 8a2 2 0 0 1-2 2h-4M6 19a2 2 0 0 1-2-2v-4m3-6 3 3m0 0 3-3m-3 3V4m6 16-3-3m0 0-3 3m3-3v6"
      />
    </svg>
  );
};

export default ImageCompressorIcon;
