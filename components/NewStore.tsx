"use client";
import { useState } from "react";
import React from "react";

const newStore = () => {
  const [storeLocation, setStoreLocation] = useState<string>("");
  const [storePassword, setStorePassword] = useState<any>("");
  const [adminPass, setAdminPass] = useState<any>("");

  const [seePass, setSeePass] = useState<string>("password");
  const [seeAdminPass, setSeeAdminPass] = useState<string>("password");
  const [adminPassError, setAdminPassError] = useState<boolean>(false);

  // const authenticateAdmin = async () => {
  //   // e.preventDefault();

  //   try {
  //     const response = await fetch("/api/admin/password", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         password: adminPass,
  //       }),
  //     });

  //     const data = await response.json();

  //     if (response.ok) {
  //       console.log("admin authentication successful:", data.message);
  //       return response;
  //     } else {
  //       setAdminPassError(true);

  //       console.error("admin auth failed:", data.message);
  //     }
  //   } catch (error) {
  //     //if there's an error in here, it means that the above api call was busted, and that's bad. like it literally crashed and just ended. it got caught
  //     alert("request failed");
  //     console.error("An error occurred during admin auth:", error);
  //   }
  // };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      //do we need to check if the previous oen had an error? later
      const response = await fetch("/api/admin/stores/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          storeLocation: storeLocation,
          password: storePassword,
        }),
      });

      if (response.ok) {
        setAdminPassError(false);
        // setStoreRegistered((prev: any) => !prev);

        console.log("Registration successful");
        // Here you might redirect the user or show a success message
      }
    } catch (error) {
      //if there's an error in here, it means that the api call was busted, and that's bad same as above
      alert("request failed");
      console.error("An error occurred:", error);
    }
  };
  return (
    <div className="">
      <div className="bg-white p-8 rounded shadow-lg w-full max-w-md ">
        <form
          className=" z-index-20 flex flex-col justify-center items-center space-y-4"
          onSubmit={handleSubmit}
          // onKeyDown={(e) => {
          //   if (e.key === "Enter") handleSubmit;
          // }}
        >
          <h1 className="font-semibold">Add New Store</h1>
          <label className="">Store Location </label>
          <input
            type="text"
            placeholder="Store Location"
            value={storeLocation}
            className="w-full border-2 border-gray-300 rounded px-3 py-2 "
            maxLength={255}
            onChange={(e) => setStoreLocation(e.target.value)}
            required
          ></input>
          <label>Store Password </label>
          <div className=" w-full flex flex-row justify-center items-center border-2 border-gray-300 rounded px-3 py-2 cursor-default">
            <input
              type={seePass}
              placeholder="Password"
              value={storePassword}
              className=" w-full "
              onChange={(e) => setStorePassword(e.target.value)}
              maxLength={255}
              required
            ></input>
            <span
              onMouseDown={() => setSeePass("text")}
              onMouseUp={() => setSeePass("password")}
            >
              see
            </span>
          </div>
          {/* <label>Admin Password </label>
          <div className="w-full flex flex-row justify-center items-center border-2 border-gray-300 rounded px-3 py-2 cursor-default">
            <input
              value={adminPass}
              className="w-full "
              type={seeAdminPass}
              placeholder="Enter Admin Password to create new store"
              required
              onChange={(e) => setAdminPass(e.target.value)}
            ></input>
            <span
              onMouseDown={() => setSeeAdminPass("text")}
              onMouseUp={() => setSeeAdminPass("password")}
            >
              see
            </span>
          </div> */}
          <button
            type="submit"
            className="w-1/4 border-black border-2 hover:bg-sky-300 duration-500 cursor-pointer"
          >
            Submit
          </button>
          {adminPassError && (
            <p>Admin password wrong, retype or contact admin</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default newStore;
