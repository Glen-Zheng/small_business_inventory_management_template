"use client";
import React from "react";
import { useEffect, useState } from "react";

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
        console.log(data);
      } catch (error) {
        console.log("failed to get the inventory orders", error);
      }
    }
    getOrders();
  }, []);

  useEffect(() => {
    if (orders.length !== 0) {
      const initialOrderData = new Map<number, boolean>();
      setGrossTotal(0);
      let total: number = 0;
      for (const order of orders) {
        initialOrderData.set(order.order_id, false);
        console.log(typeof order.total_amount);
        if (order.total_amount !== null) total += Number(order.total_amount);
      }
      setOrderData(initialOrderData);
      setGrossTotal(total);
    }
  }, [orders]);
  //shoukld remove it i think

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
        let ordersObject = orders;
        ordersObject[
          ordersObject.findIndex((element: any) => element.order_id === orderId)
        ].order_status = "Completed";
        setOrders(ordersObject);
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
          {orders
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
                  <span className="text-gray-600">{order.store_location}</span>
                  <span className="flex items-center">
                    {order.order_status === "Pending" ? (
                      <i className="fa-regular fa-clock text-yellow-500 mr-2"></i>
                    ) : order.order_status === "Completed" ? (
                      <i className="fa-solid fa-check text-green-500 mr-2"></i>
                    ) : null}
                    {order.order_status}
                  </span>
                  <i
                    className={`fas fa-chevron-${
                      orderData.get(order.order_id) ? "up" : "down"
                    } text-gray-400 justify-self-end`}
                  ></i>
                </div>
                {orderData.get(order.order_id) && (
                  <div className="bg-gray-50 p-4">
                    {order.items.length ? (
                      <div className="space-y-2">
                        {order.items.map((item: any) => (
                          <div
                            key={item.item_name}
                            className="flex justify-between items-center"
                          >
                            <span>
                              {item.item_name} - {item.item_quantity}x
                            </span>
                            <span className="text-gray-600">
                              ${item.item_cost}
                            </span>
                          </div>
                        ))}
                        <div className="border-t border-gray-200 pt-2 mt-2 flex justify-between items-center">
                          {order.order_status === "Pending" && (
                            <p
                              onClick={() => orderComplete(order.order_id)}
                              className="font-left underline hover:text-turqoise cursor-pointer"
                            >
                              Mark as Complete (Irreversible)
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
        <p>Gross Total: ${grossTotal}</p>
      </div>
    </div>
  );
};

export default Orders;
