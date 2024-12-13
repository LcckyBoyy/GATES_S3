import React, { useEffect, useState, useRef } from "react";
import { FiSave } from "react-icons/fi";
import Swal from "sweetalert2";
import { FaRegTrashAlt } from "react-icons/fa";
import withReactContent from "sweetalert2-react-content";
import { useNavigate, useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";

const MySwal = withReactContent(Swal);

function EditStock() {
  const navigate = useNavigate();
  const { InventoryId, movementId } = useParams();
  const dropdownRef = useRef(null);
  const searchTimeoutRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [noProductFound, setNoProductFound] = useState(false);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const [stockData, setStockData] = useState({
    movementId: movementId,
    productId: "",
    movementType: "",
    quantity: "",
    referenceNo: "",
    movementDate: "",
    notes: "",
    status: "",
  });

  const fetchStockData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `/StockMovement/get?productId=${queryParams.get(
          "product"
        )}&movementId=${movementId}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch stock data");
      }
      const data = await response.json();
      setStockData({
        movementId: data.movementId || movementId,
        productId: data.result.productId || "",
        movementType: data.result.movementType || "",
        quantity: data.result.quantity || "",
        referenceNo: data.result.referenceNo || "",
        movementDate: data.result.movementDate || "",
        notes: data.result.notes || "",
        status: data.result.status || "",
      });
      setSearchInput("Current Product (Click × to change)");
    } catch (error) {
      console.error("Error fetching stock data:", error);
      MySwal.fire({
        title: "Error!",
        text: error.message || "An error occurred while fetching stock data.",
        icon: "error",
        confirmButtonColor: "#d33",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fetchProducts = async (searchTerm) => {
    try {
      setLoading(true);
      setNoProductFound(false);
      const response = await fetch(
        `/Product?inventoryId=${InventoryId}&productName=${searchTerm}`,
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
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
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
          if (searchTimeoutRef.current) {
            clearTimeout(searchTimeoutRef.current);
          }
          searchTimeoutRef.current = setTimeout(() => {
            fetchProducts(value);
          }, 500);
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
  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, []);
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

  const handleProductSelect = (product) => {
    setStockData((prev) => ({ ...prev, productId: product.productId }));
    setSearchInput(product.productName);
    setIsSearching(false);
    setProducts([]);
    setNoProductFound(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch(`/StockMovement`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(stockData),
      });
      if (!response.ok) {
        throw new Error("Failed to update stock movement");
      }
      MySwal.fire({
        title: "Success!",
        text: "Stock movement updated successfully.",
        icon: "success",
        confirmButtonColor: "#3085d6",
      }).then(() => navigate(`/manage/${InventoryId}/stock`));
    } catch (error) {
      console.error("Error updating stock:", error);
      MySwal.fire({
        title: "Error!",
        text:
          error.message ||
          "An error occurred while updating the stock movement.",
        icon: "error",
        confirmButtonColor: "#d33",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStockData();
  }, []);
  const handleDelete = async () => {
    const result = await MySwal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      setIsLoading(true);

      try {
        const response = await fetch(
          `/StockMovement?movementId=${movementId}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to delete category");
        }

        console.log("Category Deleted");

        MySwal.fire({
          title: "Deleted!",
          text: "The Stock has been deleted successfully.",
          icon: "success",
          confirmButtonColor: "#3085d6",
        }).then(() => {
          navigate(`/manage/${InventoryId}/stock`);
        });
      } catch (error) {
        console.error("Error:", error);

        MySwal.fire({
          title: "Error!",
          text: error.message || "An error occurred while deleting the Stock.",
          icon: "error",
          confirmButtonColor: "#d33",
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-16">
      <h1 className="text-2xl font-bold mb-4">Edit Stock Movement</h1>
      <form onSubmit={handleSubmit}>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="mb-2">
            <div className="mb-2 relative" ref={dropdownRef}>
              <label className="block text-gray-700 font-bold mb-2">
                Product Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="searchInput"
                  value={searchInput}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Search for a product"
                  autoComplete="off"
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
                  <span className="flex justify-center">
                    <span className="animate-pulse">Loading</span>
                    <span className="animate-bounce ml-1 inline-block font-bold">
                      . . .
                    </span>
                  </span>{" "}
                </div>
              )}
              {noProductFound && !loading && (
                <div className="absolute z-10 w-full border rounded-md mt-1 p-2 bg-white text-center text-red-500">
                  Product not found
                </div>
              )}
              {isSearching && products.length > 0 && (
                <ul className="absolute z-10 w-full border rounded-md mt-1 max-h-40 overflow-auto bg-white shadow-lg">
                  {products.map((product) => (
                    <li
                      key={product.productId}
                      onClick={() => handleProductSelect(product)}
                      className="px-3 py-2 cursor-pointer hover:bg-gray-100 first:rounded-t-md last:rounded-b-md"
                    >
                      {product.productName}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="mb-2">
              <label className="block text-gray-700 font-bold mb-2">
                {" "}
                Movement Type{" "}
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
                {" "}
                Quantity{" "}
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
                {" "}
                Reference No{" "}
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
                {" "}
                Movement Date{" "}
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
                {" "}
                Notes{" "}
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
                {" "}
                Status{" "}
              </label>
              <select
                name="status"
                value={stockData.status}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md"
              >
                <option value="">Select Status</option>
                <option value="Completed">Completed</option>
                <option value="Pending">Pending</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex justify-between space-x-4">
          <button
            type="button"
            onClick={handleDelete}
            className={`flex items-center justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md ${
              isLoading
                ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                : "bg-red-500 hover:bg-red-600 text-white font-bold"
            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-150 ease-in-out`}
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex">
                <span className="animate-pulse">Loading</span>
                <span className="animate-bounce ml-1 inline-block font-bold">
                  . . .
                </span>
              </span>
            ) : (
              <>
                <FaRegTrashAlt size={20} className="mr-2" />
                Delete
              </>
            )}
          </button>
          <div className="flex items-center flex-row gap-4">
            <button
              type="button"
              onClick={() => navigate(`/manage/${InventoryId}/products/${queryParams.get("product")}/history`)}
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
                <span className="flex">
                  <span className="animate-pulse">Loading</span>
                  <span className="animate-bounce ml-1 inline-block font-bold">
                    . . .
                  </span>
                </span>
              ) : (
                <>
                  <FiSave className="mr-2" /> Save Stock
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default EditStock;
