"use client";

import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import ItemPopUp from "./ItemPopUp";

const ShopItems = ({ category, setCategory }: any) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<number | undefined>();

  const dispatch = useDispatch();
  const [items, setItems] = useState<any>([]);

  useEffect(() => {
    async function fetchItems() {
      try {
        const response = await fetch(`/api/shop/${category}`);
        const data = await response.json();
        setItems(data);
      } catch (error) {
        console.error("Error fetching ingredients:", error);
      }
    }
    fetchItems();
  }, [category]);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-xl shadow-md overflow-hidden mb-5">
        <div className="flex flex-row w-full bg-gray-100 font-bold text-gray-700">
          <p className="w-4/12 py-3 px-4">Item</p>
          <p className="w-3/12 py-3 px-4">Size</p>
          <p className="w-3/12 py-3 px-4">Units/Case</p>
          <p className="w-2/12 py-3 px-4">Price</p>
        </div>
        {items.map((ingredient: any) => (
          <div
            key={ingredient.id}
            onClick={() => {
              setOpenModal(true);
              setSelectedItem(
                items.findIndex((element: any) => element.id === ingredient.id)
              );
            }}
            className="flex flex-row w-full border-b border-gray-200 hover:bg-gray-50 transition-colors duration-300 cursor-pointer"
          >
            <p className="w-4/12 py-3 px-4">{ingredient.item_name}</p>
            <p className="w-3/12 py-3 px-4">{ingredient.item_size}</p>
            <p className="w-3/12 py-3 px-4">{ingredient.item_units}</p>
            <p className="w-2/12 py-3 px-4">${ingredient.item_price}</p>
          </div>
        ))}
      </div>
      {openModal === true && selectedItem !== undefined && (
        <ItemPopUp
          id={items[selectedItem].id}
          item_name={items[selectedItem].item_name}
          item_price={items[selectedItem].item_price}
          item_stock={items[selectedItem].item_stock}
          item_size={items[selectedItem].item_size}
          item_units={items[selectedItem].item_units}
          setOpenModal={setOpenModal}
        />
      )}
    </div>
  );
};

export default ShopItems;
