import React from "react";
import { useParams } from "react-router-dom";

function Home() {
  const { InventoryId } = useParams();
  return (
    <>
      <h1 className="text-base font-semibold ">Home</h1>
      <h1 className="text-gray-400 font-semibold text-xs mb-4">Dashboard</h1>
      <div className="p-6 bg-white rounded-lg shadow-md">
        <p>
          Welcome to your inventory management system dashboard {InventoryId}.
        </p>
      </div>
    </>
  );
}

export default Home;
