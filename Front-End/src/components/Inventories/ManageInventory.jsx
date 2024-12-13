import React, { useContext, useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import InventoryCard from "./InventoryCard";
import { UserContext } from "../AuthorizeView.jsx";
import Loading from "../Loading.jsx";
import NewInventoryModal from "./NewInventoryModal.jsx";

function ManageInventory() {
  const user = useContext(UserContext);
  const [inventories, setInventories] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(3);

  const fetchInventory = async () => {
    try {
      const response = await fetch("/Inventory", {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `HTTP error! status: ${response.status}, message: ${errorText}`
        );
      }

      const data = await response.json();
      const inventoryList = data.result || data || [];
      setInventories(inventoryList);
      setLoading(false);
    } catch (err) {
      console.error("Fetch Error:", err);
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  const handleEditInventory = async (inventoryDetails) => {
    // try {
    //   // Open a modal or navigate to edit page
    //   // This is a placeholder - you'll need to implement actual edit logic
    //   console.log("Editing inventory:", inventoryDetails);
    //   toast.info(`Preparing to edit ${inventoryDetails.invName}`);
    // } catch (error) {
    //   console.error("Edit inventory error:", error);
    //   toast.error("Failed to edit inventory");
    // }
    console.log("Edit");
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentInventories = inventories.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(inventories.length / itemsPerPage);

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
    <div className="flex justify-center items-center h-screen flex-col bg-slate-200">
    <div className="flex flex-col">
      <a
        className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 "
        href="/"
      >
        <FaChevronLeft size={12} />
        <span>Back</span>
      </a>
      <h2 className="text-lg font-medium flex-col">Hi, {user?.username}!</h2>
      <p className="text-gray-600 mt-4">
        You are a part of the following Inventory, Go to the Inventory which
        you wish to access now
      </p>
      <NewInventoryModal onInventoryCreated={fetchInventory} />
    </div>
    
    {inventories.length === 0 ? (
      <div>No inventory available</div>
    ) : (
      <>
        {currentInventories.map((item) => (
          <InventoryCard
            key={item.inventoryId}
            invName={item.inventoryName}
            description={item.description}
            invId={item.inventoryId}
            ownerId={item.ownerId}
            userId={user?.userId}
            onEdit={handleEditInventory}
            onDelete={fetchInventory}
          />
        ))}

        {/* Pagination Controls */}
        <div className="flex justify-center items-center mt-4 space-x-2">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-4 py-2 border rounded ${
              currentPage === 1 
                ? 'bg-gray-200 cursor-not-allowed' 
                : 'bg-white hover:bg-gray-100'
            }`}
          >
            <FaChevronLeft />
          </button>

          <span className="text-gray-700">
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 border rounded ${
              currentPage === totalPages 
                ? 'bg-gray-200 cursor-not-allowed' 
                : 'bg-white hover:bg-gray-100'
            }`}
          >
            <FaChevronRight />
          </button>
        </div>
      </>
    )}
  </div>
);
}

export default ManageInventory;
