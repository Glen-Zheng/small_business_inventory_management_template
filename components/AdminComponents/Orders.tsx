"use client";
import React from "react";
import { useEffect, useState } from "react";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

const Orders = () => {
  //may restrict orders in the future to only be the orders that i care about, which is why grosstotal should be a useState.
  const [orders, setOrders] = useState<any[]>([]);
  const [orderData, setOrderData] = useState<Map<number, boolean>>(new Map());
  const [grossTotal, setGrossTotal] = useState<number>(0);
  useEffect(() => {
    async function getOrders() {
      try {
        const response = await fetch("/api/admin/inventory/orders");

        const data = await response.json();

        setOrders(data);
      } catch (error) {
        console.log("failed to get the inventory orders", error);
      }
    }
    getOrders();
  }, []);

  useEffect(() => {
    if (orders[0] !== null) {
      const initialOrderData = new Map<number, boolean>();
      setGrossTotal(0);
      let total: number = 0;
      for (const order of orders) {
        initialOrderData.set(order.order_id, false);
        if (order.total_amount !== null) total += Number(order.total_amount);
      }
      setOrderData(initialOrderData);
      setGrossTotal(total);
    }
  }, [orders]);
  //shoukld remove it i think

  const downloadOrderPDF = (e: any, order: any) => {
    e.stopPropagation();

    const doc = new jsPDF();

    // Add title
    doc.setFontSize(18);
    doc.text(`Order #${order.order_id}`, 14, 22);

    // Add order details
    doc.setFontSize(12);
    doc.text(`Date (UTC): ${order.order_date.substring(0, 10)}`, 14, 32);
    doc.text(`Store: ${order.store_location}`, 14, 40);
    doc.text(`Status: ${order.order_status}`, 14, 48);

    // Add contact information
    doc.text("Contact Information:", 14, 60);
    doc.setFontSize(10);
    doc.text(`Name: ${order.contact_name}`, 20, 68);
    doc.text(`Email: ${order.contact_info}`, 20, 76);
    doc.text(`Shipping Address: ${order.buyer_location}`, 20, 84);

    // Add items table
    doc.autoTable({
      startY: 95,
      head: [["Item", "Size - Units", "Quantity", "Cost"]],
      body: order.items.map((item: any) => [
        item.item_name,
        `${item.item_size} - ${item.item_units}`,
        item.item_quantity,
        `$${item.item_cost}`,
      ]),
    });

    // Add total
    const finalY = doc.lastAutoTable.finalY || 120;
    doc.setFontSize(12);
    doc.setFont("merriweather", "bold");
    doc.text(`Total: $${order.total_amount}`, 14, finalY + 10);

    // Save the PDF
    doc.save(`Order_${order.order_id}.pdf`);
  };

  const orderComplete = async (orderId: number) => {
    try {
      const response = await fetch("/api/admin/inventory/orders", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: orderId,
        }),
      });

      if (response.ok) {
        setOrders((prevOrders) => {
          const updatedOrders = [...prevOrders]; // Create a new array based on prevOrders
          const index = updatedOrders.findIndex(
            (order) => order.order_id === orderId
          );
          if (index !== -1) {
            updatedOrders[index].order_status = "Completed";
          }
          return updatedOrders;
        });
      }
    } catch (error) {
      console.log("failed to mark order complete, error");
    }
  };
  const toggleOrderDetails = (id: number) => {
    const newMap = new Map(orderData);
    const toggled = newMap.get(id) || false;
    newMap.set(id, !toggled);
    setOrderData(newMap);
  };

  const archiveOrder = async (e: any, id: number) => {
    e.stopPropagation();
    try {
      const response = await fetch("/api/admin/inventory/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id,
        }),
      });
      if (response.ok) {
        setOrders((prevOrders) => {
          const updatedOrders = [...prevOrders];
          const index = updatedOrders.findIndex(
            (order) => order.order_id === id
          );
          if (index !== -1) {
            updatedOrders.splice(index, 1);
          }
          return updatedOrders;
        });
      }
    } catch (error) {
      console.error("error occurred with archiving");
    }
  };

  //redo this when we update the orders.
  return (
    <div className="w-full mx-auto p-6 h-screen flex flex-col">
      <h1 className="text-2xl font-bold mb-6">Orders</h1>
      <div className="bg-white shadow-md rounded-lg overflow-hidden flex-grow flex flex-col">
        <div className="bg-gray-100 p-4 font-semibold">
          <div className="grid grid-cols-5 gap-4">
            <span>Order #</span>
            <span>Date (UTC)</span>
            <span>Store</span>
            <span>Status</span>
            <span></span>
          </div>
        </div>
        <div className="overflow-y-auto flex-grow">
          {orders[0] !== null &&
            orders
              .slice()
              .reverse()
              .map((order: any) => (
                <div
                  key={order.order_id}
                  className="border-b border-gray-200 last:border-b-0"
                >
                  <div
                    onClick={() => toggleOrderDetails(order.order_id)}
                    className="grid grid-cols-5 gap-4 items-center p-4 hover:bg-gray-100 cursor-pointer transition duration-150 ease-in-out"
                  >
                    <span className="font-medium">#{order.order_id}</span>
                    <span className="text-gray-600">
                      {order.order_date.substring(0, 10)}
                    </span>
                    <span className="text-gray-600">
                      {order.store_location}
                    </span>
                    <span className="flex items-center">
                      {order.order_status === "Pending" ? (
                        <i className="fa-regular fa-clock text-yellow-500 mr-2"></i>
                      ) : order.order_status === "Completed" ? (
                        <i className="fa-solid fa-check text-green-500 mr-2"></i>
                      ) : null}
                      {order.order_status}
                    </span>
                    <div className="justify-self-end flex w-9/12 justify-between">
                      <i
                        onClick={(e) => archiveOrder(e, order.order_id)}
                        className=" text-xl fa-solid fa-box-archive text-orange-900 hover:text-turqoise"
                      ></i>
                      <div
                        className="group"
                        onClick={(e) => downloadOrderPDF(e, order)}
                      >
                        <div className="flex items-center justify-center cursor-pointer transition duration-300 ease-in-out">
                          <i className=" text-xl text-emerald-500 group-hover:text-emerald-600 group-active:animate-bounce-down fas fa-file-arrow-down"></i>
                        </div>
                      </div>
                      <i
                        className={`fas fa-chevron-${
                          orderData.get(order.order_id) ? "up" : "down"
                        } text-gray-400 `}
                      ></i>
                    </div>
                  </div>
                  {orderData.get(order.order_id) && (
                    <div className="bg-amber-50 p-4">
                      {order.items.length ? (
                        <div className="space-y-2">
                          {order.items.map((item: any) => (
                            <div
                              key={item.item_name}
                              className="flex justify-between items-center"
                            >
                              <span className="font-medium">
                                {item.item_name} -{" "}
                                <span className="text-gray-600">
                                  {item.item_quantity}x
                                </span>
                              </span>
                              <span className="text-gray-600">
                                ${item.item_cost}
                              </span>
                            </div>
                          ))}
                          <div className="bg-white p-4 rounded-lg shadow-md shadow-turqoise w-fit">
                            <p className="font-semibold font-merriweather">
                              Contact Name:{" "}
                              <span className="font-normal">
                                {order.contact_name}
                              </span>
                            </p>
                            <p className="font-semibold font-merriweather">
                              Contact Email:{" "}
                              <span className="font-normal">
                                {order.contact_info}
                              </span>
                            </p>
                            <p className="font-semibold font-merriweather">
                              Shipping Address:{" "}
                              <span className="font-normal">
                                {order.buyer_location}
                              </span>
                            </p>
                          </div>
                          <div className="border-t border-gray-200 pt-2 mt-2 flex justify-between items-center">
                            {order.order_status === "Pending" && (
                              <p
                                onClick={() => orderComplete(order.order_id)}
                                className="font-left underline hover:text-turqoise cursor-pointer text-blue-600"
                              >
                                Mark as Completed (Irreversible)
                              </p>
                            )}
                            <p className="font-bold text-right grow">
                              Total: ${order.total_amount}
                            </p>
                          </div>
                        </div>
                      ) : (
                        <p className="text-center text-gray-500">Empty Order</p>
                      )}
                    </div>
                  )}
                </div>
              ))}
        </div>
        <p>Gross Total: ${grossTotal.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default Orders;
