import React, { useState } from 'react';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

// Define the type for menu items
const DropDown = ({ 
  title, 
  icon: Icon,  // Pass the icon component as a prop
  items,
  bgColor = "bg-blue-600", // Default background color
  textColor = "text-white", // Default text color
  menuTextColor = "text-blue-600", // Default menu text color
  width = "w-48" // Default width
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={width}>
      <div className="relative">
        {/* Dropdown Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full flex items-center justify-between px-4 py-2 ${bgColor} ${textColor} rounded-md hover:opacity-90 transition-colors`}
        >
          <div className="flex items-center gap-2">
            {Icon && <Icon className="w-5 h-5" />}
            <span>{title}</span>
          </div>
          {isOpen ? (
            <MdKeyboardArrowUp className="w-5 h-5" />
          ) : (
            <MdKeyboardArrowDown className="w-5 h-5" />
          )}
        </button>

        {/* Dropdown Menu */}
        {isOpen && (
          <div className="absolute w-full mt-1 bg-white rounded-md shadow-lg border border-gray-200 z-50">
            <ul className="py-1">
              {items.map((item, index) => (
                <li key={index}>
                  <a
                    href={item.href}
                    onClick={(e) => {
                      if (item.onClick) {
                        e.preventDefault();
                        item.onClick();
                      }
                    }}
                    className={`block px-4 py-2 text-sm ${menuTextColor} hover:bg-gray-100`}
                  >
                    <div className="flex items-center gap-2">
                      {item.icon && <item.icon className="w-4 h-4" />}
                      {item.label}
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default DropDown;