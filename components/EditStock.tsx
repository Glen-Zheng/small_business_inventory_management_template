"use client";
import React from "react";
import { useState, useEffect } from "react";
const EditStock = ({ adminInventoryItems, setAdminInventoryItems }: any) => {
  const [itemName, setItemName] = useState<string>("");
  const [itemPrice, setItemPrice] = useState<number>(0);
  const [itemStock, setItemStock] = useState<number>(0);
  const [itemSize, setItemSize] = useState<string>("");
  const [itemUnits, setItemUnits] = useState<string>("");
  const [itemCat, setItemCat] = useState<number>(0);
  const [editItems, setEditItems] = useState<Map<number, boolean>>(new Map());

  useEffect(() => {
    if (adminInventoryItems.length !== 0) {
      const initialItemsData = new Map<number, boolean>();

      for (const item of adminInventoryItems) {
        initialItemsData.set(item.id, false);
      }
      setEditItems(initialItemsData);
    }
  }, [adminInventoryItems]);

  const toggleEditStock = (id: number) => {
    const newMap = new Map(editItems);
    const toggled = newMap.get(id) || false;
    newMap.set(id, !toggled);
    setEditItems(newMap);
  };

  const deleteItem = async (id: Number) => {
    try {
      const response = await fetch("/api/admin/inventory/items", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
        }),
      });

      if (response.ok) {
        const index = adminInventoryItems.findIndex(
          (value: any) => value.id === id
        );
        if (index !== -1) {
          const newadminInventoryItems = [
            ...adminInventoryItems.slice(0, index),
            ...adminInventoryItems.slice(index + 1),
          ];
          setAdminInventoryItems(newadminInventoryItems);
        }
      }
    } catch (error) {
      console.log("error deleting", error);
    }
  };

  const createItem = async (
    categoryId: number,
    item_name: string,
    item_price: number,
    item_stock: number,
    item_size: string,
    item_units: string
  ) => {
    try {
      const response = await fetch("/api/admin/inventory/items", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          categoryId,
          item_name,
          item_price,
          item_stock,
          item_size,
          item_units,
        }),
      });

      if (response.ok) {
        const newAdminInventoryItems = adminInventoryItems.push({
          item_name,
          category_name: "Work in progress",
          item_price,
          item_stock,
          item_size,
          item_units,
        });
        setAdminInventoryItems(newAdminInventoryItems);
        console.log("item added successfully");
      }
    } catch (error) {
      alert("request failed");
      console.error("An error occurred:", error);
    }
  };

  const editStock = async (e: any, id: number, stockAmount: any) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/admin/inventory/items", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          stockAmount,
        }),
      });

      if (response.ok) {
        toggleEditStock(id);
        const index = adminInventoryItems.findIndex(
          (value: any) => value.id === id
        );
        console.log(index);
        if (index !== -1) {
          const newadminInventoryItems = adminInventoryItems;
          newadminInventoryItems[index].item_stock = Number(stockAmount);
          setAdminInventoryItems(newadminInventoryItems);
        }
        console.log("item added successfully");
      }
    } catch (error) {
      alert("request failed");
      console.error("An error occurred:", error);
    }
  };
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-teal-600">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Stock
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Size
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Units
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Remove Item
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {adminInventoryItems.map((item: any) => (
              <tr
                key={item.id}
                className="hover:bg-gray-50 transition-colors duration-200"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  {item.item_name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {item.category_name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  ${item.item_price}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="mr-2">{item.item_stock}</span>
                  {editItems.get(item.id) ? (
                    <form
                      onSubmit={(e: any) =>
                        editStock(
                          e,
                          item.id,
                          e.target.elements.stockAmount.value
                        )
                      }
                      className="inline-flex items-center"
                    >
                      <input
                        name="stockAmount"
                        type="number"
                        className="w-16 border border-gray-300 rounded px-2 py-1 mr-2"
                      />
                      <button
                        type="submit"
                        className="text-teal-600 hover:text-teal-800 mr-2"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => toggleEditStock(item.id)}
                        className="text-gray-600 hover:text-gray-800"
                      >
                        Cancel
                      </button>
                    </form>
                  ) : (
                    <button
                      onClick={() => toggleEditStock(item.id)}
                      className="text-teal-600 hover:text-teal-800 hover:underline"
                    >
                      Edit
                    </button>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {item.item_size}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {item.item_units}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => deleteItem(item.id)}
                    className="text-orange-600 hover:text-orange-800 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-8 bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold text-teal-600 mb-4">Create Item</h2>
        <form
          onSubmit={() =>
            createItem(
              itemCat,
              itemName,
              itemPrice,
              itemStock,
              itemSize,
              itemUnits
            )
          }
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-1">Name</label>
            <input
              onChange={(e) => setItemName(e.target.value)}
              maxLength={255}
              value={itemName}
              type="text"
              className="border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-1">Price</label>
            <input
              onChange={(e) => setItemPrice(Number(e.target.value))}
              value={itemPrice}
              type="number"
              className="border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-1">Stock</label>
            <input
              onChange={(e) => setItemStock(Number(e.target.value))}
              value={itemStock}
              type="number"
              className="border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-1">Size</label>
            <input
              onChange={(e) => setItemSize(e.target.value)}
              value={itemSize}
              type="text"
              className="border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-1">Units</label>
            <input
              onChange={(e) => setItemUnits(e.target.value)}
              value={itemUnits}
              type="text"
              className="border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-1">Category</label>
            <input
              value={itemCat}
              onChange={(e) => setItemCat(Number(e.target.value))}
              type="number"
              className="border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>
          <button
            type="submit"
            className="md:col-span-2 bg-teal-600 text-white font-bold py-2 px-4 rounded hover:bg-teal-700 transition-colors duration-200"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditStock;
