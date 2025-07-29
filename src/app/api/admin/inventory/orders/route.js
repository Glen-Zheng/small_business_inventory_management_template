import pool from "../../../../../../utils/database";

export const GET = async (req) => {
  try {
    const [orders] = await pool.execute(
      "SELECT so.id AS order_id, so.total_amount, so.order_date, stores.store_location, so.contact_info, so.contact_name, so.buyer_location, so.order_status, oi.quantity, oi.cost, ii.item_name, ii.item_price, ii.item_size, ii.item_units FROM store_orders so LEFT JOIN stores ON so.store_id = stores.id LEFT JOIN ordered_items oi ON so.id = oi.order_id LEFT JOIN inventory_items ii ON oi.inventory_item_id = ii.id ORDER BY so.id, ii.item_name;"
    );

    let finalOrderData = [];
    let currentOrder = null;

    for (const row of orders) {
      if (!currentOrder || row.order_id !== currentOrder.order_id) {
        if (currentOrder) {
          finalOrderData.push(currentOrder);
        }
        currentOrder = {
          order_id: row.order_id,
          total_amount: row.total_amount,
          order_date: row.order_date,
          store_location: row.store_location,
          contact_info: row.contact_info,
          contact_name: row.contact_name,
          buyer_location: row.buyer_location,
          order_status: row.order_status,
          items: [],
        };
      }
      if (row.item_name !== null) {
        currentOrder.items.push({
          item_name: row.item_name,
          item_quantity: row.quantity,
          item_cost: row.cost,
          item_price: row.item_price,
          item_size: row.item_size,
          item_units: row.item_units,
        });
      }
    }
    finalOrderData.push(currentOrder);

    return new Response(JSON.stringify(finalOrderData), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch orders", { status: 500 });
  }
};

export const PATCH = async (request) => {
  const { id } = await request.json();

  try {
    const query =
      "UPDATE store_orders SET order_status = 'Completed' WHERE id = ?";

    const [result] = await pool.execute(query, [id]);

    if (result.affectedRows === 1) {
      return new Response("Successful order status update", { status: 200 });
    }
  } catch (error) {
    return new Response("Failed to update order status", { status: 500 });
  }
};

export const POST = async (request) => {
  let connection;
  try {
    const { id } = await request.json();

    connection = await pool.getConnection();
    await connection.beginTransaction();

    await connection.execute("DROP TEMPORARY TABLE IF EXISTS temp_deleted");
    await connection.execute("DROP TEMPORARY TABLE IF EXISTS temp_deleted2");

    await connection.execute(
      `
      CREATE TEMPORARY TABLE temp_deleted(id INT PRIMARY KEY) AS
      SELECT * FROM store_orders WHERE id = ?
    `,
      [id]
    );

    await connection.execute(
      `
      CREATE TEMPORARY TABLE temp_deleted2(id INT PRIMARY KEY) AS
      SELECT * FROM ordered_items WHERE order_id = ?
    `,
      [id]
    );

    await connection.execute("DELETE FROM store_orders WHERE id = ?", [id]);

    await connection.execute(`
      INSERT INTO archived_orders (
        id, store_id, total_amount, order_date, contact_info,
        contact_name, buyer_location, order_status
      )
      SELECT id, store_id, total_amount, order_date, contact_info,
        contact_name, buyer_location, order_status
      FROM temp_deleted
    `);

    await connection.execute(`
      INSERT INTO archived_ordered_items
      SELECT * FROM temp_deleted2
    `);

    await connection.execute("DROP TEMPORARY TABLE temp_deleted");
    await connection.execute("DROP TEMPORARY TABLE temp_deleted2");

    await connection.commit();

    return new Response("Successful order archive", { status: 200 });
  } catch (error) {
    if (connection) await connection.rollback();
    console.error("Error:", error);
    return new Response("Failed to archive order", { status: 500 });
  } finally {
    if (connection) connection.release();
  }
};
