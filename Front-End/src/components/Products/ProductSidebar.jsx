import React, { useEffect, useState } from "react";
import { FaChevronRight } from "react-icons/fa";
import { GoPlus } from "react-icons/go";
import { useLocation, useNavigate, useParams } from "react-router-dom";

function ProductSidebar() {
  const { InventoryId } = useParams();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation();
  const [selectedFilter, setSelectedFilter] = useState("All Items");
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const filters = [
    "All Items",
    "Active",
    "Inactive",
    "Work",
    "Personal",
    "Shopping",
    "Urgent",
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `/Product/read?inventoryId=${InventoryId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data); 
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [InventoryId]);

  return (
    <div className="w-1/4 bg-white border-r border-gray-300 rounded-l-lg p-2 shadow-lg ">
      <div className="border-b-2 p-4 flex items-center flex-row justify-between">
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center flex-row gap-2 font-bold text-lg"
          >
            {selectedFilter}
            <FaChevronRight
              className={`transition-transform duration-300 ease-in-out ${
                isDropdownOpen ? "rotate-90" : "rotate-0"
              }`}
            />
          </button>

          {isDropdownOpen && (
            <ul className="absolute z-10 top-full left-0 mt-2 bg-white border rounded-md shadow-lg">
              {filters.map((filter) => (
                <li
                  key={filter}
                  onClick={() => {
                    setSelectedFilter(filter);
                    setIsDropdownOpen(false);
                  }}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  {filter}
                </li>
              ))}
            </ul>
          )}
        </div>

        <button
          onClick={() => navigate(`/manage/${InventoryId}/products/new`)}
          className="px-2 py-1 bg-blue-500 text-white rounded flex items-center flex-row gap-1"
        >
          <GoPlus size={20} />
          New
        </button>
      </div>

      <ul className="bg-white custom-scrollbar overflow-y-auto">
        {products.length > 0 ? (
          products.map((product) => (
            <li
              key={product.productId}
              onClick={() =>
                navigate(`/manage/${InventoryId}/products/${product.productId}`)
              }
              className={`text-blue-500 cursor-pointer border-b-2 py-2 px-4 hover:bg-gray-100 ${
                location.pathname ===
                `/manage/${InventoryId}/products/${product.productId}`
                  ? "bg-gray-200"
                  : ""
              }`}
            >
              {product.productName}
            </li>
          ))
        ) : (
          <li className="text-gray-500 py-2">No products found.</li>
        )}
      </ul>
    </div>
  );
}

export default ProductSidebar; 
