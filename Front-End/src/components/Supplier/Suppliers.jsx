import React, { useState, useEffect } from "react";
import { FiPlus } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../Loading";

function Suppliers() {
  const navigate = useNavigate();
  const { InventoryId } = useParams();
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const response = await fetch(
          `/Supplier/read?inventoryId=${InventoryId}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        const formattedSuppliers = data.result.map((supplier) => ({
          id: supplier.supplierId,
          name: supplier.supplierName,
          contact: supplier.contactPerson,
          email: supplier.email,
        }));
        setSuppliers(formattedSuppliers);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch suppliers:", error);
        setLoading(false);
      }
    };

    fetchSuppliers();
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
    <>
    <h1 className="text-base font-semibold ">Suppliers</h1>
    <h1 className="text-gray-400 font-semibold text-xs mb-4">List</h1>
      <div className="bg-white shadow-md rounded-lg overflow-hidden mb-16">
        <div className="flex justify-between items-center p-4 bg-white border-b-[1px]">
          <button
            onClick={() => navigate(`/manage/${InventoryId}/suppliers/new`)}
            className="bg-[#dfffea] text-[#31c653] p-2 gap-2 rounded-md flex items-center hover:bg-[#17c653] hover:text-white transition"
            >
              Add <FiPlus />
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
                  navigate(
                    `/manage/${InventoryId}/suppliers/${supplier.id}/edit`
                  )
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
    </>
  );
}

export default Suppliers;
