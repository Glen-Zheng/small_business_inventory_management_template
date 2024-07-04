import pool from "@/utils/database";

export const DELETE = async (request) => {
  try {
    const { store } = await request.json();
    if (!store) {
      return new Response("Store location must be specified", {
        status: 400,
      });
    }
    const query = "DELETE FROM stores WHERE store_location = ?";

    const [result] = await pool.execute(query, [store]);

    if (result.affectedRows === 1) {
      return new Response("Successful deletion of store", { status: 200 });
    } else {
      // If no rows or more than one row are affected, return a not found response
      return new Response("No store found with the specified location", {
        status: 404,
      });
    }
  } catch (error) {
    return new Response("Failed to delete the specified store", {
      status: 500,
    });
  }
};
