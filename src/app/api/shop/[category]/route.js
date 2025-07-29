import pool from "../../../../../utils/database.js";

export const GET = async (req, { params }) => {
  try {
    let rows;
    if (params.category == "All") {
      [rows] = await pool.execute("SELECT * FROM inventory_items");
    } else {
      const [result] = await pool.execute(
        `SELECT id FROM ingredient_categories WHERE category_name=?`,
        [params.category]
      );

      if (result.length > 0) {
        [rows] = await pool.execute(
          `SELECT * FROM inventory_items WHERE category_id=?`,
          [result[0].id]
        );
      } else {
        return new Response("Category not found", { status: 404 });
      }
    }
    // console.log("API response data:", rows); // Add this line
    return new Response(JSON.stringify(rows), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch items", { status: 500 });
  }
};
