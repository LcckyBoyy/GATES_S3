import cuid from "cuid";
import React, { useState } from "react";
import { CiSquarePlus } from "react-icons/ci";
import { IoCloseOutline } from "react-icons/io5";

function NewInventoryModal({ onInventoryCreated }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    inventoryId: cuid(),
    inventoryName: "",
    description: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/Inventory/create", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          ...formData,
          inventoryId: cuid(),
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Failed to create inventory");
      }

      const result = await response.json();

      setFormData({
        inventory_id: "",
        inventoryName: "",
        description: "",
      });

      if (onInventoryCreated) {
        onInventoryCreated(result);
      }

      setIsOpen(false);
    } catch (error) {
      console.error("Create inventory error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="ml-auto items-center  p-1.5 bg-[#008CFF] rounded-md text-white flex gap-2 hover:bg-[#3b99e5]"
      >
        <CiSquarePlus size={20} className="mr-2" />
        New Inventory
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-xl font-semibold text-gray-800">
                Create New Inventory
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-600 hover:text-gray-900"
              >
                <IoCloseOutline size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label
                  htmlFor="inventoryName"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Inventory Name
                </label>
                <input
                  type="text"
                  id="inventoryName"
                  name="inventoryName"
                  value={formData.inventoryName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#008CFF] focus:border-transparent"
                  placeholder="Enter inventory name"
                />
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#008CFF] focus:border-transparent"
                  placeholder="Enter inventory description"
                ></textarea>
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-300 bg-gray-200 rounded-md transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={`group relative  flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md ${
                    isLoading
                      ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                      : "text-white bg-blue-600 hover:bg-blue-700"
                  } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out`}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="flex ">
                      <span className="animate-pulse">Loading</span>
                      <span className="animate-bounce ml-1 inline-block font-bold">
                        . . .
                      </span>
                    </span>
                  ) : (
                    "Create Inventory"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default NewInventoryModal;
