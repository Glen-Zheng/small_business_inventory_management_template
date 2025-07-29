"use client";
import { useState } from "react";
import React from "react";
import LoadingOverlay from "./LoadingOverlay";
import { useRouter } from "next/navigation";

const AdminLogin = ({ setOpenModal }: any) => {
  const [adminPass, setAdminPass] = useState<any>("");
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [seeAdminPass, setSeeAdminPass] = useState<string>("password");
  const [adminPassError, setAdminPassError] = useState<boolean>(false);

  const authenticateAdmin = async () => {
    // e.preventDefault();
    try {
      const response = await fetch("/api/admin/password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password: adminPass,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("admin authentication successful:", data.message);
        return response;
      } else {
        setAdminPassError(true);

        console.error("admin auth failed:", data.message);
      }
    } catch (error) {
      //if there's an error in here, it means that the above api call was busted, and that's bad. like it literally crashed and just ended. it got caught
      alert("request failed");
      console.error("An error occurred during admin auth:", error);
    }
  };

  const handleSubmit = async (e: any) => {
    if (isLoading) return;
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await authenticateAdmin();
      //do we need to check if the previous oen had an error? later
      if (res) {
        router.push("/admin");
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
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          setOpenModal(false);
        }
      }}
    >
      {isLoading && <LoadingOverlay />}
      <div className="bg-white px-8 py-6 rounded-lg shadow-xl w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Admin Login</h2>
          <button
            className="text-gray-600 hover:text-gray-800 transition duration-150"
            onClick={() => {
              setOpenModal(false);
              setAdminPassError(false);
            }}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="adminPassword"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="adminPassword"
                type={seeAdminPass}
                value={adminPass}
                onChange={(e) => setAdminPass(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter Admin Password"
                required
              />
              <button
                type="button"
                onClick={
                  seeAdminPass === "password"
                    ? () => setSeeAdminPass("text")
                    : () => setSeeAdminPass("password")
                }
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
              >
                {seeAdminPass === "password" ? (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-turqoise text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-150"
          >
            Submit
          </button>
        </form>
        {adminPassError && (
          <p className="mt-4 text-sm text-red-600">
            Admin password incorrect. Please try again or contact an
            administrator.
          </p>
        )}
      </div>
    </div>
  );
};

export default AdminLogin;
