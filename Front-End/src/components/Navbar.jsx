import React, { useState, useRef, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./AuthorizeView";
import { CgProfile } from "react-icons/cg";
import { MdOutlineLogout } from "react-icons/md";
import { FiUser, FiMenu } from "react-icons/fi";

function Navbar({ onToggleSidebar, isSidebarOpen }) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const user = useContext(UserContext);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
        } else {
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
          <a
            href="#"
            className="text-[#1565C0] text-lg font-semibold max-lg:hidden rounded-md"
          >
            Inventory
          </a>
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
