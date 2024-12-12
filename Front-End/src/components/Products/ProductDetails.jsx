import React, { useEffect, useState } from "react";
import {
  useNavigate,
  useParams,
  Route,
  Routes,
  Link,
  useLocation,
} from "react-router-dom";
import { IoIosClose } from "react-icons/io";
import Loading from "../Loading";
import { MdOutlineEdit } from "react-icons/md";
import StockMovementHistories from "../Stock/StockMovementHistories";

function ProductOverview({ product }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 border-b-2 border-blue-500 pb-3 mb-4">
        Product Overview
      </h2>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-3">
          <div className="flex justify-between items-center border-b pb-2">
            <span className="text-gray-600 font-medium">Item Name</span>
            <span className="font-semibold text-gray-800">
              {product.productName}
            </span>
          </div>
          <div className="flex justify-between items-center border-b pb-2">
            <span className="text-gray-600 font-medium">SKU</span>
            <span className="font-semibold text-gray-800">{product.sku}</span>
          </div>
          <div className="flex justify-between items-center border-b pb-2">
            <span className="text-gray-600 font-medium">Unit of Measure</span>
            <span className="font-semibold text-gray-800">
              {product.unitMeasure}
            </span>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-center border-b pb-2">
            <span className="text-gray-600 font-medium">Price</span>
            <span className="font-semibold text-green-600">
              ${parseFloat(product.unitPrice).toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between items-center border-b pb-2">
            <span className="text-gray-600 font-medium">Current Stock</span>
            <span
              className={`font-semibold ${
                product.currentStock <= product.minimumStock
                  ? "text-red-600"
                  : "text-blue-600"
              }`}
            >
              {product.currentStock}
            </span>
          </div>
          <div className="flex justify-between items-center border-b pb-2">
            <span className="text-gray-600 font-medium">Minimum Stock</span>
            <span className="font-semibold text-gray-800">
              {product.minimumStock}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-4 bg-gray-50 p-4 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">
          Description
        </h3>
        <p className="text-gray-600 italic">{product.description}</p>
      </div>
    </div>
  );
}

function ProductDetails() {
  const { Productid, InventoryId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `/Product/get?inventoryId=${InventoryId}&productId=${Productid}`
        );
        if (!response.ok) throw new Error("Failed to fetch product");

        const data = await response.json();
        setProduct(data.result);
      } catch (error) {
        console.error("Error fetching product:", error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [Productid, InventoryId]);

  if (!product) {
    return <div>Product not found.</div>;
  }

  const isHistory = location.pathname.endsWith("/history");

  return (
    <div className="w-3/4 p-4 bg-white rounded-r-xl shadow-lg">
      <div className="flex flex-row items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">{product.name}</h1>
      </div>
      <div className="border-b border-gray-300 mb-4 flex flex-row justify-between">
        <div>
          <Link
            to={`/manage/${InventoryId}/products/${Productid}`}
            className={`px-4 py-2 font-medium ${
              !isHistory ? "border-b-2 border-blue-500" : ""
            }`}
          >
            Overview
          </Link>
          <Link
            to={`/manage/${InventoryId}/products/${Productid}/history`}
            className={`px-4 py-2 font-medium ${
              isHistory ? "border-b-2 border-blue-500" : ""
            }`}
          >
            History
          </Link>
        </div>

        <div className="flex flex-row items-center">
          <div className="relative group inline-block">
            <button
              onClick={() =>
                navigate(`/manage/${InventoryId}/products/${Productid}/edit`)
              }
              className="bg-[#D3D3D3] p-1.5 rounded-md border-2 border-[#c7c7c7]"
            >
              <MdOutlineEdit />
            </button>
            <div className="absolute z-10 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 top-full left-1/2 transform -translate-x-1/2 translate-y-1 pointer-events-none after:content-[''] after:absolute after:bottom-full after:left-1/2 after:border-4 after:border-transparent after:border-b-black">
              Edit
            </div>
          </div>

          <button
            onClick={() => navigate(`/manage/${InventoryId}/products`)}
            className="text-gray-600 hover:text-black"
          >
            <IoIosClose size={36} />
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-32">
          <Loading />
        </div>
      ) : !product ? (
        <div>Product not found.</div>
      ) : (
        <Routes>
          <Route path="/" element={<ProductOverview product={product} />} />
          <Route path="/history" element={<StockMovementHistories/>} />
        </Routes>
      )}
    </div>
  );
}

export default ProductDetails;
