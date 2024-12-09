import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IoIosClose } from "react-icons/io";
import Loading from "../Loading";
import { MdOutlineEdit } from "react-icons/md";
import ProductSidebar from "./ProductSidebar";

function ProductDetails() {
  const { Productid, InventoryId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    const mockProducts = [
      {
        id: "1",
        name: "Laptop",
        category: "Electronics",
        price: 999.99,
        stock: 50,
        sku: "ELEC-001",
        description: "A high-end laptop with top-notch features.",
        image: "/api/placeholder/50/50",
      },
      {
        id: "2",
        name: "Wireless Mouse",
        category: "Electronics",
        price: 49.99,
        stock: 100,
        sku: "ELEC-002",
        description: "A compact and reliable wireless mouse.",
        image: "/api/placeholder/50/50",
      },
      {
        id: "3",
        name: "Ergonomic Chair",
        category: "Furniture",
        price: 299.99,
        stock: 25,
        sku: "FURN-001",
        description: "An ergonomic office chair for comfortable working.",
        image: "/api/placeholder/50/50",
      },
    ];

    const fetchProduct = () => {
      setLoading(true);

      setTimeout(() => {
        const foundProduct = mockProducts.find((p) => p.id === Productid);
        if (foundProduct) {
          setProduct(foundProduct);
        } else {
          setProduct(null);
        }
        setLoading(false);
      }, 300);
    };

    fetchProduct();
  }, [Productid]);

  if (loading) {
    return <Loading />;
  }

  if (!product) {
    return <div>Product not found.</div>;
  }

  return (
    <div className="flex mb-16">
      {/* Sidebar */}
      <ProductSidebar />
      {/* Main Content */}
      <div className="w-3/4 p-6 bg-white rounded-r-xl shadow-lg">
        {/* Header */}
        <div className="flex flex-row items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">{product.name}</h1>
          <div className="flex flex-row items-center">
            <div className="relative group inline-block">
              <button className="bg-[#D3D3D3] p-1.5 rounded-md border-2 border-[#c7c7c7]">
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

        {/* Tabs */}
        <div className="border-b border-gray-300 mb-4">
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

        {/* Content */}
        {activeTab === "overview" && (
          <>
            <div className="grid grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-2">
                <h2 className="text-lg font-semibold">Overview</h2>
                <p>
                  <strong>Item Type:</strong> Sales Items
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

              {/* Right Column */}
              <div className="space-y-2 border border-dashed border-gray-300 p-4 text-center rounded">
                <p className="text-gray-400">Drag image(s) here or</p>
                <button className="px-4 py-2 bg-blue-500 text-white rounded">
                  Browse Images
                </button>
                <p className="text-sm text-gray-400">
                  You can add up to 15 images, each not exceeding 5 MB.
                </p>
              </div>
            </div>
            <div className="mt-6">
              <h2 className="text-lg font-semibold mb-2">Sales Information</h2>
              <p>
                <strong>Selling Price:</strong> ${product.price.toFixed(2)}
              </p>
              <p>
                <strong>Sales Account:</strong> Sales
              </p>
              <p>
                <strong>Description:</strong> {product.description}
              </p>
            </div>
          </>
        )}

        {activeTab === "history" && (
          <div>
            <h2 className="text-lg font-semibold mb-2">History</h2>
            <p>History content goes here...</p>
          </div>
        )}
      </div>
    </div>
  );
}
export default ProductDetails;
