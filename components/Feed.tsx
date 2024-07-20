"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setStoreLocation } from "@/store_redux/slices/storeUserSlice";
import { useRouter } from "next/navigation";
import AdminLogin from "./AdminLogin";

export default function Feed() {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [stores, setStores] = useState([]);
  const dispatch = useDispatch();
  const router = useRouter();
  const [storeRegistered, setStoreRegistered] = useState<boolean>(false);

  const loggedInSession = useSelector(
    (state: any) => state.storeLocation.sessionUser
  );

  const handleSubmit = (store_loc: any) => {
    dispatch(setStoreLocation(store_loc));
    if (loggedInSession && loggedInSession === store_loc) {
      router.push("/shop");
    } else {
      router.push("/login");
    }
  };

  useEffect(() => {
    dispatch(setStoreLocation(""));
    async function fetchStores() {
      try {
        const response = await fetch("/api/stores", {
          method: "GET",
          headers: {
            "Cache-Control":
              "no-store, no-cache, must-revalidate, proxy-revalidate",
            Pragma: "no-cache",
            Expires: "0",
          },
        });
        const data = await response.json();
        setStores(data);
      } catch (error) {
        console.error("Error fetching stores:", error);
      }
    }

    fetchStores();
  }, [dispatch]);
  //removed storeRegistered for refresh
  //it wants dispatch as a dependency which makes sense as we called the external defined function inside. However in reality it's a const so it's useless.

  return (
    <section className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {stores.map((store: any) => (
          <button
            type="submit"
            className="flex items-center justify-center p-4 h-32 sm:h-40 w-full text-center rounded-lg border-2 border-turqoise text-turqoise hover:bg-turqoise hover:text-white transition-colors duration-300 font-merriweather"
            key={store.id}
            onClick={() => handleSubmit(store.store_location)}
          >
            {store.store_location}
          </button>
        ))}
        {/* <button
          className="duration-500 hover:text-white rounded-lg border-2 w-1/5 h-96 bg-amber-600 font-merriweather"
          onClick={() => setOpenModal(true)}
        >
          <p className="">Add Store</p>
          <p className="text-3xl ">+</p>
        </button> */}
        <button
          className="flex flex-col items-center justify-center p-4 h-32 sm:h-40 w-full text-center rounded-lg border-2 border-amber-600 bg-amber-600 text-white hover:bg-amber-700 transition-colors duration-300 font-merriweather"
          onClick={() => setOpenModal(true)}
        >
          <p className="mb-2">Hi Yogurt Admin</p>
          <i className="fas fa-user-cog text-2xl"></i>
        </button>
      </div>
      {openModal === true && (
        <AdminLogin
          setOpenModal={setOpenModal}
          // setStoreRegistered={setStoreRegistered}
        />
      )}
    </section>
  );
}
