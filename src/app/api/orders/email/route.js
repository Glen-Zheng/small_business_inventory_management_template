import nodemailer from "nodemailer";
import writeXlsxFile from "write-excel-file/node";

export async function POST(req) {
  try {
    const { email, pdfContent, total, shipping_location, store, name } =
      await req.json();

    // Validate input
    if (!email || !pdfContent || !Array.isArray(pdfContent)) {
      throw new Error("Invalid input data");
    }

    const now = new Date();
    const timestamp = now.toLocaleString();

    console.log("Received email:", email);
    console.log("Received pdfContent:", JSON.stringify(pdfContent));

    const data = [
      [{ value: "Order Details", fontWeight: "bold", fontSize: 16 }],
      [],
      [{ value: "Store:", fontWeight: "bold" }, { value: store }],
      [{ value: "Customer Name:", fontWeight: "bold" }, { value: name }],
      [
        { value: "Shipping Location:", fontWeight: "bold" },
        { value: shipping_location },
      ],
      [
        { value: "Order Date (EST):", fontWeight: "bold" },
        { value: timestamp },
      ],
      [],
      [
        { value: "Item", fontWeight: "bold" },
        { value: "Quantity", fontWeight: "bold" },
        { value: "Item Size - Units", fontWeight: "bold" },
        { value: "Price", fontWeight: "bold" },
      ],
    ];

    for (let i = 0; i < pdfContent.length; ++i) {
      if (pdfContent[i] && pdfContent[i].item_name) {
        const row = [
          { value: pdfContent[i].item_name },
          { value: pdfContent[i].quantity },
          { value: `${pdfContent[i].item_size} - ${pdfContent[i].item_units}` },
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
        { value: "Total:", fontWeight: "bold" },
        { value: `$${total.toFixed(2)}`, fontWeight: "bold" },
      ]
    );

    const stream = await writeXlsxFile(data, {
      fontFamily: "Arial",
      fontSize: 11,
      sheet: "Order Summary",
    });

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
    let mailOptionsAdmin = {
      from: process.env.EMAIL_USER,
      to: "hi@hiyogurt.com",
      subject: `${store} Hi Yogurt Order`,
      text: `Please find the order details placed by ${store}`,
      attachments: [
        {
          filename: "order_details.xlsx ",
          content: stream,
        },
      ],
    };

    let mailOptionsStore = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Hi Yogurt Order",
      text: `Hi ${name}. Please find your order details attached.`,
      attachments: [
        {
          filename: "order_details.xlsx ",
          content: stream,
        },
      ],
    };

    // Debug: Check mail options
    console.log("Mail options Admin:", mailOptionsAdmin);
    console.log("Mail options Store:", mailOptionsStore);

    // Send email
    await transporter.sendMail(mailOptionsAdmin);
    await transporter.sendMail(mailOptionsStore);
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
