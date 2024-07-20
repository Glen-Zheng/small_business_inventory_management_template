// pages/api/stores.js
import pool from "../../../../utils/database";

export const POST = async (req) => {
  try {
    const [rows] = await pool.execute(
      "SELECT id, store_location FROM stores WHERE is_deleted = ?",
      [0]
    );
    console.log("API response data:", rows); // Add this line
    return new Response(JSON.stringify(rows), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control":
          "no-store, no-cache, must-revalidate, proxy-revalidate",
        Pragma: "no-cache",
        Expires: "0",
        "Surrogate-Control": "no-store",
        ETag: `"${Date.now()}"`,
      },
    });
  } catch (error) {
    return new Response("Failed to fetch all stores", { status: 500 });
  }
};
