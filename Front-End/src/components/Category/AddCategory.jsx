import cuid from "cuid";
import React, { useState } from "react";
import { FiSave } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";

function AddCategory() {
  const { InventoryId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [category, setCategory] = useState({
    categoryId: "",
    name: "",
    description: "",
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCategory((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/Category/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          categoryId: cuid(),
          name: category.name,
          description: category.description,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create category");
      }

      const data = await response.json();
      console.log("Category Created:", data);

      navigate(`/manage/${InventoryId}/categories`);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
      <div className="bg-white shadow-md rounded-lg p-8">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">
          Add New Product Category
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
            {/* Left Column */}
            <div>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                  Category Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={category.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md "
                  placeholder="Enter category name"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={category.description}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md"
                  rows="4"
                  placeholder="Enter category description"
                  required
                ></textarea>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => navigate(`/manage/${InventoryId}/categories`)}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`group relative items-center flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md ${
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
                <>
                  <FiSave className="mr-2" />
                  Save Category
                </>
              )}
            </button>
          </div>
        </form>
      </div>
  );
}

export default AddCategory;
