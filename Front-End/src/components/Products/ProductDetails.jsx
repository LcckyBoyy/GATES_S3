import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IoIosClose } from "react-icons/io";
import Loading from "../Loading";
import { MdOutlineEdit } from "react-icons/md";

function ProductDetails() {
  const { Productid, InventoryId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

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
  }, [Productid]);

  if (!product) {
    return <div>Product not found.</div>;
  }

  return (
    <div className="w-3/4 p-4 bg-white rounded-r-xl shadow-lg">
      <div className="flex flex-row items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">{product.name}</h1>
      </div>
      <div className="border-b border-gray-300 mb-4 flex flex-row justify-between">
        <div>
          <button
            className={`px-4 py-2 font-medium ${
              activeTab === "overview" ? "border-b-2 border-blue-500" : ""
            }`}
            onClick={() => handleTabClick("overview")}
          >
            Overview
          </button>
          <button
            className={`px-4 py-2 font-medium ${
              activeTab === "history" ? "border-b-2 border-blue-500" : ""
            }`}
            onClick={() => handleTabClick("history")}
          >
            History
          </button>
        </div>

        <div className="flex flex-row items-center">
          <div className="relative group inline-block">
            <button onClick={() => navigate(`/manage/${InventoryId}/products/${Productid}/edit`)}
            className="bg-[#D3D3D3] p-1.5 rounded-md border-2 border-[#c7c7c7]">
              <MdOutlineEdit />
            </button>
            <div
              className="absolute z-10 
                bg-black text-white text-xs 
                px-2 py-1 rounded 
                opacity-0 group-hover:opacity-100 
                transition-opacity duration-300 
                top-full left-1/2 transform -translate-x-1/2 translate-y-1
                pointer-events-none
                after:content-[''] after:absolute after:bottom-full after:left-1/2 
                after:border-4 after:border-transparent after:border-b-black"
            >
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

      {/* Content */}
      {loading ? (
        <div className="flex items-center justify-center h-32">
          <Loading /> {/* Show loading spinner inside the frame */}
        </div>
      ) : !product ? (
        <div>Product not found.</div>
      ) : (
        <>
          {activeTab === "overview" && (
            <div className="">
              <div className="space-y-2">
                <h2 className="text-lg font-semibold">Overview</h2>
                <p>
                  <strong>Item Name:</strong> {product.productName}
                </p>
                <p>
                  <strong>SKU:</strong> {product.sku}
                </p>
                <p>
                  <strong>SAC:</strong> {product.sac}
                </p>
                <p>
                  <strong>Unit:</strong> {product.unit}
                </p>
                <p>
                  <strong>UPC:</strong> {product.upc}
                </p>
                <p>
                  <strong>EAN:</strong> {product.ean}
                </p>
                <p>
                  <strong>ISBN:</strong> {product.isbn}
                </p>
                <p>
                  <strong>Created Source:</strong> {product.createdSource}
                </p>
              </div>
              <div>
                <h2 className="text-lg font-semibold mb-2">
                  Sales Information
                </h2>
                <p>
                  <strong>Selling Price:</strong> ${product.price}
                </p>
                <p>
                  <strong>Sales Account:</strong> Sales
                </p>
                <p>
                  <strong>Description:</strong> {product.description}
                </p>
              </div>
            </div>
          )}

          {activeTab === "history" && (
            <div className="grid grid-cols-8 gap-6">
              <h2 className="text-lg font-semibold mb-2">History</h2>
              <p>History content goes here...</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default ProductDetails;
