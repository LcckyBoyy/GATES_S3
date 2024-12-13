import React, { useEffect, useState, useRef } from "react";
import cuid from "cuid";
import { FiSave } from "react-icons/fi";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../Loading";

const MySwal = withReactContent(Swal);

function StockForm() {
  const navigate = useNavigate();
  const { InventoryId } = useParams();
  const dropdownRef = useRef(null);

  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [noProductFound, setNoProductFound] = useState(false);
  const [stockData, setStockData] = useState({
    productId: "",
    movementType: "",
    quantity: "",
    referenceNo: "",
    movementDate: "",
    notes: "",
    status: "",
  });

  const fetchProducts = async (searchTerm) => {
    try {
      setLoading(true);
      setNoProductFound(false);

      const response = await fetch(
        `/Product/read?inventoryId=${InventoryId}&productName=${searchTerm}`,
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
        throw new Error(
          `HTTP error! status: ${response.status}, message: ${errorText}`
        );
      }

      const data = await response.json();

      if (data.message === "You don't have access for this inventory") {
        window.location.href = "/no-access";
        return;
      }

      if (data.length === 0) {
        setNoProductFound(true);
      }

      setProducts(data);
      setIsSearching(true);
    } catch (err) {
      console.error("Fetch Error:", err);
      setProducts([]);
      setNoProductFound(true);
      setIsSearching(false);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "searchInput") {
      if (
        value === "" ||
        (stockData.productId && value.length < searchInput.length)
      ) {
        setSearchInput("");
        setStockData((prev) => ({ ...prev, productId: "" }));
        setProducts([]);
        setIsSearching(false);
        setNoProductFound(false);
      } else if (!stockData.productId) {
        setSearchInput(value);
        if (value.trim()) {
          fetchProducts(value);
        } else {
          setProducts([]);
          setIsSearching(false);
          setNoProductFound(false);
        }
      }
    } else {
      setStockData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleProductSelect = (product) => {
    setStockData((prev) => ({
      ...prev,
      productId: product.productId,
    }));
    setSearchInput(product.productName);
    setIsSearching(false);
    setProducts([]);
    setNoProductFound(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        if (products.length > 0 && !stockData.productId) {
          setSearchInput("");
        }
        setIsSearching(false);
        setProducts([]);
        setNoProductFound(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [products, stockData.productId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const stockToSubmit = {
        movementId: cuid(),
        ...stockData,
      };

      const response = await fetch("/api/StockMovement/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(stockToSubmit),
      });

      if (!response.ok) {
        throw new Error("Failed to create stock movement");
      }

      const data = await response.json();

      if (data.result == true) {
        MySwal.fire({
          title: "Success!",
          text: "Stock movement created successfully.",
          icon: "success",
          confirmButtonColor: "#3085d6",
        }).then(() => {
          navigate(`/manage/${InventoryId}/stock`);
        });
      }

      if (data.result == false) {
        MySwal.fire({
          title: "Error!",
          text:
            data.message ||
            "An error occurred while creating the stock movement.",
          icon: "error",
          confirmButtonColor: "#d33",
        });
      }
    } catch (error) {
      console.error("Error adding stock:", error);
      MySwal.fire({
        title: "Error!",
        text:
          error.message ||
          "An error occurred while creating the stock movement.",
        icon: "error",
        confirmButtonColor: "#d33",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-16">
      <h1 className="text-xl font-semibold mb-6 text-black border-b-2">Stock Management</h1>
      <form onSubmit={handleSubmit}>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="mb-2">
            <div className="mb-2 relative" ref={dropdownRef}>
              <label className="block text-gray-700 font-bold mb-2">
                Product {stockData.productId}
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="searchInput"
                  value={searchInput}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Search for a product"
                  autocomplete="off"
                />
                {stockData.productId && (
                  <button
                    type="button"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    onClick={() => {
                      setSearchInput("");
                      setStockData((prev) => ({ ...prev, productId: "" }));
                      setProducts([]);
                      setIsSearching(false);
                      setNoProductFound(false);
                    }}
                  >
                    ×
                  </button>
                )}
              </div>
              {loading && (
                <div className="absolute z-10 w-full border rounded-md mt-1 p-2 bg-white text-center">
                  Loading...
                </div>
              )}
              {noProductFound && !loading && (
                <div className="absolute z-10 w-full border rounded-md mt-1 p-2 bg-white text-center text-red-500">
                  Product not found
                </div>
              )}
              {isSearching && products.length > 0 && (
                <ul
                  className="absolute z-10 w-full border rounded-md mt-1 max-h-40 overflow-auto 
                       bg-white shadow-lg"
                >
                  {products.map((product) => (
                    <li
                      key={product.productId}
                      onClick={() => handleProductSelect(product)}
                      className="px-3 py-2 cursor-pointer hover:bg-gray-100 
                         first:rounded-t-md last:rounded-b-md"
                    >
                      {product.productName}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="mb-2">
              <label className="block text-gray-700 font-bold mb-2">
                Movement Type
              </label>
              <select
                name="movementType"
                value={stockData.movementType}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md"
                required
              >
                <option value="">Select Movement Type</option>
                <option value="IN">IN</option>
                <option value="OUT">OUT</option>
              </select>
            </div>
            <div className="mb-2">
              <label className="block text-gray-700 font-bold mb-2">
                Quantity
              </label>
              <input
                type="number"
                name="quantity"
                value={stockData.quantity}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>
          </div>
          <div>
            <div className="mb-2">
              <label className="block text-gray-700 font-bold mb-2">
                Reference No
              </label>
              <input
                type="text"
                name="referenceNo"
                value={stockData.referenceNo}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md"
                placeholder="Enter reference number"
              />
            </div>
            <div className="mb-2">
              <label className="block text-gray-700 font-bold mb-2">
                Movement Date
              </label>
              <input
                type="date"
                name="movementDate"
                value={stockData.movementDate}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div className="mb-2">
              <label className="block text-gray-700 font-bold mb-2">
                Notes
              </label>
              <textarea
                name="notes"
                value={stockData.notes}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md"
                rows="4"
              ></textarea>
            </div>
            <div className="mb-2">
              <label className="block text-gray-700 font-bold mb-2">
                Status
              </label>
              <select
                name="status"
                value={stockData.status}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md"
              >
                <option value="">Select Status</option>
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate(`/manage/${InventoryId}/stock`)}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            type="submit"
            className={`group relative items-center flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md ${
              isLoading
                ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                : "text-white bg-blue-600 hover:bg-blue-700"
            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out`}
            disabled={isLoading}
          >
            {isLoading ? (
              <>Loading...</>
            ) : (
              <>
                <FiSave className="mr-2" /> Save Stock Movement
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default StockForm;
