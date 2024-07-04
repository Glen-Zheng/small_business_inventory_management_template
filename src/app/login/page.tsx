"use client";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Login = () => {
  const router = useRouter();
  const sl = useSelector((state: any) => state.storeLocation.storeLocation);
  const currentSessionUser = useSelector(
    (state: any) => state.storeLocation.sessionUser
  );
  const { login } = useAuth();

  const [storePassword, setStorePassword] = useState<any>("");
  const [loginError, setLoginError] = useState<boolean>(false);

  const handleLogin = async (e: any) => {
    e.preventDefault();

    try {
      const { ok, data } = await login(sl, storePassword);

      if (ok) {
        setLoginError(false);
        console.log("Login successful:", data.message);
        router.push("/shop");
      } else {
        setLoginError(true);
        console.error("Login failed:", data.message);
      }
    } catch (error) {
      console.error("An error occurred during login:", error);
    }
  };

  if (!sl) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <p className="text-lg mb-4">
            Store not selected.{" "}
            <Link className="text-turqoise hover:underline" href="/">
              Home
            </Link>
          </p>
        </div>
      </div>
    );
  }

  if (currentSessionUser !== "" && currentSessionUser !== sl) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <p className="text-lg mb-4">
            Must logout first.{" "}
            <Link className="text-turqoise hover:underline" href="/">
              Home
            </Link>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center font-merriweather">
          {sl} Location
        </h1>
        <p className="mb-6 text-center text-gray-600">
          Please provide your store's password.
        </p>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-600">
              Hi Yogurt Location:
            </label>
            <input
              placeholder={`${sl}`}
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 cursor-default"
              readOnly
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-600">
              Password:
            </label>
            <input
              value={storePassword}
              type="password"
              placeholder="Your password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-turqoise"
              maxLength={255}
              onChange={(e) => setStorePassword(e.target.value)}
              required
            />
          </div>
          <button
            className="w-full bg-turqoise text-white py-2 px-4 rounded-md hover:bg-turqoise-dark transition duration-300"
            type="submit"
          >
            Login
          </button>
          {loginError && (
            <p className="text-red-500 text-sm text-center">
              Incorrect password
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;
