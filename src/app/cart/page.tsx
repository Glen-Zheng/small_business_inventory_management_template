"use client";
import React from "react";
import { useSelector } from "react-redux";
import { useState } from "react";
import CartItems from "@/components/CartItems";

const Cart = () => {
  const cart = useSelector((state: any) => state.cart.cart);

  return (
    <div className="w-full">
      <CartItems />
    </div>
  );
};

export default Cart;
