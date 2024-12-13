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
    <>
      <h1 className="text-base font-semibold ">Products</h1>
      <h1 className="text-gray-400 font-semibold text-xs mb-4">List</h1>
      <div className="bg-white shadow-md rounded-lg overflow-hidden mb-16">
        <div className="flex items-center p-2 bg-white border-b-[1px]">
          <button
            onClick={() => navigate(`/manage/${InventoryId}/products/new`)}
            className="bg-[#dfffea] text-[#31c653] p-2 gap-2 rounded-md flex items-center hover:bg-[#17c653] hover:text-white transition"
          >
            Add <FiPlus />
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
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr
                  key={product.productId}
                  className="border-b hover:bg-gray-100 cursor-pointer"
                  onClick={() =>
                    navigate(
                      `/manage/${InventoryId}/products/${product.productId}`
                    )
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Products;
