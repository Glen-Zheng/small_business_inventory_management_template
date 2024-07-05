"use client";
import React from "react";
import { useState, useEffect } from "react";
import Orders from "@/components/AdminComponents/Orders";
import Sidebar from "@/components/AdminComponents/Sidebar";
import InventoryStock from "@/components/AdminComponents/InventoryStock";
import Stores from "@/components/AdminComponents/Stores";
const AdminDashboard = () => {
  const [activeView, setActiveView] = useState("orders");

  const renderActiveView = () => {
    switch (activeView) {
      case "orders":
        return <Orders />;
      case "inventory":
        return <InventoryStock />;
      case "stores":
        return <Stores />;
      case "finances":
        return <div>Finances Component</div>;
      default:
        return <Orders />;
    }
  };
  //returnng components to be used in the jsx, good for full page viewing based on viewing condiitons

  return (
    <div className="flex h-screen bg-gray-100 w-full">
      <Sidebar setActiveView={setActiveView} />
      <div className="flex-grow p-6 overflow-auto">{renderActiveView()}</div>
    </div>
  );
};

export default AdminDashboard;
