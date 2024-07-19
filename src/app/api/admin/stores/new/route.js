import pool from "../../../../../../utils/database";
import bcrypt from "bcrypt";

export async function POST(req) {
  try {
    const { storeLocation, password } = await req.json();

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const query =
      "INSERT INTO stores (store_location, hashed_password) VALUES (?, ?)";

    const [result] = await pool.execute(query, [storeLocation, hashedPassword]);

    if (result.affectedRows === 1) {
      const [[{ "LAST_INSERT_ID()": newStoreId }]] = await pool.execute(
        "SELECT LAST_INSERT_ID();"
      );
      return new Response(
        JSON.stringify({ message: "Successfully added store", id: newStoreId }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      );
    } else {
      return new Response(JSON.stringify({ message: "Failed to add store" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  } catch (error) {
    console.error("Error in POST request:", error);
    return new Response(
      JSON.stringify({
        message: "Failed to create a new store",
        error: error.message,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
