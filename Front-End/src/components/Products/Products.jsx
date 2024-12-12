import React, { useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../Loading";

function Products() {
  const { InventoryId } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch(
          `/Product/read?inventoryId=${InventoryId}`,
          {
            method: "GET",
            credentials: "include",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          const errorText = await response.text();
          console.error("Error response:", errorText);
          throw new Error(
            `HTTP error! status: ${response.status}, message: ${errorText}`
          );
        }

        const data = await response.json();

        if (data.message == "You dont have the access for this inventory") {
          window.location.href = "/no-access";
          return;
        }

        setProducts(data);
        setLoading(false);
      } catch (err) {
        console.error("Fetch Error:", err);
        setError(err.message);
        setLoading(false);
      }
    }

    fetchProducts();
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
  if (error) return <div>Error: {error}</div>;

  return (
<div className="bg-white shadow-md rounded-lg overflow-hidden mb-16">
  <div className="flex justify-between items-center p-4 bg-white border-b-[1px]">
    <h2 className="text-xl font-bold">Product Management</h2>
    <button
      onClick={() => navigate(`/manage/${InventoryId}/products/new`)}
      className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center hover:bg-blue-600 transition"
    >
      <FiPlus className="mr-2" /> Add Product
    </button>
  </div>

  <div className="overflow-x-auto custom-scrollbar">
    <table className="min-w-full">
      <thead className="bg-white border-b-[1px]">
        <tr>
          <th className="p-3 text-left">Name</th>
          <th className="p-3 text-left">Category</th>
          <th className="p-3 text-left">Supplier</th>
          <th className="p-3 text-left">Price</th>
          <th className="p-3 text-left">Measure</th>
          <th className="p-3 text-left">Stock</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr
            key={product.productId}
            className="border-b hover:bg-gray-100 cursor-pointer"
            onClick={() =>
              navigate(`/manage/${InventoryId}/products/${product.productId}`)
            }
          >
            <td className="p-3">
              <div className="flex items-center space-x-3">
                <span>{product.productName}</span>
              </div>
            </td>
            <td className="p-3">{product.categoryName}</td>
            <td className="p-3">{product.supplierName}</td>
            <td className="p-3">${product.unitPrice}</td>
            <td className="p-3">{product.unitMeasure}</td>
            <td className="p-3">{product.currentStock}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>

  );
}

export default Products;
