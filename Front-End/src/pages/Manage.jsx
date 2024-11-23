import React from "react";
import { FaChevronLeft } from "react-icons/fa";
import InventoryCard from "../components/InventoryCard";

function Manage() {
  return (
    <div className="flex justify-center items-center h-screen flex-col bg-slate-200">
      <div className="">
        <button className="flex items-center space-x-2 text-gray-700 hover:text-gray-900">
          <FaChevronLeft size={12} />
          <span>Back</span>
        </button>
        <h2 className="text-lg font-medium">Hi, Ckp S!</h2>
        <p className="text-gray-600 mt-4">
          You are a part of the following organization, Go to the organization
          which you wish to access now
        </p>
      </div>
        <InventoryCard />
        <InventoryCard />
        <InventoryCard />
    </div>
  );
}

export default Manage;
