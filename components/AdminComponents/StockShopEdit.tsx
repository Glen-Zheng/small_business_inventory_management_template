"use client";
import { useState, useEffect } from "react";

import React from "react";
import NewStore from "../NewStore";
import DeleteStore from "../DeleteStore";
import EditStock from "../EditStock";

const StockShop = () => {
  const [adminStores, setAdminStores] = useState<string[]>([]);
  const [adminInventoryItems, setAdminInventoryItems] = useState<any[]>([]);

  useEffect(() => {
    async function fetchStores() {
      try {
        const response = await fetch("/api/stores");
        const data = await response.json();
        setAdminStores(data);
      } catch (error) {
        console.error("Error fetching stores:", error);
      }
    }

    fetchStores();
  }, []);
  useEffect(() => {
    async function fetchInventory() {
      try {
        const response = await fetch(`/api/admin/inventory/items`);
        const data = await response.json();
        setAdminInventoryItems(data);
      } catch (error) {
        console.error("Error fetching stores:", error);
      }
    }

    fetchInventory();
  }, []);

  return (
    <div className="w-full">
      <div className="w-full">
        <h1 className="text-2xl font-bold">Edit Stock</h1>
        <EditStock
          adminInventoryItems={adminInventoryItems}
          setAdminInventoryItems={setAdminInventoryItems}
        />
      </div>
      <div className="w-full">
        <h1 className="text-2xl font-bold">Edit Stores</h1>
        <NewStore />
        <DeleteStore
          adminStores={adminStores}
          setAdminStores={setAdminStores}
        />
      </div>
    </div>
  );
};

export default StockShop;
