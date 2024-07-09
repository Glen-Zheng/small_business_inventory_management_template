import nodemailer from "nodemailer";

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

    for (let i = 0; i < pdfContent.length; ++i) {
      if (pdfContent[i] && pdfContent[i].item_name) {
        textContent += `${pdfContent[i].item_name} x${
          pdfContent[i].quantity
        } : $${(pdfContent[i].quantity * pdfContent[i].item_price).toFixed(
          2
        )}\n`;
      } else {
        console.warn(`Invalid item at index ${i}:`, pdfContent[i]);
      }
    }
    textContent += `\n\n Total: $${total.toFixed(2)}`;

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
          filename: "order_details.txt",
          content: textContent,
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
