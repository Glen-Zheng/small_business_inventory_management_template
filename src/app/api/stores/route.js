// pages/api/stores.js
import pool from "../../../../utils/database";

export const GET = async (req) => {
  try {
    const [rows] = await pool.execute(
      "SELECT id, store_location FROM stores WHERE is_deleted = ?",
      [0]
    );
    console.log("API response data:", rows); // Add this line

    return new Response(JSON.stringify(rows), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all stores", { status: 500 });
  }
};
