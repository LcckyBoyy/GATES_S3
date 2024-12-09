import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  useLocation,
  useParams,
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
import Products from "./Products/Products";
import AddProduct from "./Products/AddProduct";
import ProductDetails from "./Products/ProductDetails";
import Home from "../components/Dashboard/Home";
import AddCategory from "./Category/AddCategory";
import Categories from "./Category/Categories";
import EditCategory from "./Category/EditCategory";


const StockLevelsContent = () => (
  <div className="p-6 bg-white rounded-lg shadow-md">
    <h1 className="text-2xl font-bold mb-4">Stock Levels</h1>
    <p>Monitor and track current inventory stock levels.</p>
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
  const { InventoryId } = useParams();

  // Sidebar menu items configuration
  const menuItems = [
    {
      id: "home",
      label: "Home",
      icon: FiHome,
      path: `/manage/${InventoryId}`,
    },
    {
      id: "inventory",
      label: "Inventory",
      icon: FiBox,
      subItems: [
        {
          label: "Products",
          id: "products",
          path: `/manage/${InventoryId}/products`,
        },
        {
          label: "Categories",
          id: "categories",
          path: `/manage/${InventoryId}/categories`,
        },
        {
          label: "Stock Levels",
          id: "stock",
          path: `/manage/${InventoryId}/stock`,
        },
      ],
    },

    {
      id: "users",
      label: "Users",
      icon: FiUsers,
      path: `/manage/${InventoryId}/users`,
    },
    {
      id: "shipments",
      label: "Shipments",
      icon: FiTruck,
      path: `/manage/${InventoryId}/shipments`,
    },
    {
      id: "settings",
      label: "Settings",
      icon: FiSettings,
      path: `/manage/${InventoryId}/settings`,
    },
  ];

  const toggleDropdown = (id) => {
    setOpenDropdown((prev) => (prev === id ? null : id));
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      {/* Navbar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-16 ">
        <Navbar />
      </div>

      {/* Main content area */}
      <div className="flex pt-16 h-[calc(100vh-4rem)] z-0">
        {/* Sidebar */}
        <div className="fixed left-0 top-16 bottom-0 z-20 w-56 bg-[#DFE8FA] overflow-y-auto">
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
                        openDropdown === item.id ? "rotate-180" : "rotate-90"
                      }`}
                    />
                  </button>
                  <div
                    className={`
                        overflow-hidden transition-all duration-300 ease-in-out 
                        ${
                          openDropdown === item.id
                            ? "max-h-40 opacity-100"
                            : "max-h-0 opacity-0"
                        }
                      `}
                  >
                    {item.subItems.map((sub) => (
                      <button
                        onClick={() => navigate(sub.path)}
                        key={sub.id}
                        className={`w-full text-left px-14 py-1 ${
                          location.pathname.startsWith(sub.path)
                            ? "bg-[#26487E] text-white rounded-xl"
                            : "hover:bg-gray-200 rounded-xl"
                        }`}
                      >
                        {sub.label}
                      </button>
                    ))}
                  </div>
                </>
              ) : (
                <button
                  onClick={() => navigate(item.path)}
                  className={`w-full text-left px-6 py-2 flex items-center ${
                    location.pathname === `/manage/${InventoryId}` &&
                    item.path === `/manage/${InventoryId}`
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

        {/* Main content area */}
        <div className="ml-56 flex-1 bg-gray-50 p-6 overflow-y-auto h-screen z-10 custom-scrollbar ">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/new" element={<AddProduct />} />
            <Route path="/products/:Productid" element={<ProductDetails />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/categories/new" element={<AddCategory />} />
            <Route path="/categories/:categoryId" element={<EditCategory />} />
            <Route path="/stock" element={<StockLevelsContent />} />
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
