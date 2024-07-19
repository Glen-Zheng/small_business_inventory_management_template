import React from "react";

const Sidebar = ({ setActiveView }: any) => {
  return (
    <div className="w-20 sm:w-64 h-screen bg-white shadow-md transition-all duration-300">
      <div className="flex flex-col h-full py-6">
        <h2 className="text-xl font-bold mb-6 px-6 hidden sm:block">
          Admin Panel
        </h2>
        <nav className="flex-grow">
          <button
            onClick={() => setActiveView("orders")}
            className=" w-full  py-3 px-2 sm:px-6 sm:text-left text-gray-700 hover:bg-gray-100 transition duration-300 ease-in-out"
          >
            <i className="fas fa-history text-center sm:mr-2 "></i>
            <span className="hidden sm:inline">Order History</span>
          </button>
          <button
            onClick={() => setActiveView("inventory")}
            className="w-full sm:text-left py-3 px-2 sm:px-6 text-gray-700 hover:bg-gray-100 transition duration-300 ease-in-out"
          >
            <i className="fas fa-boxes-stacked mr-0 sm:mr-2"></i>
            <span className="hidden sm:inline">Edit Inventory</span>
          </button>
          <button
            onClick={() => setActiveView("stores")}
            className="w-full sm:text-left py-3 px-2 sm:px-6 text-gray-700 hover:bg-gray-100 transition duration-300 ease-in-out"
          >
            <i className="fas fa-store mr-0 sm:mr-2"></i>
            <span className="hidden sm:inline">Edit Stores</span>
          </button>
          <button
            onClick={() => setActiveView("finances")}
            className="w-full sm:text-left py-3 px-2 sm:px-6 text-gray-700 hover:bg-gray-100 transition duration-300 ease-in-out"
          >
            <i className="fas fa-chart-line mr-0 sm:mr-2"></i>
            <span className="hidden sm:inline">Finances</span>
          </button>
        </nav>
        <div className="px-6 mt-auto"></div>
      </div>
    </div>
  );
};

export default Sidebar;
