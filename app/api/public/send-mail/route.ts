import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const { subject, description, fullName, userEmail } = await req.json(); // Extract data from the request body

    if (!subject || !description || !fullName || !userEmail) {
      return NextResponse.json(
        { message: "Please provide all required fields" },
        { status: 400 }
      );
    }

    // Create a transporter using environment variables
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // Your email from the .env file
        pass: process.env.EMAIL_PASS, // App-specific password
      },
    });

    // Mail options
    const mailOptions = {
      from: `"Contact Form" <${process.env.EMAIL_USER}>`, // Sender address
      to: process.env.EMAIL_RECEIVER, // Receiver's email address
      subject: subject, // Subject from form
      //   text: `Message from: ${userEmail}\n\n${description}`, // Email content
      html: emailTemplate(fullName, userEmail, subject, description),
    };

    try {
      // Send mail
      await transporter.sendMail(mailOptions);
      return NextResponse.json(
        { message: "Email sent successfully!" },
        { status: 200 }
      );
    } catch (error) {
      console.error("Error sending email:", error);
      return NextResponse.json(
        { message: "Failed to send email", error: error },
        { status: 500 }
      );
    }
  } catch (error) {
    console.log("error", error);
    return NextResponse.json({ error: "Failed to send mail" }, { status: 500 });
  }
}

const emailTemplate = (
  fullName: string,
  userEmail: string,
  subject: string,
  description: string
) => {
  return `<div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <h2 style="color: #0056b3;">New Contact Form Submission</h2>
          <p>Hello,</p>
          <p>You have received a new message through the contact form on your website. Here are the details:</p>
          <p><b>Full Name:</b> ${fullName}</p>
          <p><b>Email Address:</b> <a href="mailto:${userEmail}">${userEmail}</a></p>
          <p><b>Subject:</b> ${subject}</p>
          <p><b>Message:</b></p>
          <p style="background-color: #f9f9f9; padding: 10px; border-radius: 5px;">${description}</p>
          <p>Thank you,<br>Your Website Team</p>
        </div>
      `;
};
