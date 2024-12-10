import React, { useState, useEffect } from "react";
import { FiPlus } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";

function Suppliers() {
  const navigate = useNavigate();
  const { InventoryId } = useParams();
  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const response = await fetch("/Supplier/read");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        const formattedSuppliers = data.map((supplier) => ({
          id: supplier.supplierId,
          name: supplier.name,
          contact: supplier.contact,
          email: supplier.email,
        }));
        setSuppliers(formattedSuppliers);
      } catch (error) {
        console.error("Failed to fetch suppliers:", error);
      }
    };

    fetchSuppliers();
  }, []);

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden mb-16">
      <div className="flex justify-between items-center p-4 bg-white border-b-[1px]">
        <h2 className="text-xl font-bold">Supplier Management</h2>
        <button
          onClick={() => navigate(`/manage/${InventoryId}/suppliers/new`)}
          className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center hover:bg-blue-600 transition"
        >
          <FiPlus className="mr-2" /> Add Supplier
        </button>
      </div>

      <table className="w-full">
        <thead className="bg-white border-b-[1px]">
          <tr>
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Contact</th>
            <th className="p-3 text-left">Email</th>
          </tr>
        </thead>
        <tbody>
          {suppliers.map((supplier) => (
            <tr
              key={supplier.id}
              className="border-b hover:bg-gray-100 cursor-pointer"
              onClick={() =>
                navigate(`/manage/${InventoryId}/suppliers/${supplier.id}`)
              }
            >
              <td className="p-3">{supplier.name}</td>
              <td className="p-3">{supplier.contact}</td>
              <td className="p-3">{supplier.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Suppliers;