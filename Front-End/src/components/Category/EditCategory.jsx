import React, { useEffect, useState } from "react";
import { FaSave } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { FaRegTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

function EditCategory() {
  const { InventoryId, categoryId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [category, setCategory] = useState({
    name: "",
    description: "",
  });
  const [oldCategory, setOldCategory] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategory = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `/Category/get?categoryId=${categoryId}&inventoryId=${InventoryId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch category");
        }
        const data = await response.json();
        setOldCategory(data.result);
        setCategory({
          name: data.result.name,
          description: data.result.description,
        });
      } catch (error) {
        console.error("Error fetching category:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategory();
  }, [categoryId]);

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
      const response = await fetch(`/Category`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inventoryId: InventoryId,
          categoryId: categoryId,
          name: category.name,
          description: category.description,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update category");
      }

      const data = await response.json();

      MySwal.fire({
        title: "Success!",
        text: "Category updated successfully.",
        icon: "success",
        confirmButtonColor: "#3085d6",
      }).then(() => {
        navigate(`/manage/${InventoryId}/categories`);
      });
    } catch (error) {
      console.error("Error:", error);

      MySwal.fire({
        title: "Error!",
        text: error.message || "An error occurred while updating the category.",
        icon: "error",
        confirmButtonColor: "#d33",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    const result = await MySwal.fire({
      title: "Critical Action Required!",
      text: "This action will permanently delete this category and all associated products. Are you absolutely sure you want to proceed?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it permanently!",
    });

    if (result.isConfirmed) {
      setIsLoading(true);

      try {
        const response = await fetch(`/Category?categoryId=${categoryId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to delete category");
        }

        console.log("Category Deleted");

        MySwal.fire({
          title: "Deleted!",
          text: "The category has been deleted successfully.",
          icon: "success",
          confirmButtonColor: "#3085d6",
        }).then(() => {
          navigate(`/manage/${InventoryId}/categories`);
        });
      } catch (error) {
        console.error("Error:", error);

        MySwal.fire({
          title: "Error!",
          text:
            error.message || "An error occurred while deleting the category.",
          icon: "error",
          confirmButtonColor: "#d33",
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-8">
      <h1 className="text-xl font-semibold mb-6 text-black border-b-2">
        Category Edit
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
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
          </div>
        </div>

        <div className="flex justify-between gap-4">
          <button
            type="button"
            onClick={handleDelete}
            className={`flex items-center justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md ${
              isLoading
                ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                : "bg-red-500 hover:bg-red-600 text-white font-bold"
            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-150 ease-in-out`}
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex">
                <span className="animate-pulse">Loading</span>
                <span className="animate-bounce ml-1 inline-block font-bold">
                  . . .
                </span>
              </span>
            ) : (
              <>
                <FaRegTrashAlt size={20} className="mr-2" />
                Delete
              </>
            )}
          </button>
          <div className="flex flex-row gap-2">
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
                  <FaSave className="mr-2" />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default EditCategory;
