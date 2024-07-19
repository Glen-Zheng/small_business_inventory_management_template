"use client";
import React from "react";
import { useEffect, useState } from "react";

const DeleteStore = ({ adminStores, setAdminStores }: any) => {
  const [confirmDelete, setConfirmDelete] = useState<boolean>(false);
  const [attemptedDelete, setAttemptedDelete] = useState<number | null>(null);

  const handleDeleteStore = async (id: number) => {
    try {
      const response = await fetch("/api/admin/stores/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id,
        }),
      });

      if (response.ok) {
        const index = adminStores.findIndex((value: any) => value.id === id);
        if (index !== -1) {
          const newAdminStores = [
            ...adminStores.slice(0, index),
            ...adminStores.slice(index + 1),
          ];
          setConfirmDelete(false);
          setAttemptedDelete(null);
          setAdminStores(newAdminStores);
        }
      }
    } catch (error) {
      console.log("couldn't delete store", error);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <p className="text-xl font-semibold mb-4">Delete stores</p>
      <div className="space-y-2">
        {adminStores.map((store: any) => (
          <div
            key={store.id}
            className="flex justify-between items-center p-3 bg-gray-50 rounded"
          >
            <p>{store.store_location}</p>
            <button
              className="text-red-600 hover:text-red-800 font-medium"
              onClick={() => {
                setConfirmDelete(true);
                setAttemptedDelete(store.id);
              }}
            >
              DELETE
            </button>
          </div>
        ))}
        {confirmDelete && attemptedDelete && (
          <div className="mt-4 p-4 border border-orange-500 rounded bg-orange-50">
            <p className="mb-2">Confirm delete {attemptedDelete}?</p>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => handleDeleteStore(attemptedDelete)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Yes
              </button>
              <button
                onClick={() => {
                  setConfirmDelete(false);
                  setAttemptedDelete(null);
                }}
                className="bg-gray-300 text-gray-800 px-3 py-1 rounded hover:bg-gray-400"
              >
                No
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DeleteStore;
