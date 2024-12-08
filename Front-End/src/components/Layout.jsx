import React from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  return (
    <div className="h-screen flex flex-col">
      <div className="fixed top-0 left-0 right-0 z-50 h-16">
        <Navbar />
      </div>

      <div className="flex pt-16 h-[calc(100vh-4rem)]">
        <div className="fixed left-0 top-16 bottom-0 z-40">
          <Sidebar />
        </div>

        <div className="ml-56 flex-1 bg-gray-50 p-6 overflow-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
