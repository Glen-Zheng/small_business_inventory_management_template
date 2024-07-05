"use client";
import React from "react";
import { useState, useEffect } from "react";

import NewStore from "../NewStore";
import DeleteStore from "../DeleteStore";

const Stores = () => {
  const [adminStores, setAdminStores] = useState<string[]>([]);
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

  return (
    <div className="w-full">
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

export default Stores;
