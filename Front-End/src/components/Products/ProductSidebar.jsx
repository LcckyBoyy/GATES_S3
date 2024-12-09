import React, { useState } from "react";
import { FaChevronRight } from "react-icons/fa";
import { GoPlus } from "react-icons/go";
import { useNavigate, useParams } from "react-router-dom";

function ProductSidebar() {
  const { InventoryId } = useParams();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("All Items");
  const navigate = useNavigate();

  const filters = [
    "All Items",
    "Active",
    "Inactive",
    "Work",
    "Personal",
    "Shopping",
    "Urgent",
  ];
  return (
    <div className="w-1/4 bg-white border-r border-gray-300 rounded-l-lg p-2 shadow-lg">
      <div className="border-b-2 p-4 flex items-center flex-row justify-between">
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center flex-row gap-2 font-bold text-lg"
          >
            {selectedFilter}
            <FaChevronRight
              className={`transition-transform duration-300 ease-in-out ${
                isDropdownOpen ? "rotate-90" : "rotate-0"
              }`}
            />
          </button>

          {isDropdownOpen && (
            <ul className="absolute z-10 top-full left-0 mt-2 bg-white border rounded-md shadow-lg w-32">
              {filters.map((filter) => (
                <li
                  key={filter}
                  onClick={() => {
                    setSelectedFilter(filter);
                    setIsDropdownOpen(false);
                  }}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  {filter}
                </li>
              ))}
            </ul>
          )}
        </div>

        <button
          onClick={() => navigate(`/manage/${InventoryId}/products/new`)}
          className="px-2 py-1 bg-blue-500 text-white rounded flex items-center flex-row gap-1"
        >
          <GoPlus size={20} />
          New
        </button>
      </div>

      <ul className="bg-white px-4 h-[80vh] custom-scrollbar overflow-y-auto">
        {Array.from({ length: 50 }, (_, i) => (
          <li key={i} className="text-blue-500 cursor-pointer border-b-2 py-2">
            Item {i + 1}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductSidebar;
