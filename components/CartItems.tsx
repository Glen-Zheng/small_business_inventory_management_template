"use client";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import OrderForm from "./OrderForm";
import {
  increaseItemQuantity,
  decreaseItemQuantity,
  dropFromCart,
} from "@/store_redux/slices/cartSlice";
import { useRouter } from "next/navigation";

const CartItems = () => {
  const cart = useSelector((state: any) => state.cart.cart);
  const [numItems, setNumItems] = useState<number>(0);
  const [subtotal, setSubtotal] = useState<number>(0);
  const dispatch = useDispatch();
  const router = useRouter();
  const [canProceed, setCanProceed] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [StockMaxed, setStockMaxed] = useState<boolean>(false);

  useEffect(() => {
    let totalItems: number = 0;
    let priceAmount: number = 0;
    for (let i = 0; i < cart.length; ++i) {
      totalItems += cart[i].quantity;
      priceAmount += cart[i].quantity * cart[i].item_price;
    }
    setNumItems(totalItems);
    setSubtotal(priceAmount);
  }, [cart]);

  return (
    <div className="w-full px-2 sm:px-3 lg:px-4 mb-10">
      <button
        className={`mb-4 flex items-center text-gray-600 hover:text-gray-900 transition-colors duration-300 ${
          isHovered ? "underline" : ""
        }`}
        onMouseOver={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => router.push("/shop")}
      >
        <i className="fas fa-arrow-left mr-2"></i>
        <span className="font-merriweather">Go back to shop</span>
      </button>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="bg-white rounded-lg shadow-md p-6 flex-grow">
          <h1 className="font-merriweather text-2xl font-bold mb-4">
            Your Cart
          </h1>
          {cart.length === 0 && (
            <p className="text-gray-500">Your cart is empty</p>
          )}

          {cart.map((cart_item: any) => (
            <div
              key={cart_item.id}
              className="py-4 border-b border-gray-200 last:border-b-0"
            >
              <div className="flex justify-between items-center mb-2">
                <h2 className="font-bold">{cart_item.item_name}</h2>
                <p className="font-bold">${cart_item.item_price}</p>
              </div>
              <p className="text-sm text-gray-600">
                {cart_item.item_size} - {cart_item.item_units}
              </p>
              <div className="flex justify-between items-center mt-2">
                <div className="flex items-center">
                  <button
                    className="px-2 py-1 bg-gray-200 rounded-l hover:bg-gray-300 transition-colors duration-300"
                    onClick={() => dispatch(decreaseItemQuantity(cart_item.id))}
                  >
                    -
                  </button>
                  <span className="px-4 py-1 bg-gray-100">
                    {cart_item.quantity}
                  </span>
                  <button
                    className={`px-2 py-1 rounded-r
                      ${
                        cart_item.quantity >= cart_item.item_stock
                          ? "bg-gray-500 cursor-auto"
                          : "bg-gray-200 hover:bg-gray-300 transition-colors duration-300"
                      }`}
                    onClick={
                      cart_item.quantity >= cart_item.item_stock
                        ? () => {}
                        : () => dispatch(increaseItemQuantity(cart_item.id))
                    }
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => dispatch(dropFromCart(cart_item.id))}
                  className="text-red-500 hover:text-red-700 transition-colors duration-300"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}

          <div className="mt-6 text-right">
            <p className="text-lg">
              Subtotal ({numItems} {numItems === 1 ? "item" : "items"}):
              <span className="font-bold ml-2">${subtotal.toFixed(2)}</span>
            </p>
          </div>
        </div>

        <div className="md:w-1/3 self-end">
          <button
            onClick={() => {
              setCanProceed(true);
              router.push("/cart/#orderform");
            }}
            className="w-full bg-turqoise text-white py-3 px-4 rounded-lg hover:bg-turqoise-dark transition-colors duration-300 shadow-lg hover:shadow-xl"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>

      {canProceed && cart.length > 0 && <OrderForm orderTotal={subtotal} />}
      {canProceed && cart.length === 0 && (
        <p className="mt-4 text-red-500 text-center">
          Your cart is empty. Please add items to proceed.
        </p>
      )}
    </div>
  );
};

export default CartItems;
