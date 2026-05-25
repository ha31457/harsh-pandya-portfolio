import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: Request) {
  try {
    const { name, email, subject, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required fields." },
        { status: 400 }
      );
    }

    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
      // Local development fallback: Log email details to the server console
      console.log("\n================ MOCK EMAIL TRANSMISSION ================");
      console.log(`From Name: ${name}`);
      console.log(`From Email: ${email}`);
      console.log(`Subject:    ${subject || "Contact Form Event"}`);
      console.log(`Message:    ${message}`);
      console.log("=========================================================\n");
      console.warn(
        "RESEND_API_KEY environment variable is not defined. Email logged locally above."
      );
      
      return NextResponse.json(
        { 
          success: true, 
          message: "Mock transmission completed. Define RESEND_API_KEY in .env.local to activate actual delivery." 
        },
        { status: 200 }
      );
    }

    const resend = new Resend(apiKey);

    // Resend free tier allows sending from onboarding@resend.dev to the registered account owner email
    const { data, error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: "harshpandya31457@gmail.com",
      subject: subject || `Portfolio message from ${name}`,
      replyTo: email,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
          <h2 style="color: #3b82f6; border-bottom: 1px solid #e2e8f0; padding-bottom: 10px; margin-top: 0;">New Contact Form Message</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject || "N/A"}</p>
          <div style="margin-top: 20px;">
            <p><strong>Message:</strong></p>
            <div style="background-color: #f8fafc; padding: 15px; border-radius: 6px; border: 1px solid #e2e8f0; white-space: pre-wrap; font-size: 14px; line-height: 1.5; color: #334155;">${message}</div>
          </div>
          <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
          <p style="font-size: 10px; color: #94a3b8; text-align: center; margin-bottom: 0;">Automated email from harsh.dev portfolio endpoint.</p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend API Error details:", error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, data });
  } catch (err: any) {
    console.error("Internal Server Error in API route:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
