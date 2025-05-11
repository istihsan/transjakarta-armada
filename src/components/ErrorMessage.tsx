import React from "react";

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div className="flex items-center justify-center h-64">
      <div className="flex items-center bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg shadow">
        <svg
          className="w-6 h-6 mr-3 text-red-600"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="15.97" />
        </svg>
        <p className="text-md font-semibold">{message}</p>
      </div>
    </div>
  );
};

export default ErrorMessage;
