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
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Category
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Price
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Stock
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Size
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Units
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Remove Item
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {adminInventoryItems.map((item: any) => (
            <tr key={item.id}>
              <td className="px-6 py-4 whitespace-nowrap">{item.item_name}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {item.category_name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                ${item.item_price}
              </td>
              <td className="px-6 py-4 whitespace-nowrap border">
                <span>{item.item_stock} </span>
                {editItems.get(item.id) ? (
                  <form
                    onSubmit={(e: any) =>
                      editStock(e, item.id, e.target.elements.stockAmount.value)
                    }
                  >
                    <input
                      name="stockAmount"
                      placeholder={item.item_stock}
                      type="number"
                    />
                    <button type="submit">Save</button>
                  </form>
                ) : (
                  <span
                    onClick={() => toggleEditStock(item.id)}
                    className="cursor-pointer hover:turqoise"
                  >
                    Edit
                  </span>
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">{item.item_size}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.item_units}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button
                  onClick={() => deleteItem(item.id)}
                  className="text-amber-800 hover:underline hover:font-bold"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <p>create item</p>
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
          className="flex"
        >
          <label>Name</label>
          <input
            onChange={(e) => setItemName(e.target.value)}
            maxLength={255}
            value={itemName}
            type="text"
          />
          <label>Price</label>
          <input
            onChange={(e) => setItemPrice(Number(e.target.value))}
            value={itemPrice}
            type="number"
          />

          <label>Stock</label>
          <input
            onChange={(e) => setItemStock(Number(e.target.value))}
            value={itemStock}
            type="number"
          />

          <label>Size</label>
          <input
            onChange={(e) => setItemSize(e.target.value)}
            value={itemSize}
            type="text"
          />

          <label>Units</label>
          <input
            onChange={(e) => setItemUnits(e.target.value)}
            value={itemUnits}
            type="text"
          />

          <label>Category</label>
          <input value={itemCat} type="number" />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default EditStock;
