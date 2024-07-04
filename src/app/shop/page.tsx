"use client";
import React from "react";
import ShopSlides from "@/components/ShopSlides";
import { useState } from "react";
import ShopItems from "@/components/ShopItems";
// import SearchItems from "@/components/SearchItems";
const Shop = () => {
  const [category, setCategory] = useState<string>("All");
  return (
    <div>
      {/* <SearchItems /> */}
      <ShopSlides category={category} setCategory={setCategory} />
      <ShopItems category={category} setCategory={setCategory} />
    </div>
  );
};

export default Shop;
