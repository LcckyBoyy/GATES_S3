import React from "react";

function noAccessPage() {
  return (
    <div className="bg-gray-100 flex items-center justify-center h-screen">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md text-center">
        <h1 className="text-2xl font-bold text-red-600">Access Denied</h1>
        <p className="mt-4 text-gray-700">
          You don't have the necessary permissions to access this inventory.
        </p>
        <a
          href="/manage"
          className="mt-6 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Go Back to Home
        </a>
      </div>
    </div>
  );
}

export default noAccessPage;
