import React, { useState, useRef, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "./AuthorizeView";
import { CgProfile } from "react-icons/cg";
import { MdOutlineLogout } from "react-icons/md";
import {  FiMenu, FiChevronRight } from "react-icons/fi";
import Swal from "sweetalert2";

function Navbar({ onToggleSidebar, isSidebarOpen }) {
  const { InventoryId } = useParams();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isInventoryDropdownOpen, setIsInventoryDropdownOpen] = useState(false);
  const [inventoryName, setInventoryName] = useState("");
  const [inventories, setInventories] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const dropdownRef = useRef(null);
  const inventoryDropdownRef = useRef(null);
  const navigate = useNavigate();
  const user = useContext(UserContext);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
      if (
        inventoryDropdownRef.current &&
        !inventoryDropdownRef.current.contains(event.target)
      ) {
        setIsInventoryDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Fetch inventories and current inventory details
  useEffect(() => {
    const fetchInventoryDetails = async () => {
      try {
        // Fetch current inventory details
        const currentInventoryResponse = await fetch(
          `/Inventory/get?inventoryId=${InventoryId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        // Fetch all inventories
        const inventoriesResponse = await fetch(`/Inventory`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!currentInventoryResponse.ok || !inventoriesResponse.ok) {
          throw new Error("Failed to fetch inventory details");
        }

        const currentInventoryData = await currentInventoryResponse.json();
        const inventoriesData = await inventoriesResponse.json();

        if (currentInventoryData.result) {
          setInventoryName(currentInventoryData.result.inventoryName);
        }

        if (inventoriesData) {
          setInventories(inventoriesData);
        }
      } catch (err) {
        setError(err.message);
        Swal.fire({
          title: "Error!",
          text: "Failed to fetch inventory details",
          icon: "error",
          confirmButtonColor: "#d33",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchInventoryDetails();
  }, [InventoryId]);

  const handleInventorySelect = (selectedInventory) => {
    if (selectedInventory.inventoryId === InventoryId) {
      setIsInventoryDropdownOpen(false);
      return;
    }
    Swal.fire({
      title: "Change Inventory?",
      text: `Are you sure you want to switch to ${selectedInventory.inventoryName}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, switch inventory!",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate(`/manage/${selectedInventory.inventoryId}`);
        Swal.fire({
          title: "Switched!",
          text: `You are now in ${selectedInventory.inventoryName}`,
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
      }

      setIsInventoryDropdownOpen(false);
    });
  };

  const handleLogout = (e) => {
    e.preventDefault();
    fetch("/user/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: "",
    })
      .then((data) => {
        if (data.ok) {
          navigate("/login");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="h-full bg-[#fbfbfb] flex items-center max-lg:border-b-2">
      <div className="flex items-center w-full">
        <div className="w-[279px] h-[5rem] flex items-center justify-center bg-white border-r-2 max-lg:border-r-0 max-lg:bg-[#fbfbfb] max-lg:w-auto transition-all duration-300 ease-in-out border-b-2">
          <div className="flex items-center">
            <a
              href="#"
              className="text-[#1565C0] text-lg font-semibold max-lg:hidden rounded-md"
            >
              {inventoryName}
            </a>

            <div ref={inventoryDropdownRef} className="relative ml-2">
              <button
                onClick={() =>
                  setIsInventoryDropdownOpen(!isInventoryDropdownOpen)
                }
                className="text-[#1565C0] hover:bg-blue-50 p-1 rounded-full transition-all duration-300"
              >
                <FiChevronRight
                  size={24}
                  className={`transition-transform duration-300 ${
                    isInventoryDropdownOpen ? "rotate-90" : "rotate-0"
                  }`}
                />
              </button>

              {isInventoryDropdownOpen && (
                <div className="absolute left-0 mt-2 w-64 bg-white rounded-lg shadow-lg py-1 z-50 border">
                  {inventories.map((inventory) => (
                    <button
                      key={inventory.inventoryId}
                      onClick={() => handleInventorySelect(inventory)}
                      className={`w-full text-left px-4 py-2 hover:bg-gray-100 
                        ${
                          inventory.inventoryId === InventoryId
                            ? "bg-blue-100 text-blue-800"
                            : "text-gray-800"
                        }`}
                    >
                      {inventory.inventoryName}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex-1 flex ml-6 mr-8 py-4 justify-between items-center border-b-2 max-lg:border-0">
          <div className="flex items-center ml-2">
            <button
              className="lg:hidden text-gray-500"
              onClick={onToggleSidebar}
            >
              <FiMenu size={24} />
            </button>
          </div>
          <div className="flex text-gray-500 items-center gap-6 max-lg:gap-4">
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="hover:bg-[#dedddd] hover:text-gray-400 p-1 rounded-full transition-colors duration-200"
              >
                <CgProfile size={36} />
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 w-48 bg-white rounded-lg shadow-lg py-1 z-30">
                  <div className="px-4 py-3 border-b border-gray-200">
                    <p className="text-sm font-medium text-gray-900">
                      {user?.username}
                    </p>
                    <p className="text-sm text-gray-500">{user?.email}</p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100 cursor-pointer"
                  >
                    <MdOutlineLogout className="mr-2" size={16} />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
