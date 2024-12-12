import React, { useEffect, useState } from "react";
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
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [stockData, setStockData] = useState({
    productId: "",
    movementType: "",
    quantity: "",
    referenceNo: "",
    movementDate: "",
    notes: "",
    status: "",
  });

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

  useEffect(() => {
    const handleSearch = () => {
      if (!searchInput.trim()) {
        setSearchResults([]);
        return;
      }

      const filtered = products.filter((product) =>
        product.productName.toLowerCase().includes(searchInput.toLowerCase())
      );

      if (
        filtered.length === 1 &&
        filtered[0].productName.toLowerCase() === searchInput.toLowerCase()
      ) {
        setSearchResults([]);
      } else {
        setSearchResults(filtered);
      }
    };

    const debounceTimer = setTimeout(handleSearch, 300);
    return () => clearTimeout(debounceTimer);
  }, [searchInput, products]);

  const handleInputChange = (e) => {
    setSearchInput(e.target.value);
    setIsSearching(true);
    const { name, value } = e.target;
    setStockData((prev) => ({ ...prev, [name]: value }));
  };

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
      MySwal.fire({
        title: "Success!",
        text: "Stock movement created successfully.",
        icon: "success",
        confirmButtonColor: "#3085d6",
      }).then(() => {
        navigate("/manage/stocks");
      });
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

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-16">
      <h1 className="text-2xl font-bold mb-4">Add New Stock Movement</h1>
      <form onSubmit={handleSubmit}>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <div className="mb-2">
              <label className="block text-gray-700 font-bold mb-2">
                Product
              </label>
              <input
                type="text"
                value={searchInput}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md"
                placeholder="Search for a product"
              />
              {isLoading && (
                <p className="text-sm text-gray-500">Loading products...</p>
              )}
              {isSearching && searchResults.length > 0 && (
                <ul className="border rounded-md mt-2 max-h-40 overflow-auto">
                  {searchResults.map((product) => (
                    <li
                      key={product.productId}
                      onClick={() => {
                        setIsSearching(false); 
                        setStockData((prev) => ({
                          ...prev,
                          productId: product.productId,
                        }));
                        console.log(stockData.productId);
                        setSearchInput(product.productName); 
                      }}
                      className="px-3 py-2 cursor-pointer hover:bg-gray-100"
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
              <input
                type="text"
                name="movementType"
                value={stockData.movementType}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md"
                placeholder="Enter movement type"
                required
              />
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
