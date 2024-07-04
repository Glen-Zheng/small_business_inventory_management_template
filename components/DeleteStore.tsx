"use client";
import React from "react";
import { useEffect, useState } from "react";

const DeleteStore = ({ adminStores, setAdminStores }: any) => {
  const [confirmDelete, setConfirmDelete] = useState<boolean>(false);
  const [attemptedDelete, setAttemptedDelete] = useState<string>("");

  const handleDeleteStore = async (store: string) => {
    try {
      const response = await fetch("/api/admin/stores/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          store,
        }),
      });

      if (response.ok) {
        const index = adminStores.findIndex(
          (value: any) => value.store_location === store
        );
        if (index !== -1) {
          const newAdminStores = [
            ...adminStores.slice(0, index),
            ...adminStores.slice(index + 1),
          ];
          setConfirmDelete(false);
          setAttemptedDelete("");
          setAdminStores(newAdminStores);
        }
      }
    } catch (error) {
      console.log("couldn't delete store", error);
    }
  };

  return (
    <div>
      <p className="font-semibold">Delete stores</p>
      <div>
        {adminStores.map((store: any) => (
          <div
            key={store.id}
            className="rounded border border-black flex justify-between"
          >
            <p>{store.store_location}</p>
            <p
              className="underline hover:text-turqoise cursor-pointer"
              onClick={() => {
                setConfirmDelete(true);
                setAttemptedDelete(store.store_location);
              }}
            >
              DELETE
            </p>
          </div>
        ))}
        {confirmDelete && attemptedDelete && (
          <div className="border border-orange-500 rounded bg-slate-200">
            Confirm delete {attemptedDelete}?{" "}
            <span
              onClick={() => handleDeleteStore(attemptedDelete)}
              className="cursor-pointer text-orange-500 hover:text-turqoise"
            >
              Yes
            </span>{" "}
            <span
              onClick={() => {
                setConfirmDelete(false);
                setAttemptedDelete("");
              }}
              className="cursor-pointer text-orange-500 hover:text-turqoise"
            >
              No
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default DeleteStore;
