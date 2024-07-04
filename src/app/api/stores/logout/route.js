export async function POST(req) {
  return new Response(JSON.stringify({ message: "Logout successful" }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Set-Cookie":
        "token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT; HttpOnly",
    },
  });
}
