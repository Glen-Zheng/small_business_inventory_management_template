import React from "react";

const Sidebar = ({ setActiveView }: any) => {
  return (
    <div className="w-64 h-screen bg-white shadow-md">
      <div className="flex flex-col h-full py-6">
        <h2 className="text-xl font-bold mb-6 px-6">Admin Panel</h2>
        <nav className="flex-grow">
          <button
            onClick={() => setActiveView("orders")}
            className="w-full text-left py-3 px-6 text-gray-700 hover:bg-gray-100 transition duration-300 ease-in-out"
          >
            <i className="fas fa-history mr-2"></i>
            Order History
          </button>
          <button
            onClick={() => setActiveView("inventory")}
            className="w-full text-left py-3 px-6 text-gray-700 hover:bg-gray-100 transition duration-300 ease-in-out"
          >
            <i className="fas fa-boxes-stacked mr-2"></i>
            Edit Inventory
          </button>
          <button
            onClick={() => setActiveView("stores")}
            className="w-full text-left py-3 px-6 text-gray-700 hover:bg-gray-100 transition duration-300 ease-in-out"
          >
            <i className="fas fa-store mr-2"></i>
            Edit Stores
          </button>
          <button
            onClick={() => setActiveView("finances")}
            className="w-full text-left py-3 px-6 text-gray-700 hover:bg-gray-100 transition duration-300 ease-in-out"
          >
            <i className="fas fa-chart-line mr-2"></i>
            Finances
          </button>
        </nav>
        <div className="px-6 mt-auto"></div>
      </div>
    </div>
  );
};

export default Sidebar;
