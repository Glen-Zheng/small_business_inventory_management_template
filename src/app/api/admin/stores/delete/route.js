import pool from "@/utils/database";

export const DELETE = async (request) => {
  try {
    const { id } = await request.json();
    if (!id) {
      return new Response("Store id must be specified", {
        status: 400,
      });
    }
    // const query = "DELETE FROM stores WHERE store_location = ?";
    const query = "UPDATE stores SET is_deleted = ? WHERE id = ?";
    //implemented soft delete to maintain referential data integrity with deleting

    const [result] = await pool.execute(query, [1, id]);

    if (result.affectedRows === 1) {
      return new Response("Successful deletion of store", { status: 200 });
    } else {
      // If no rows or more than one row are affected, return a not found response
      return new Response("No store found with the specified id", {
        status: 404,
      });
    }
  } catch (error) {
    return new Response("Failed to delete the specified store", {
      status: 500,
    });
  }
};
