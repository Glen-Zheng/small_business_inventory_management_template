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
  const [editPrice, setEditPrice] = useState<Map<number, boolean>>(new Map());
  const [editSize, setEditSize] = useState<Map<number, boolean>>(new Map());
  const [editUnits, setEditUnits] = useState<Map<number, boolean>>(new Map());

  useEffect(() => {
    if (adminInventoryItems.length !== 0) {
      const initialItemsData = new Map<number, boolean>();

      for (const item of adminInventoryItems) {
        initialItemsData.set(item.id, false);
      }
      setEditItems(initialItemsData);
      setEditPrice(initialItemsData);
      setEditSize(initialItemsData);
      setEditUnits(initialItemsData);
    }
  }, [adminInventoryItems]);

  const toggleEdit = (id: number, selectedToEdit: string) => {
    const toggle = (
      map: Map<number, boolean>,
      setMap: React.Dispatch<React.SetStateAction<Map<number, boolean>>>
    ) => {
      const newMap = new Map(map);
      const toggled = newMap.get(id) || false;
      newMap.set(id, !toggled);
      setMap(newMap);
    };
    switch (selectedToEdit) {
      case "stock":
        toggle(editItems, setEditItems);
        break;
      case "price":
        toggle(editPrice, setEditPrice);

        break;
      case "size":
        toggle(editSize, setEditSize);

        break;
      case "units":
        toggle(editUnits, setEditUnits);
        break;
      default:
        console.warn(
          `Unknown filed you're trying to edit (DNE): ${selectedToEdit}`
        );
    }
  };

  const deleteItem = async (id: number) => {
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
    e: any,
    categoryId: number,
    item_name: string,
    item_price: number,
    item_stock: number,
    item_size: string,
    item_units: string
  ) => {
    e.preventDefault();
    setItemName("");
    setItemPrice(0);
    setItemStock(0);
    setItemSize("");
    setItemUnits("");
    setItemCat(0);

    try {
      const response = await fetch("/api/admin/inventory/items", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          categoryId,
          item_name,
          item_price: item_price.toFixed(2),
          item_stock,
          item_size,
          item_units,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const index = adminInventoryItems.findIndex(
          (e: any) => e.category_id === categoryId + 1
        );
        const newAdminInventoryItems = [
          ...adminInventoryItems.slice(0, index),
          {
            id: data.createdItemID,
            item_name,
            category_name: data.createdItemCat,
            item_price,
            item_stock,
            item_size,
            item_units,
          },
          ...adminInventoryItems.slice(index),
        ];
        setAdminInventoryItems(newAdminInventoryItems);
        console.log("item added successfully");
      }
    } catch (error) {
      alert("request failed");
      console.error("An error occurred:", error);
    }
  };

  const editStock = async (
    e: any,
    id: number,
    value: any,
    operation: string
  ) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/admin/inventory/items", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          value,
          operation,
        }),
      });

      if (response.ok) {
        toggleEdit(id, operation);
        const index = adminInventoryItems.findIndex(
          (value: any) => value.id === id
        );
        console.log(index);
        if (index !== -1) {
          const newadminInventoryItems = adminInventoryItems;
          switch (operation) {
            case "stock":
              newadminInventoryItems[index].item_stock = Number(value);
              break;
            case "price":
              newadminInventoryItems[index].item_price =
                Number(value).toFixed(2);
              break;
            case "size":
              newadminInventoryItems[index].item_size = String(value);
              break;
            case "units":
              newadminInventoryItems[index].item_units = String(value);
              break;
          }
          setAdminInventoryItems(newadminInventoryItems);
          console.log("item added successfully");
        }
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
                  <span className={`mr-2`}> ${item.item_price}</span>
                  {editPrice.get(item.id) ? (
                    <form
                      onSubmit={(e: any) =>
                        editStock(
                          e,
                          item.id,
                          e.target.elements.priceAmount.value,
                          "price"
                        )
                      }
                      className="inline-flex items-center"
                    >
                      <input
                        name="priceAmount"
                        type="number"
                        step=".01"
                        className="w-20 border border-gray-300 rounded px-2 py-1 mr-2"
                      />
                      <button
                        type="submit"
                        className="text-teal-600 hover:text-teal-800 mr-2"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => toggleEdit(item.id, "price")}
                        className="text-gray-600 hover:text-gray-800"
                      >
                        Cancel
                      </button>
                    </form>
                  ) : (
                    <button
                      onClick={() => toggleEdit(item.id, "price")}
                      className="text-teal-600 hover:text-teal-800 hover:underline"
                    >
                      Edit
                    </button>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`mr-2 ${
                      item.item_stock <= 15 ? "text-red-600" : ""
                    }`}
                  >
                    {item.item_stock}
                  </span>
                  {editItems.get(item.id) ? (
                    <form
                      onSubmit={(e: any) =>
                        editStock(
                          e,
                          item.id,
                          e.target.elements.stockAmount.value,
                          "stock"
                        )
                      }
                      className="inline-flex items-center"
                    >
                      <input
                        min="0"
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
                        onClick={() => toggleEdit(item.id, "stock")}
                        className="text-gray-600 hover:text-gray-800"
                      >
                        Cancel
                      </button>
                    </form>
                  ) : (
                    <button
                      onClick={() => toggleEdit(item.id, "stock")}
                      className="text-teal-600 hover:text-teal-800 hover:underline"
                    >
                      Edit
                    </button>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="mr-2"> {item.item_size}</span>
                  {editSize.get(item.id) ? (
                    <form
                      onSubmit={(e: any) =>
                        editStock(
                          e,
                          item.id,
                          e.target.elements.sizeAmount.value,
                          "size"
                        )
                      }
                      className="inline-flex items-center"
                    >
                      <input
                        name="sizeAmount"
                        type="text"
                        className="w-16 border border-gray-300 rounded px-2 py-1 mr-2"
                      />
                      <button
                        type="submit"
                        className="text-teal-600 hover:text-teal-800 mr-2"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => toggleEdit(item.id, "size")}
                        className="text-gray-600 hover:text-gray-800"
                      >
                        Cancel
                      </button>
                    </form>
                  ) : (
                    <button
                      onClick={() => toggleEdit(item.id, "size")}
                      className="text-teal-600 hover:text-teal-800 hover:underline"
                    >
                      Edit
                    </button>
                  )}{" "}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="mr-2"> {item.item_units}</span>
                  {editUnits.get(item.id) ? (
                    <form
                      onSubmit={(e: any) =>
                        editStock(
                          e,
                          item.id,
                          e.target.elements.unitsAmount.value,
                          "units"
                        )
                      }
                      className="inline-flex items-center"
                    >
                      <input
                        name="unitsAmount"
                        type="text"
                        className="w-16 border border-gray-300 rounded px-2 py-1 mr-2"
                      />
                      <button
                        type="submit"
                        className="text-teal-600 hover:text-teal-800 mr-2"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => toggleEdit(item.id, "units")}
                        className="text-gray-600 hover:text-gray-800"
                      >
                        Cancel
                      </button>
                    </form>
                  ) : (
                    <button
                      onClick={() => toggleEdit(item.id, "units")}
                      className="text-teal-600 hover:text-teal-800 hover:underline"
                    >
                      Edit
                    </button>
                  )}{" "}
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
          onSubmit={(e) =>
            createItem(
              e,
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
