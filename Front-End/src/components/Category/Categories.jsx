import React, { useState, useEffect } from "react";
import { FiPlus } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../Loading";

function Categories() {
  const navigate = useNavigate();
  const { InventoryId } = useParams();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`/Category/read?inventoryId=${InventoryId}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        const formattedCategories = data.map((category) => ({
          id: category.categoryId,
          name: category.name,
          description: category.description,
        }));
        setCategories(formattedCategories);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading)
    return (
      <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
        <Loading
          count={4}
          size="w-6 h-6"
          baseColor="bg-white/30"
          activeColor="bg-white"
        />
      </div>
    );

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden mb-16">
      <div className="flex justify-between items-center p-4 bg-white border-b-[1px]">
        <h2 className="text-xl font-bold">Product Category</h2>
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
            <th className="p-3 text-left">Description</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr
              key={category.id}
              className="border-b hover:bg-gray-100 cursor-pointer"
              onClick={() =>
                navigate(
                  `/manage/${InventoryId}/categories/${category.id}/edit`
                )
              }
            >
              <td className="p-3">{category.name}</td>
              <td className="p-3">{category.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Categories;
