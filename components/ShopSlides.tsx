"use client";

import React, { useEffect, useState } from "react";

const ShopSlides = ({ category, setCategory }: any) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch("/api/shop/categories");
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }
    fetchCategories();
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-8">
      <div className="flex flex-wrap justify-center gap-4 py-4 px-6 bg-white rounded-xl shadow-md">
        <button
          className={`${
            category == "All" ? "bg-turqoise text-white" : "bg-gray-100"
          } px-4 py-2 rounded-lg transition-colors duration-300 hover:bg-turqoise hover:text-white focus:outline-none focus:ring-2 focus:ring-turqoise focus:ring-opacity-50`}
          onClick={() => setCategory("All")}
        >
          All
        </button>

        {categories.map((category_element: any) => (
          <button
            key={category_element.id}
            className={`${
              category_element.category_name == category
                ? "bg-turqoise text-white"
                : "bg-gray-100"
            } px-4 py-2 rounded-lg transition-colors duration-300 hover:bg-turqoise hover:text-white focus:outline-none focus:ring-2 focus:ring-turqoise focus:ring-opacity-50`}
            onClick={() => setCategory(category_element.category_name)}
          >
            {category_element.category_name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ShopSlides;
