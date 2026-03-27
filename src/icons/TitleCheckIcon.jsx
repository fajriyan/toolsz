import React from "react";

const TitleCheckIcon = (props) => {
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
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M18 21V7m-9 8l3-3l3 3m0-5l3-3l3 3M3 21h18m-9 0v-9M3 6l3-3l3 3M6 21V3"
      />
    </svg>
  );
};

export default TitleCheckIcon;
