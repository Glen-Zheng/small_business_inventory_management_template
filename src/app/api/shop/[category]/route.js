import pool from "../../../../../utils/database.js";

export const GET = async (req, { params }) => {
  try {
    let rows;
    if (params.category == "All") {
      [rows] = await pool.execute("SELECT * FROM inventory_items");
    } else {
      const [result] = await pool.execute(
        `SELECT id FROM ingredient_categories WHERE category_name=?`,
        [params.category]
      );

      if (result.length > 0) {
        [rows] = await pool.execute(
          `SELECT * FROM inventory_items WHERE category_id=?`,
          [result[0].id]
        );
      } else {
        return new Response("Category not found", { status: 404 });
      }
    }
    console.log("API response data:", rows); // Add this line
    return new Response(JSON.stringify(rows), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch items", { status: 500 });
  }
};

// export const PATCH = async (request, { params }) => {
//   const { prompt, tag } = await request.json();

//   try {
//     await connectToDB();

//     const existingPrompt = await Prompt.findById(params.id);

//     if (!existingPrompt)
//       return new Response("Prompt not found:", { status: 404 });

//     existingPrompt.prompt = prompt;
//     existingPrompt.tag = tag;

//     await existingPrompt.save();

//     return new Response(JSON.stringify(existingPrompt), { status: 200 });
//   } catch (error) {
//     return new Response("Failed to update prompt", { status: 500 });
//   }
// };

// export const DELETE = async (request, { params }) => {
//   try {
//     await connectToDB();

//     await Prompt.findByIdAndDelete(params.id);

//     return new Response("prompt deleted successfully", { status: 200 });
//   } catch (error) {
//     return new Response("Failed to delte prompt", { status: 500 });
//   }
// };
