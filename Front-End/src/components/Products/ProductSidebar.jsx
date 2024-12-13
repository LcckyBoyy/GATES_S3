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
  const [filters, setFilters] = useState(["All Items"]);
  const navigate = useNavigate();

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

        const uniqueCategories = [
          ...new Set(data.map((product) => product.categoryName)),
        ];

        setFilters(["All Items", ...uniqueCategories]);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [InventoryId]);

  const filteredProducts = products.filter((product) => {
    if (selectedFilter === "All Items") return true;
    return product.categoryName === selectedFilter;
  });

  return (
    <div className="w-1/4 bg-white border-r max-md:hidden border-gray-300 rounded-l-lg p-2 shadow-lg">
      <div className="border-b-2 p-2 flex items-center flex-row justify-between">
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center flex-row gap-2 font-bold text-lg max-md:text-sm"
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
      </div>

      <ul className="bg-white custom-scrollbar overflow-y-auto sm:h-96 h-max">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <li
              key={product.productId}
              onClick={() =>
                navigate(`/manage/${InventoryId}/products/${product.productId}`)
              }
              className={`text-blue-500 cursor-pointer border-b-2 py-2 px-4 hover:bg-gray-100 ${
                location.pathname ===
                  `/manage/${InventoryId}/products/${product.productId}` ||
                location.pathname ===
                  `/manage/${InventoryId}/products/${product.productId}/history`
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
