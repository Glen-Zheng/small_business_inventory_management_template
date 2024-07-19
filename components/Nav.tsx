"use client";
//since we're using hooks and stuff of that nature (reactive)
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useAuth } from "@/hooks/useAuth";

const Nav = () => {
  const { logout } = useAuth();
  const user = useSelector((state: any) => state.storeLocation.sessionUser);
  // const isUserLoggedIn = true;
  // const { data: session } = useSession();
  // const sessionUser = useSelector(
  //   (state: any) => state.storeLocation.storeLocation
  // );

  //login
  const [providers, setProviders] = useState<any>(null);

  const [toggleDropdown, setToggleDropdown] = useState<boolean>(false);

  //   useEffect(() => {
  //     const setUpProviders = async () => {
  //       const response = await getProviders();

  //       setProviders(response);
  //     };
  //     setUpProviders();
  //     //kind of weird function calling the function defined afterwards
  //   }, []);

  return (
    <nav className="bg-turqoise shadow-md w-full mb-16">
      <div className="max-w-screen mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center">
            <Image
              src="/enh.png"
              alt="Hi Yogurt logo"
              className="object-contain"
              width={180}
              height={60}
            />
            {/* <p className="max-sm:hidden">Hi Yogurt</p> */}
          </Link>
          {user && (
            <div className="flex items-center space-x-4">
              <div className="flex flex-col items-end">
                <p className="font-bold text-white">Store: {user}</p>
                <Link
                  href={"/"}
                  className=" self-center text-white text-sm border border-white bg-slate-700 hover:bg-slate-600 px-3 py-1 rounded transition duration-300 ease-in-out"
                  onClick={() => logout()}
                >
                  Logout
                </Link>
              </div>
              <Link
                href="/cart"
                className="text-white hover:text-gray-200 transition duration-300 ease-in-out"
              >
                <i className="text-2xl fa-solid fa-cart-shopping"></i>{" "}
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Nav;
