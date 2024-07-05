"use client";
import { useState, useEffect } from "react";
import React from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

const OrderForm = ({ orderTotal }: any) => {
  const [confirmOrder, setConfirmOrder] = useState<boolean>(false);
  const cart = useSelector((state: any) => state.cart.cart);
  const locationSession = useSelector(
    (state: any) => state.storeLocation.sessionUser
  );
  const [contactName, setContactName] = useState<string>("");
  const [contactInfo, setContactInfo] = useState<string>("");
  const [orderLocation, setorderLocation] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    setConfirmOrder(false);
  }, [contactInfo, orderLocation, contactName]);

  const handleSubmit = async () => {
    try {
      const response = await fetch("/api/orders/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cart_array: cart,
          total_amount: orderTotal,
          contact_info: contactInfo,
          contact_name: contactName,
          location: orderLocation,
          sessionLocation: locationSession,
        }),
      });
      if (response.ok) {
        alert(
          "Order placed. Your order is being processed. Please send a cheque or E-transfer Hi Yogurt. Thank you!"
        );
        router.push("/shop");
      }
    } catch {
      console.error("Failed to process order");
    }
  };
  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-lg overflow-hidden mt-10">
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Place Your Order
        </h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setConfirmOrder(true);
          }}
          className="space-y-4"
        >
          <div>
            <label
              htmlFor="contactname"
              className="block text-sm font-medium text-gray-700"
            >
              Contact Name
            </label>
            <input
              onChange={(e) => setContactName(e.target.value)}
              maxLength={255}
              required
              id="contactname"
              type="text"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div>
            <label
              htmlFor="contactnum"
              className="block text-sm font-medium text-gray-700"
            >
              Contact Number
            </label>
            <input
              onChange={(e) => setContactInfo(e.target.value)}
              required
              id="contactnum"
              maxLength={255}
              type="text"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div>
            <label
              htmlFor="shiploc"
              className="block text-sm font-medium text-gray-700"
            >
              Shipping Address
            </label>
            <input
              onChange={(e) => setorderLocation(e.target.value)}
              required
              id="shiploc"
              maxLength={255}
              type="text"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Place Order
          </button>
        </form>
      </div>

      {confirmOrder && (
        <div className="fixed  inset-0 bg-rose-50 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white border-2 border-black p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h3 className="text-lg font-bold mb-4">Confirm and place order?</h3>
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleSubmit}
                className="bg-fuchsia-700 text-white px-4 py-2 rounded hover:bg-turqoise transition duration-200"
              >
                Yes
              </button>
              <button
                onClick={() => setConfirmOrder(false)}
                className="bg-sky-900 text-white px-4 py-2 rounded hover:bg-turqoise transition duration-200"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderForm;
