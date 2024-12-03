import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";
import {
  FiHome,
  FiTriangle,
  FiBox,
  FiUsers,
  FiTruck,
  FiSettings,
} from "react-icons/fi";
import Navbar from "./Navbar";

// Content Components
const ProductsContent = () => (
  <div className="p-6 bg-white rounded-lg shadow-md">
    <h1 className="text-2xl font-bold mb-4">Product Management</h1>
    <p>View and manage your product catalog.</p>
  </div>
);

const CategoriesContent = () => (
  <div className="p-6 bg-white rounded-lg shadow-md">
    <h1 className="text-2xl font-bold mb-4">Product Categories</h1>
    <p>Organize and manage product categories.</p>
  </div>
);

const StockLevelsContent = () => (
  <div className="p-6 bg-white rounded-lg shadow-md">
    <h1 className="text-2xl font-bold mb-4">Stock Levels</h1>
    <p>Monitor and track current inventory stock levels.</p>
  </div>
);

const HomeContent = () => (
  <div className="p-6 bg-white rounded-lg shadow-md">
    <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
    <p>Welcome to your inventory management system dashboard.</p>
  </div>
);

const InventoryContent = () => (
  <div className="p-6 bg-white rounded-lg shadow-md">
    <h1 className="text-2xl font-bold mb-4">Inventory Management</h1>
    <p>View and manage your product inventory here.</p>
  </div>
);

const UsersContent = () => (
  <div className="p-6 bg-white rounded-lg shadow-md">
    <h1 className="text-2xl font-bold mb-4">User Management</h1>
    <p>Manage user accounts and permissions.</p>
  </div>
);

const ShipmentsContent = () => (
  <div className="p-6 bg-white rounded-lg shadow-md">
    <h1 className="text-2xl font-bold mb-4">Shipments</h1>
    <p>Track and manage your shipments.</p>
  </div>
);

const SettingsContent = () => (
  <div className="p-6 bg-white rounded-lg shadow-md">
    <h1 className="text-2xl font-bold mb-4">System Settings</h1>
    <p>Configure your system preferences.</p>
  </div>
);

const Tes = () => {
  const [openDropdown, setOpenDropdown] = useState({});

  const navigate = useNavigate();
  const location = useLocation();

  // Sidebar menu items configuration
  const menuItems = [
    {
      id: "home",
      label: "Home",
      icon: FiHome,
      path: "/tes",
    },
    {
      id: "inventory",
      label: "Inventory",
      icon: FiBox,
      subItems: [
        { label: "Products", id: "products", path: "/tes/inventory/products" },
        {
          label: "Categories",
          id: "categories",
          path: "/tes/inventory/categories",
        },
        { label: "Stock Levels", id: "stock", path: "/tes/inventory/stock" },
      ],
    },
    {
      id: "inventory2",
      label: "Inventory2",
      icon: FiBox,
      subItems: [
        {
          label: "Products2",
          id: "products2",
          path: "/tes/inventory/products",
        },
        {
          label: "Categories2",
          id: "categories2",
          path: "/tes/inventory/categories",
        },
        { label: "Stock Levels2", id: "stock2", path: "/tes/inventory/stock" },
      ],
    },
    { id: "users", label: "Users", icon: FiUsers, path: "/tes/users" },
    {
      id: "shipments",
      label: "Shipments",
      icon: FiTruck,
      path: "/tes/shipments",
    },
    {
      id: "settings",
      label: "Settings",
      icon: FiSettings,
      path: "/tes/settings",
    },
  ];

  const toggleDropdown = (id) => {
    setOpenDropdown((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Navbar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-16">
        <Navbar />
      </div>

      {/* Main content area */}
      <div className="flex pt-16 h-[calc(100vh-4rem)]">
        {/* Sidebar */}
        <div className="fixed left-0 top-16 bottom-0 z-40 w-56 bg-[#DFE8FA]">
          <div>
            {menuItems.map((item) => (
              <div key={item.id}>
                {item.subItems ? (
                  <>
                    <button
                      onClick={() => toggleDropdown(item.id)}
                      className={`flex flex-row w-full text-left px-6 py-2 items-center justify-between ${
                        location.pathname.startsWith(item.path)
                          ? "bg-blue-700 text-white"
                          : ""
                      }`}
                    >
                      <div className="flex items-center">
                        <item.icon className="mr-2" />
                        {item.label}
                      </div>
                      <FiTriangle
                        className={`transform transition-transform duration-300 ${
                          openDropdown[item.id] ? "rotate-180" : "rotate-90"
                        }`}
                      />
                    </button>
                    {openDropdown[item.id] && (
                      <div
                        className={`
                        overflow-hidden transition-all duration-300 ease-in-out 
                        ${
                          openDropdown[item.id]
                            ? "max-h-40"
                            : "max-h-0 opacity-0"
                        }
                      `}
                      >
                        {item.subItems.map((sub) => (
                          <button
                            onClick={() => navigate(sub.path)}
                            key={sub.id}
                            className={`w-full text-left px-10 py-1 ${
                              location.pathname === sub.path
                                ? "bg-[#26487E] text-white rounded-xl"
                                : "hover:bg-gray-200 rounded-xl"
                            }`}
                          >
                            {sub.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <button
                    onClick={() => navigate(item.path)}
                    className={`w-full text-left px-6 py-2 flex items-center ${
                      location.pathname === "/tes" && item.path === "/tes"
                        ? "bg-[#26487E] text-white rounded-b-xl"
                        : location.pathname === item.path
                        ? "bg-[#26487E] text-white rounded-xl"
                        : "hover:bg-gray-200"
                    }`}
                  >
                    <item.icon className="mr-2" />
                    {item.label}
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Main content area */}
        <div className="ml-56 flex-1 bg-gray-50 p-6 overflow-auto">
          <Routes>
            <Route path="/" element={<HomeContent />} />
            <Route path="/inventory/products" element={<ProductsContent />} />
            <Route
              path="/inventory/categories"
              element={<CategoriesContent />}
            />
            <Route path="/inventory/stock" element={<StockLevelsContent />} />
            <Route path="/users" element={<UsersContent />} />
            <Route path="/shipments" element={<ShipmentsContent />} />
            <Route path="/settings" element={<SettingsContent />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Tes;
