import bcrypt from "bcrypt";
import pool from "../../../../../utils/database";
import jwt from "jsonwebtoken";

export async function POST(req) {
  try {
    const { password } = await req.json();

    const query = "SELECT pass_key FROM admin_data WHERE usage_type = ?";
    const [[{ pass_key: storedHash }]] = await pool.execute(query, [
      "admin password",
    ]);
    console.log(rows);

    if (rows.length === 0) {
      return new Response(JSON.stringify({ message: "no admin (BAD)" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Compare the provided password with the stored hash
    const isMatch = await bcrypt.compare(password, storedHash);

    if (isMatch) {
      const token = jwt.sign({ role: "admin" }, process.env.JWT_secret, {
        expiresIn: "1h",
      });
      return new Response(JSON.stringify({ message: "Login successful" }), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Set-Cookie": `token=${token}; HttpOnly; Path=/; Max-Age=3600; SameSite=Strict`,
        },
      });
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
