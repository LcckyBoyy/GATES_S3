import React from "react";
import { useParams } from "react-router-dom";

function Home() {
  const { InventoryId } = useParams();
  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <p>Welcome to your inventory management system dashboard {InventoryId}.</p>
    </div>
  );
}

export default Home;
