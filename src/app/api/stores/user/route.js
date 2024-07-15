import { jwtVerify } from "jose";
import pool from "@/utils/database";
export async function GET(req) {
  try {
    // const url = new URL(req.url);
    // const chosenStore = url.searchParams.get("store_selected");
    // console.log(chosenStore);
    const token = req.cookies.get("token")?.value;

    if (!token) {
      return new Response(
        JSON.stringify({ message: "no existing user - no token found" }),
        {
          status: 404,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
    const {
      payload: { userID: id },
    } = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT_secret)
    );

    const [[{ store_location: existingSessionStore }]] = await pool.execute(
      "SELECT store_location FROM stores WHERE id = ?",
      [id]
    );
    if (existingSessionStore) {
      // if (existingSessionStore == chosenStore) {
      return new Response(
        JSON.stringify({ store_location: existingSessionStore }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
      // } else {
      //   return new Response(
      //     JSON.stringify({ message: "Can not access this store" }),
      //     { status: 401, headers: { "Content-Type": "application/json" } }
      //   );
      // }
    }
    return new Response(
      JSON.stringify({
        message:
          "No store found matching the token - hard to reach here right now",
      }),
      { status: 404 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Finding existing user successful" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
