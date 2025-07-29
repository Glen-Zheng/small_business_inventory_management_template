"use client";
import { useState } from "react";
import React from "react";
import LoadingOverlay from "./LoadingOverlay";
const NewStore = ({ setAdminStores }: any) => {
  const [storeLocation, setStoreLocation] = useState<string>("");
  const [storePassword, setStorePassword] = useState<any>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [seePass, setSeePass] = useState<string>("password");
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
    if (isLoading) return;
    setIsLoading(true);
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
        const data = await response.json();
        setAdminPassError(false);
        setAdminStores((prevStores: any) => {
          const newStores = [
            ...prevStores,
            { id: data.id, store_location: storeLocation },
          ];
          return newStores;
        });
        // setStoreRegistered((prev: any) => !prev);

        console.log("Registration successful");

        // Here you might redirect the user or show a success message
      }
    } catch (error) {
      //if there's an error in here, it means that the api call was busted, and that's bad same as above
      alert("request failed");
      console.error("An error occurred:", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4">
      {isLoading && <LoadingOverlay />}
      <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg p-8 rounded-2xl shadow-2xl w-full max-w-md border border-gray-600">
        <form
          className="z-20 space-y-6"
          onSubmit={handleSubmit}
          // onKeyDown={(e) => {
          //   if (e.key === "Enter") handleSubmit;
          // }}
        >
          <h1 className="text-3xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500 mb-6">
            New Store Setup
          </h1>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">
              Store Location
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Enter store location"
                value={storeLocation}
                className="w-full bg-gray-800 border border-gray-600 text-white rounded-md px-4 py-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition duration-150 ease-in-out pl-10"
                maxLength={255}
                onChange={(e) => setStoreLocation(e.target.value)}
                required
              />
              <span className="absolute left-3 top-2.5 text-gray-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">
              Store Password
            </label>
            <div className="relative">
              <input
                type={seePass}
                placeholder="Enter password"
                value={storePassword}
                className="w-full bg-gray-800 border border-gray-600 text-white rounded-md px-4 py-2 pr-10 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition duration-150 ease-in-out pl-10"
                onChange={(e) => setStorePassword(e.target.value)}
                maxLength={255}
                required
              />
              <span className="absolute left-3 top-2.5 text-gray-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              <span
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-sm text-teal-400 cursor-pointer hover:text-teal-300 transition duration-150 ease-in-out"
                onClick={
                  seePass === "password"
                    ? () => setSeePass("text")
                    : () => setSeePass("password")
                }
              >
                See
              </span>
            </div>
          </div>

          {/* <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-300">Admin Password</label>
        <div className="relative">
          <input
            value={adminPass}
            className="w-full bg-gray-800 border border-gray-600 text-white rounded-md px-4 py-2 pr-10 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition duration-150 ease-in-out pl-10"
            type={seeAdminPass}
            placeholder="Enter Admin Password to create new store"
            required
            onChange={(e) => setAdminPass(e.target.value)}
          />
          <span className="absolute left-3 top-2.5 text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 8a6 6 0 01-7.743 5.743L10 14l-1 1-1 1H6v2H2v-4l4.257-4.257A6 6 0 1118 8zm-6-4a1 1 0 100 2 2 2 0 012 2 1 1 0 102 0 4 4 0 00-4-4z" clipRule="evenodd" />
            </svg>
          </span>
          <span
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-sm text-teal-400 cursor-pointer hover:text-teal-300 transition duration-150 ease-in-out"
            onMouseDown={() => setSeeAdminPass("text")}
            onMouseUp={() => setSeeAdminPass("password")}
          >
            See
          </span>
        </div>
      </div> */}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-teal-500 to-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:from-teal-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-150 ease-in-out"
          >
            Create New Store
          </button>

          {adminPassError && (
            <p className="text-red-400 text-sm text-center">
              Admin password incorrect. Please try again or contact system
              administrator.
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default NewStore;
