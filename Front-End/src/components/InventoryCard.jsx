import React from "react";
import { CiMenuKebab } from "react-icons/ci";


function InventoryCard() {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex items-start justify-between w-[656px] mt-2">
      <div className="flex items-center">
        <div className="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center"></div>
        <div className="ml-4">
          <h2 className="text-xl font-bold text-gray-800">Aglet</h2>
          <p className="text-gray-500 text-sm">
            Organization created on 20/11/2024
          </p>
          <p className="text-gray-500 text-sm">Organization ID: 871808325</p>
          <p className="text-gray-500 text-sm">Edition: Global</p>
          <p className="text-gray-500 text-sm">
            You are an admin in this organization
          </p>
        </div>
      </div>
      <div className="flex items-center justify-end">
        <button className="border-2 border-[#008CFF] hover:bg-blue-500/10 text-[#008CFF] font-semibold py-0.5 px-1 rounded">
          Go to Organization
        </button>
        <button className="text-[#008CFF]">
          <CiMenuKebab size={20} />
        </button>
      </div>
    </div>
  );
}

export default InventoryCard;
