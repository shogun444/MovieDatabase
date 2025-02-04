import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center bg-gray-900 text-white">
      <div className="text-9xl font-bold">404</div>
      <h1 className="text-3xl mt-4">Page Not Found</h1>
      <p className="text-lg mt-2">Oops! The page you're looking for does not exist.</p>
      <Link
        to="/"
        className="mt-6 text-lg text-indigo-600 hover:text-indigo-800 transition-all duration-200"
      >
        Go Back to Home
      </Link>
    </div>
  );
}
