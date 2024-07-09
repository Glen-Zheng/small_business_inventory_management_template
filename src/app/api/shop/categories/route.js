import pool from "../../../../../utils/database.js";

export const GET = async (req) => {
  try {
    const [rows] = await pool.execute("SELECT * FROM ingredient_categories");
    // console.log("API response data:", rows); // Add this line

    return new Response(JSON.stringify(rows), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all categories", { status: 500 });
  }
};
