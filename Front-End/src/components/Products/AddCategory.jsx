import React, { useState } from "react";
import { FaSave, FaImage, FaTrash } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";

function AddCategory() {
  const { InventoryId } = useParams();
  const navigate = useNavigate();

  const [category, setCategory] = useState({
    name: "",
    description: "",
    imagePreview: null,
    status: "active",
    parentCategory: "",
  });

  const [parentCategories] = useState([
    { id: 1, name: "Electronics" },
    { id: 2, name: "Clothing" },
    { id: 3, name: "Home & Kitchen" },
  ]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCategory((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to a backend
    console.log("Category Submitted:", category);
    // Reset form or show success message
  };

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white shadow-md rounded-lg p-8">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">
          Add New Product Category
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="4"
                  placeholder="Enter category description"
                  required
                ></textarea>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                  Status
                </label>
                <div className="flex items-center">
                  <input
                    type="radio"
                    name="status"
                    value="active"
                    checked={category.status === "active"}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  <span className="mr-4">Active</span>
                  <input
                    type="radio"
                    name="status"
                    value="inactive"
                    checked={category.status === "inactive"}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  <span>Inactive</span>
                </div>
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
              className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition flex items-center gap-2"
            >
              <FaSave /> Save Category
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddCategory;
