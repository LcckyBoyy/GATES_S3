import React, { useState } from "react";
import { FiPlus } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";

function ProductCategory() {
  const navigate = useNavigate();
  const { InventoryId } = useParams();
  const [categories, setCategories] = useState([
    {
      id: 1,
      name: "Electronics",
      description:
        "Devices and gadgets including computers, smartphones, and accessories",
    },
    {
      id: 2,
      name: "Clothing",
      description: "Apparel for men, women, and children across various styles",
    },
    {
      id: 3,
      name: "Home & Kitchen",
      description: "Furniture, appliances, and home decor items",
    },
  ]);

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden mb-16">
      <div className="flex justify-between items-center p-4 bg-white border-b-[1px]">
        <h2 className="text-xl font-bold">Product Management</h2>
        <button
          onClick={() => navigate(`/manage/${InventoryId}/categories/new`)}
          className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center hover:bg-blue-600 transition"
        >
          <FiPlus className="mr-2" /> Add Category
        </button>
      </div>

      <table className="w-full">
        <thead className="bg-white border-b-[1px]">
          <tr>
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Category</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.id} className="hover:bg-gray-50">
              <td className="p-3">{category.name}</td>
              <td className="p-3">{category.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductCategory;
