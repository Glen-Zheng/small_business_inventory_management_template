import nodemailer from "nodemailer";
import writeXlsxFile from "write-excel-file/node";

export async function POST(req) {
  try {
    const { email, pdfContent, total } = await req.json();

    // Validate input
    if (!email || !pdfContent || !Array.isArray(pdfContent)) {
      throw new Error("Invalid input data");
    }

    console.log("Received email:", email);
    console.log("Received pdfContent:", JSON.stringify(pdfContent));

    // Create text content
    let textContent = "Order Details:\n\n";

    const data = [];

    const row = [
      {
        value: "Item",
        fontWeight: "bold",
      },
      {
        value: "Quantity",
        fontWeight: "bold",
      },
      {
        value: "Item Size and Units",
        fontWeight: "bold",
      },
      {
        value: "Price",
        fontWeight: "bold",
      },
    ];
    data.push(row);

    for (let i = 0; i < pdfContent.length; ++i) {
      if (pdfContent[i] && pdfContent[i].item_name) {
        const row = [
          { value: pdfContent[i].item_name },
          { value: `x${pdfContent[i].quantity}` },
          {
            value: ` ${pdfContent[i].item_size} - ${pdfContent[i].quantity}`,
          },
          {
            value: `$${(
              pdfContent[i].quantity * pdfContent[i].item_price
            ).toFixed(2)}`,
          },
        ];
        data.push(row);
      } else {
        console.warn(`Invalid item at index ${i}:`, pdfContent[i]);
      }
    }

    data.push(
      [],
      [
        { value: null },
        { value: null },
        { value: null },
        { value: `Total: $${total.toFixed(2)}` },
      ]
    );
    // textContent += `\n\n Total: $${total.toFixed(2)}`;
    const stream = await writeXlsxFile(data, {});

    // Set up nodemailer
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    console.log("Email user:", process.env.EMAIL_USER);
    console.log(
      "Email pass length:",
      process.env.EMAIL_PASS ? process.env.EMAIL_PASS.length : 0
    );

    // Set up email options
    let mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Hi Yogurt Order",
      text: "Please find your order details attached.",
      attachments: [
        {
          filename: "order_details.xlsx ",
          content: stream,
        },
      ],
    };

    // Debug: Check mail options
    console.log("Mail options:", mailOptions);

    // Send email
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");

    // Return success response
    return new Response(
      JSON.stringify({ message: "Successfully sent order details" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    // Handle errors
    console.error("Detailed error:", error);
    return new Response(
      JSON.stringify({
        message: "Email sending error",
        details: error.message,
        stack: error.stack,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
