import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  useLocation,
  useParams,
} from "react-router-dom";
import { FiHome, FiTriangle, FiBox, FiSettings } from "react-icons/fi";
import { MdOutlineInventory } from "react-icons/md";
import Navbar from "./Navbar";
import Products from "./Products/Products";
import AddProduct from "./Products/AddProduct";
import Home from "./Dashboard/Home";
import AddCategory from "./Category/AddCategory";
import Categories from "./Category/Categories";
import EditCategory from "./Category/EditCategory";
import Suppliers from "./Supplier/Suppliers";
import AddSupplier from "./Supplier/AddSupplier";
import EditSupplier from "./Supplier/EditSupplier";
import ProductManagement from "./Products/ProductManagement";
import EditProduct from "./Products/EditProduct";
import Stocks from "./Stock/Stocks";
import StockForm from "./Stock/StockForm";
import EditStock from "./Stock/EditStock";
import Settings from "./Dashboard/Settings";

const MainPage = () => {
  const [openDropdown, setOpenDropdown] = useState({});
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { InventoryId } = useParams();

  useEffect(() => {
    setIsSidebarOpen(false);
  }, [location.pathname]);

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
          label: "Suppliers",
          id: "suppliers",
          path: `/manage/${InventoryId}/suppliers`,
        },
      ],
    },
    {
      id: "stock",
      label: "Stock",
      icon: MdOutlineInventory,
      path: `/manage/${InventoryId}/stock`,
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

  const toggleSidebar = (e) => {
    if (e) {
      e.stopPropagation();
    }
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <div className=" top-0 left-0 right-0 z-20 h-24">
        <Navbar onToggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
      </div>

      {/* Main content area */}
      <div className="flex relative">
        {/* Overlay for mobile sidebar */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
            onClick={toggleSidebar}
          />
        )}

        {/* Sidebar */}
        <div
          className={`
            fixed left-0 top-0 bottom-0 z-40 w-[279px] bg-white border-r-2 overflow-y-auto 
            transition-all duration-300 ease-in-out px-4
            lg:static lg:block max-lg:w-60
            ${
              isSidebarOpen
                ? "translate-x-0 shadow-2xl"
                : "-translate-x-full lg:translate-x-0"
            }
          `}
        >
          <div className="w-full h-1 mb-4 border-t-2 max-lg:hidden"></div>
          <div className="w-full h-4 hidden max-lg:block text-[11px] py-8 mb-4 border-b-2 text-gray-700 font-semibold">
            MENU
          </div>
          {menuItems.map((item) => (
            <div key={item.id}>
              {item.subItems ? (
                <>
                  <button
                    onClick={() => toggleDropdown(item.id)}
                    className={`flex flex-row w-full text-left p-2 items-center justify-between  ${
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
                        onClick={() => {
                          navigate(sub.path);
                          toggleSidebar();
                        }}
                        key={sub.id}
                        className={`w-full text-left px-14 py-1 my-[2px] ${
                          location.pathname.startsWith(sub.path)
                            ? "bg-[#E6F2FF] text-[#1565C0] rounded-xl"
                            : "hover:bg-[#E6F2FF] hover:text-[#0D47A1] rounded-xl"
                        }`}
                      >
                        {sub.label}
                      </button>
                    ))}
                  </div>
                </>
              ) : (
                <button
                  onClick={() => {
                    navigate(item.path);
                    toggleSidebar();
                  }}
                  className={`w-full text-left p-2 flex items-center my-[2px] ${
                    location.pathname === `/manage/${InventoryId}` &&
                    item.path === `/manage/${InventoryId}`
                      ? "bg-[#E6F2FF] text-[#1565C0] rounded-xl"
                      : location.pathname === item.path ||
                        location.pathname === item.path + "/new"
                      ? "bg-[#E6F2FF] text-[#1565C0] rounded-xl"
                      : "hover:bg-[#E6F2FF] hover:text-[#0D47A1] rounded-xl"
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
        <div
          className={`
            flex-1 bg-[#fbfbfb] p-6 pb-16 overflow-y-auto h-screen z-10 custom-scrollbar 
            transition-all duration-300 ease-in-out
            lg:ml-0
          `}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/new" element={<AddProduct />} />
            <Route
              path="/products/:Productid/*"
              element={<ProductManagement />}
            />
            <Route path="/products/:Productid/edit" element={<EditProduct />} />

            <Route path="/categories" element={<Categories />} />
            <Route path="/categories/new" element={<AddCategory />} />
            <Route
              path="/categories/:categoryId/edit"
              element={<EditCategory />}
            />
            <Route path="/suppliers" element={<Suppliers />} />
            <Route path="/suppliers/new" element={<AddSupplier />} />
            <Route
              path="/suppliers/:supplierId/edit"
              element={<EditSupplier />}
            />
            <Route path="/stock" element={<Stocks />} />
            <Route path="/stock/new" element={<StockForm />} />
            <Route path="/stock/:movementId/edit" element={<EditStock />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
