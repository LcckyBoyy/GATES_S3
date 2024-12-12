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

  const productHistory = [
    {
      quantity: 50,
      type: 'Restock',
      status: 'Completed',
      date: '2024-02-15T10:30:00Z'
    },
    {
      quantity: 10,
      type: 'Sale',
      status: 'Completed',
      date: '2024-02-10T14:45:00Z'
    },
    {
      quantity: 20,
      type: 'Adjustment',
      status: 'Pending',
      date: '2024-02-05T09:15:00Z'
    }
  ];

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
            <button
              onClick={() =>
                navigate(`/manage/${InventoryId}/products/${Productid}/edit`)
              }
              className="bg-[#D3D3D3] p-1.5 rounded-md border-2 border-[#c7c7c7]"
            >
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
            <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 border-b-2 border-blue-500 pb-3 mb-4">
              Product Overview
            </h2>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center border-b pb-2">
                  <span className="text-gray-600 font-medium">Item Name</span>
                  <span className="font-semibold text-gray-800">{product.productName}</span>
                </div>
                <div className="flex justify-between items-center border-b pb-2">
                  <span className="text-gray-600 font-medium">SKU</span>
                  <span className="font-semibold text-gray-800">{product.sku}</span>
                </div>
                <div className="flex justify-between items-center border-b pb-2">
                  <span className="text-gray-600 font-medium">Unit of Measure</span>
                  <span className="font-semibold text-gray-800">{product.unitMeasure}</span>
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
                  <span className={`font-semibold ${product.currentStock <= product.minimumStock ? 'text-red-600' : 'text-blue-600'}`}>
                    {product.currentStock}
                  </span>
                </div>
                <div className="flex justify-between items-center border-b pb-2">
                  <span className="text-gray-600 font-medium">Minimum Stock</span>
                  <span className="font-semibold text-gray-800">{product.minimumStock}</span>
                </div>
              </div>
            </div>
          
            <div className="mt-4 bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Description</h3>
              <p className="text-gray-600 italic">{product.description}</p>
            </div>
          </div> 
          )}

          {activeTab === "history" && (
            <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 border-b-2 border-blue-500 pb-3 mb-4">
              Product History
            </h2>
          
            <div className="grid grid-cols-8 gap-4 text-gray-700 font-medium border-b border-gray-200 pb-2">
              <div className="col-span-2">Quantity</div>
              <div className="col-span-2">Type</div>
              <div className="col-span-2">Status</div>
              <div className="col-span-2">Date</div>
            </div>
          
            {productHistory.map((entry, index) => (
              <div 
                key={index} 
                className={`grid grid-cols-8 gap-4 items-center py-3 border-b border-gray-100 
                  ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}
                  hover:bg-blue-50 transition duration-200`}
              >
                <div className="col-span-2 font-semibold">
                  {entry.quantity}
                </div>
                <div className="col-span-2">
                  {entry.type}
                </div>
                <div className="col-span-2">
                  <span className={`
                    px-2 py-1 rounded-full text-xs font-medium
                    ${
                      entry.status === 'Completed' ? 'bg-green-100 text-green-800' :
                      entry.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }
                  `}>
                    {entry.status}
                  </span>
                </div>
                <div className="col-span-2 text-gray-600">
                  {new Date(entry.date).toLocaleDateString()}
                </div>
              </div>
            ))}
          
            {productHistory.length === 0 && (
              <div className="text-center text-gray-500 py-6">
                No history available for this product
              </div>
            )}
          </div>
          )}
        </>
      )}
    </div>
  );
}

export default ProductDetails;
