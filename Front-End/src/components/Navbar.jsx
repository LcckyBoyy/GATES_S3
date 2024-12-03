import React, { useState, useRef, useEffect, useContext  } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from './AuthorizeView';
import { IoIosSearch, IoIosNotificationsOutline } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { CiSettings } from "react-icons/ci";
import { MdOutlineAddBox, MdOutlineLogout } from "react-icons/md";
import { FiUser } from "react-icons/fi";

function Navbar() {
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
    <div className="h-full bg-[#26487E] flex items-center">
      <div className="w-56 h-full flex items-center justify-center bg-[#223658]">
        <span className="text-white text-xl font-bold">Inventory</span>
      </div>

      <div className="flex-1 flex justify-between px-6 items-center">
        <div className="relative text-gray-600">
          <input
            className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-3xl text-sm focus:outline-none"
            name="search"
            placeholder="Search"
          />
          <button type="submit" className="absolute right-0 top-0 mr-3 mt-2">
            <IoIosSearch size={24} />
          </button>
        </div>
        <div className="flex flex-row-reverse text-white items-center gap-6">
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="hover:bg-[#1a325a] p-1 rounded-full transition-colors duration-200"
            >
              <CgProfile size={36} />
            </button>

            {isProfileOpen && (
              <div className="absolute right-0 w-48 bg-white rounded-lg shadow-lg py-1 z-50">
              <div className="px-4 py-3 border-b border-gray-200">
                <p className="text-sm font-medium text-gray-900">{user?.username}</p>
                <p className="text-sm text-gray-500">{user?.email}</p>
              </div>

                <a
                  href="/profile"
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                >
                  <FiUser className="mr-2" size={16} />
                  Profile
                </a>

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

          <CiSettings
            size={32}
            className="hover:bg-[#1a325a] p-1 rounded-full transition-colors duration-200"
          />
          <IoIosNotificationsOutline
            size={28}
            className="hover:bg-[#1a325a] p-1 rounded-full transition-colors duration-200"
          />
          <MdOutlineAddBox
            size={28}
            className="hover:bg-[#1a325a] p-1 rounded-full transition-colors duration-200"
          />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
