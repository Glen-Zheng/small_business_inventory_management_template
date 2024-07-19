import pool from "../../../../../utils/database";

export async function POST(req) {
  try {
    const {
      cart_array,
      total_amount,
      contact_info,
      contact_name,
      location,
      sessionLocation,
    } = await req.json();
    const query =
      "INSERT INTO store_orders (store_id, total_amount, contact_info, contact_name, buyer_location) VALUES (?,?,?,?,?)";

    const [storeId] = await pool.execute(
      "SELECT id FROM stores WHERE store_location=?",
      [sessionLocation]
    );
    if (storeId.length > 0) {
      const [rows] = await pool.execute(query, [
        storeId[0].id,
        total_amount,
        contact_info,
        contact_name,
        location,
      ]);
    }

    const [[{ id: orderID }]] = await pool.execute(
      "SELECT LAST_INSERT_ID() AS id"
    );

    for (let i = 0; i < cart_array.length; ++i) {
      const stockQuery =
        "UPDATE inventory_items SET item_stock = ? WHERE id = ?;";
      const indItemQuery =
        "INSERT INTO ordered_items (order_id, inventory_item_id, quantity, cost) VALUES (?, ?, ?, ?)";
      const [result] = await pool.execute(indItemQuery, [
        orderID,
        cart_array[i].id,
        cart_array[i].quantity,
        cart_array[i].quantity * cart_array[i].item_price,
      ]);
      const [stockResult] = await pool.execute(stockQuery, [
        cart_array[i].item_stock - cart_array[i].quantity,
        cart_array[i].id,
      ]);
      if (result.affectedRows !== 1 && stockResult !== 1) {
        return new Response(
          JSON.stringify({ message: "Failed to add the order and its items" }),
          {
            status: 500,
            headers: { "Content-Type": "application/json" },
          }
        );
      }
    }

    return new Response(
      JSON.stringify({ message: "Successfully added your order" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error in POST request:", error);
    return new Response(
      JSON.stringify({
        message: "Failed to process your order",
        error: error.message,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
