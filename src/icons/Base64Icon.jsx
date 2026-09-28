import React from "react";

const Base64Icon = (props) => {
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
        d="M7 4v16M17 4v16M12 4v16"
      />
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M4 9h6M14 9h6M4 15h6M14 15h6"
      />
    </svg>
  );
};

export default Base64Icon;
