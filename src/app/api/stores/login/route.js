import bcrypt from "bcrypt";
import pool from "../../../../../utils/database";
import jwt from "jsonwebtoken";

export async function POST(req) {
  try {
    const { storeLocation, password } = await req.json();

    // Query to get the store's hashed password
    const query = "SELECT hashed_password FROM stores WHERE store_location = ?";
    const [rows] = await pool.execute(query, [storeLocation]);
    console.log(rows);

    if (rows.length === 0) {
      return new Response(JSON.stringify({ message: "Store not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    const storedHash = rows[0].hashed_password;

    // Compare the provided password with the stored hash
    const isMatch = await bcrypt.compare(password, storedHash);

    if (isMatch) {
      const [[{ id: storeID }]] = await pool.execute(
        "SELECT id from stores WHERE store_location = ?",
        [storeLocation]
      );
      //the first object is the payload, very important when creating cookie
      const token = jwt.sign(
        { userID: storeID, role: "user" },
        process.env.JWT_secret,
        {
          expiresIn: "1h",
        }
      );
      return new Response(
        JSON.stringify({
          message: "Login successful",
        }),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json",
            "Set-Cookie": `token=${token}; HttpOnly; Path=/; Max-Age=3600; SameSite=Strict`,
          },
        }
      );
    } else {
      return new Response(JSON.stringify({ message: "Invalid credentials" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }
  } catch (error) {
    console.error("Login error:", error);
    return new Response(
      JSON.stringify({ message: "An error occurred during login" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
