import React from "react";

export const Button = ({
  label = "Donate Blood",
  children,
  className = "",
  type = "button",
  ...props
}) => {
  return (
    <button
      type={type}
      className={`flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-xl shadow-lg hover:bg-red-700 transition-all duration-300 hover:scale-105 group ${className}`}
      {...props}
    >
      <svg className="w-6 h-6 animate-pulse group-hover:scale-110 transition" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C12 2 5 10 5 15a7 7 0 0014 0c0-5-7-13-7-13z" />
      </svg>
      {children || label}
    </button>
  );
};

export const Button2 = ({
  label = "Request Blood",
  children,
  className = "",
  type = "button",
  ...props
}) => {
  return (
    <button
      type={type}
      className={`flex items-center gap-2 px-6 py-3 border-2 border-red-500 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all duration-300 group ${className}`}
      {...props}
    >
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 21s-6-4.35-9-8.5C-1 7 3 2 7.5 5.5L12 9l4.5-3.5C21 2 25 7 21 12.5 18 16.65 12 21 12 21z" />
      </svg>
      {children || label}
    </button>
  );
};