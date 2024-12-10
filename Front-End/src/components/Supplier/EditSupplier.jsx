import React, { useEffect, useState } from "react";
import { FaSave } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { FaRegTrashAlt } from "react-icons/fa";

function EditSupplier() {
  const { InventoryId, supplierId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [supplier, setSupplier] = useState({
    name: "",
    contact: "",
    email: "",
    address: "",
  });
  const navigate = useNavigate();

  // Fetch supplier data when the component mounts
  useEffect(() => {
    const fetchSupplier = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/Supplier/read?supplierId=${supplierId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch supplier");
        }
        const data = await response.json();
        setSupplier(data);
      } catch (error) {
        console.error("Error fetching supplier:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSupplier();
  }, [supplierId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSupplier((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(`/Supplier/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          supplierId: supplierId,
          name: supplier.name,
          contact: supplier.contact,
          email: supplier.email,
          address: supplier.address,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update supplier");
      }

      const data = await response.json();
      console.log("Supplier Updated:", data);

      navigate(`/manage/${InventoryId}/suppliers`);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this supplier?"
    );
    if (!confirmDelete) return;

    setIsLoading(true);

    try {
      const response = await fetch(
        `/Supplier/delete?supplierId=${supplierId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete supplier");
      }

      console.log("Supplier Deleted");
      navigate(`/manage/${InventoryId}/suppliers`);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-8">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        Edit Supplier: {supplier.name}
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
          <div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Supplier Name
              </label>
              <input
                type="text"
                name="name"
                value={supplier.name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter supplier name"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Contact Number
              </label>
              <input
                type="text"
                name="contact"
                value={supplier.contact}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter contact number"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={supplier.email}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter email address"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Address
              </label>
              <input
                type="text"
                name="address"
                value={supplier.address}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter address"
                required
              />
            </div>
          </div>
        </div>

        <div className="flex justify-between gap-4">
          <button
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
              onClick={() => navigate(`/manage/${InventoryId}/suppliers`)}
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

export default EditSupplier;