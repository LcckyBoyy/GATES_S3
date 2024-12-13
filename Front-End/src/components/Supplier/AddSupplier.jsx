import cuid from "cuid";
import React, { useState } from "react";
import { FiSave } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

function AddSupplier() {
  const { InventoryId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [supplier, setSupplier] = useState({
    supplierId: "",
    InventoryId: InventoryId,
    name: "",
    contactPerson: "",
    contact: "",
    email: "",
    address: "",
  });
  const navigate = useNavigate();

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
      const response = await fetch("/Supplier/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          supplierId: cuid(),
          inventoryId: supplier.InventoryId,
          supplierName: supplier.name,
          contactPerson: supplier.contactPerson,
          email: supplier.email,
          phone: supplier.contact,
          address: supplier.address,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create supplier");
      }

      const data = await response.json();
      console.log("Supplier Created:", data);

      MySwal.fire({
        title: "Success!",
        text: "Supplier created successfully.",
        icon: "success",
        confirmButtonColor: "#3085d6",
      }).then(() => {
        navigate(`/manage/${InventoryId}/suppliers`);
      });
    } catch (error) {
      console.error("Error:", error);

      MySwal.fire({
        title: "Error!",
        text: error.message || "An error occurred while creating the supplier.",
        icon: "error",
        confirmButtonColor: "#d33",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-8 mb-16">
      <h1 className="text-xl font-semibold mb-6 text-black border-b-2">
        Add Supplier
      </h1>

      <form onSubmit={handleSubmit}>
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
                className="w-full px-3 py-2 border rounded-md"
                placeholder="Enter supplier name"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Contact Person
              </label>
              <input
                type="text"
                name="contactPerson"
                value={supplier.contactPerson}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md"
                placeholder="Enter Contact Person"
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
                className="w-full px-3 py-2 border rounded-md"
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
                className="w-full px-3 py-2 border rounded-md"
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
                className="w-full px-3 py-2 border rounded-md"
                placeholder="Enter address"
                required
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4">
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
                <FiSave className="mr-2" />
                Save Supplier
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddSupplier;
