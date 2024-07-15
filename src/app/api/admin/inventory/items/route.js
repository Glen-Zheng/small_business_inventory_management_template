import pool from "@/utils/database";

export const GET = async (req) => {
  try {
    const [rows] = await pool.execute(
      "SELECT inventory_items.id, ingredient_categories.category_name, ingredient_categories.id AS category_id, inventory_items.item_name, inventory_items.item_price, inventory_items.item_stock, inventory_items.item_size, inventory_items.item_units FROM inventory_items INNER JOIN ingredient_categories ON inventory_items.category_id = ingredient_categories.id WHERE inventory_items.is_deleted = ? ORDER BY inventory_items.category_id;",
      [0]
    );

    return new Response(JSON.stringify(rows), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch items", { status: 500 });
  }
};

export const DELETE = async (req) => {
  try {
    const { id } = await req.json();
    if (!id) {
      return new Response("Inventory item must be specified", {
        status: 400,
      });
    }
    // const query = "DELETE FROM inventory_items WHERE id = ?";
    const query = "UPDATE inventory_items SET is_deleted = ? WHERE id = ?";
    //implemented soft delete to maintain referential data integrity with deleting

    const [result] = await pool.execute(query, [1, id]);

    if (result.affectedRows === 1) {
      return new Response("Successful deletion of inventory item", {
        status: 200,
      });
    } else {
      // If no rows or more than one row are affected, return a not found response
      return new Response("Item not found", {
        status: 404,
      });
    }
  } catch (error) {
    return new Response("Failed to delete the specified item", {
      status: 500,
    });
  }
};

export const POST = async (req) => {
  try {
    const {
      categoryId,
      item_name,
      item_price,
      item_stock,
      item_size,
      item_units,
    } = await req.json();

    const query =
      "INSERT INTO inventory_items (category_id, item_name, item_price, item_stock, item_size, item_units) VALUES (?, ?, ?, ?, ?, ?)";

    const [result] = await pool.execute(query, [
      categoryId,
      item_name,
      item_price,
      item_stock,
      item_size,
      item_units,
    ]);

    if (result.affectedRows === 1) {
      const [[{ "LAST_INSERT_ID()": resultID }]] = await pool.execute(
        "SELECT LAST_INSERT_ID();"
      );
      const [[{ category_id: resultCat }]] = await pool.execute(
        `SELECT category_id from inventory_items WHERE id = ?;`,
        [resultID]
      );
      const [[{ category_name }]] = await pool.execute(
        `SELECT category_name from ingredient_categories WHERE id = ?;`,
        [resultCat]
      );
      return new Response(
        JSON.stringify({
          createdItemID: resultID,
          createdItemCat: category_name,
          message: "Successfully added item",
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      );
    } else {
      return new Response(JSON.stringify({ message: "Failed to add item" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  } catch (error) {
    console.error("Error in POST request:", error);
    return new Response(
      JSON.stringify({
        message: "Failed to create a item",
        error: error.message,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};
export const PATCH = async (req) => {
  const { id, stockAmount } = await req.json();

  try {
    const query = "UPDATE inventory_items SET item_stock = ? WHERE id = ?";

    const [result] = await pool.execute(query, [stockAmount, id]);

    if (result.affectedRows === 1) {
      return new Response("Successful item stock update", { status: 200 });
    }
  } catch (error) {
    return new Response("Failed to update item_stock", { status: 500 });
  }
};
