import React, { useContext, useEffect, useState } from "react";
import { FaChevronLeft } from "react-icons/fa";
import InventoryCard from "./InventoryCard";
import { UserContext } from "../components/AuthorizeView.jsx";
import { CiSquarePlus } from "react-icons/ci";
import Loading from "./Loading.jsx";
import NewInventoryModal from "./NewInventoryModal.jsx";

function ManageInventory() {
  const user = useContext(UserContext);
  const [inventories, setInventories] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchInventory() {
      try {
        const response = await fetch("/Inventory/read", {
          method: "GET",
          credentials: "include",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error("Error response:", errorText);
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
    }

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

  const handleDeleteInventory = async (inventoryDetails) => {
    try {
      const response = await fetch(
        `/Inventory/delete?id=${inventoryDetails.invId}`,
        {
          method: "DELETE",
          credentials: "include",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete inventory");
      }

      setInventories((prev) =>
        prev.filter((inv) => inv.inventoryId !== inventoryDetails.invId)
      );
    } catch (error) {
      console.error("Delete inventory error:", error);
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
        <NewInventoryModal />
      </div>
      {inventories.length === 0 ? (
        <div>No inventory available</div>
      ) : (
        inventories.map((item) => (
          <InventoryCard
            key={item.inventoryId}
            invName={item.inventoryName}
            description={item.description}
            invId={item.inventoryId}
            ownerId={item.ownerId}
            Manage={() => console.log(`View details for ${item.inventoryId}`)}
            onEdit={handleEditInventory}
            onDelete={handleDeleteInventory}
          />
        ))
      )}
    </div>
  );
}

export default ManageInventory;
