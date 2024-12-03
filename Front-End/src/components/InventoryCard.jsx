import React, { useState, useRef, useEffect } from "react";
import { CiMenuKebab } from "react-icons/ci";
import { CiEdit } from "react-icons/ci";
import { CiTrash } from "react-icons/ci";

function InventoryCard({
  invName,
  createdDate,
  invId,
  edition,
  userRole,
  logoUrl,
  Manage,
  onEdit,
  onDelete,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleteConfirming, setIsDeleteConfirming] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setIsDeleteConfirming(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    setIsDeleteConfirming(false);
  };

  const handleEditClick = () => {
    onEdit({
      invName,
      createdDate,
      invId,
      edition,
      userRole,
    });
    setIsOpen(false);
  };

  const handleDeleteInitiate = () => {
    setIsDeleteConfirming(true);
  };

  const handleDeleteConfirm = () => {
    onDelete({
      invName,
      invId,
    });
    setIsOpen(false);
    setIsDeleteConfirming(false);
  };

  const handleDeleteCancel = () => {
    setIsDeleteConfirming(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex items-start justify-between w-[656px] mt-2">
      <div className="flex items-center">
        {logoUrl ? (
          <img
            src={logoUrl}
            alt={`${invName} logo`}
            className="w-16 h-16 rounded-full object-cover"
          />
        ) : (
          <div className="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center">
            {invName ? invName[0] : ""}
          </div>
        )}
        <div className="ml-4">
          <h2 className="text-xl font-bold text-gray-800">{invName}</h2>
          <p className="text-gray-500 text-sm">
            Organization created on{" "}
            <span className="font-bold">{createdDate}</span>
          </p>
          <p className="text-gray-500 text-sm">
            Inventory Id: <span className="font-bold">{invId}</span>
          </p>
          <p className="text-gray-500 text-sm">Edition: {edition}</p>
          <p className="text-gray-500 text-sm">
            You are a {userRole} in this organization
          </p>
        </div>
      </div>
      <div className="flex items-center justify-end">
        <button
          onClick={Manage}
          className="border-2 border-[#008CFF] hover:bg-blue-500/10 text-[#008CFF] font-semibold py-0.5 px-1 rounded"
        >
          Manage
        </button>
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={toggleDropdown}
            className="text-[#008CFF] p-2 bg-slate-100 rounded-lg ml-2 hover:bg-slate-200"
          >
            <CiMenuKebab size={20} />
          </button>

          {isOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-20">
              {isDeleteConfirming ? (
                <div className="p-3">
                  <p className="text-sm text-gray-600 mb-2">
                    Are you sure you want to delete this inventory?
                  </p>
                  <div className="flex justify-between">
                    <button
                      onClick={handleDeleteConfirm}
                      className="bg-red-500 text-white px-2 py-1 rounded text-sm"
                    >
                      Confirm
                    </button>
                    <button
                      onClick={handleDeleteCancel}
                      className="bg-gray-200 text-gray-700 px-2 py-1 rounded text-sm"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <ul className="py-1">
                  <li
                    onClick={handleEditClick}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-700 hover:text-black flex items-center"
                  >
                    <CiEdit className="mr-2" /> Edit
                  </li>
                  <li
                    onClick={handleDeleteInitiate}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-500 hover:text-red-700 flex items-center"
                  >
                    <CiTrash className="mr-2" /> Delete
                  </li>
                </ul>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default InventoryCard;