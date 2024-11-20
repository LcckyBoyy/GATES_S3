import { useState } from "react";
import { FiHome, FiTriangle } from "react-icons/fi";

const Sidebar = () => {
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (id) => {
    setOpenDropdown(openDropdown === id ? null : id);
  };
  return (
    <div className="flex h-screen w-56 bg-[#DFE8FA] flex-col">
      <div className="flex flex-row "></div>
      <div>
        <button className="w-full text-left text-white bg-[#26487E] p-4 rounded-b-xl flex flex-row items-center">
          <FiHome className="mx-2" />
          Home
        </button>
      </div>
      <div>
        <button
          className="flex flex-row w-full text-left px-6 py-2 items-center justify-between"
          onClick={() => toggleDropdown(1)}
        >
          Dropdown 1
          <FiTriangle
            className={`transform transition-transform duration-300 ${
              openDropdown === 1 ? "rotate-180" : "rotate-90"
            }`}
          />
        </button>
        <div
          className={`
          overflow-hidden transition-all duration-300 ease-in-out
          ${openDropdown === 1 ? "max-h-40" : "max-h-0 opacity-0"}
        `}
        >
          <div className="bg-[#DFE8FA] ml-10 py-2">
            <p className="px-4 py-1">Item 1.1</p>
            <p className="px-4 py-1">Item 1.2</p>
            <p className="px-4 py-1">Item 1.3</p>
          </div>
        </div>
      </div>
      <div>
        <button
          className="flex flex-row w-full text-left px-6 py-2 items-center justify-between"
          onClick={() => toggleDropdown(2)}
        >
          Dropdown 2
          <FiTriangle
            className={`transform transition-transform duration-300 ${
              openDropdown === 2 ? "rotate-180" : "rotate-90"
            }`}
          />
        </button>
        <div
          className={`
          overflow-hidden transition-all duration-300 ease-in-out
          ${openDropdown === 2 ? "max-h-40" : "max-h-0 opacity-0"}
        `}
        >
          <div className="bg-[#DFE8FA] ml-10 py-2">
            <p className="px-4 py-1">Item 2.1</p>
            <p className="px-4 py-1">Item 2.2</p>
            <p className="px-4 py-1">Item 2.3</p>
          </div>
        </div>
      </div>
      <div>
        <button
          className="flex flex-row w-full text-left px-6 py-2 items-center justify-between"
          onClick={() => toggleDropdown(3)}
        >
          Dropdown 3
          <FiTriangle
            className={`transform transition-transform duration-300 ${
              openDropdown === 3 ? "rotate-180" : "rotate-90"
            }`}
          />
        </button>
        <div
          className={`
          overflow-hidden transition-all duration-300 ease-in-out
          ${openDropdown === 3 ? "max-h-40" : "max-h-0 opacity-0"}
        `}
        >
          <div className="bg-[#DFE8FA] ml-10 py-2">
            <p className="px-4 py-1">Item 3.1</p>
            <p className="px-4 py-1">Item 3.2</p>
            <p className="px-4 py-1">Item 3.3</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
