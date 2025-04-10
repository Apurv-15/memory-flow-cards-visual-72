
import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-apple-gray">
      <div className="apple-card w-full max-w-md text-center p-8">
        <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-8">
          The page you're looking for can't be found.
        </p>
        <button
          onClick={() => navigate("/")}
          className="apple-button py-3 px-6"
        >
          Go Home
        </button>
      </div>
    </div>
  );
};

export default NotFound;
