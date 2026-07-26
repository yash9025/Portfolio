import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message } = body as {
      name: string;
      email: string;
      message: string;
    };

    // Validate fields
    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    // Basic email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address." },
        { status: 400 }
      );
    }

    // ── Log submission (wire Resend / EmailJS / Nodemailer here in production) ──
    console.log("[Contact Form]", {
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
      timestamp: new Date().toISOString(),
    });

    /*
     * Phase 5 production wiring — uncomment & configure ONE of:
     *
     * Option A: Resend
     * ─────────────────────────────────────
     * import { Resend } from "resend";
     * const resend = new Resend(process.env.RESEND_API_KEY);
     * await resend.emails.send({
     *   from: "portfolio@yourdomain.com",
     *   to: "agrawal6353@gmail.com",
     *   subject: `Portfolio contact from ${name}`,
     *   html: `<p><strong>From:</strong> ${name} (${email})</p><p>${message}</p>`,
     * });
     *
     * Option B: Nodemailer (Gmail SMTP)
     * ─────────────────────────────────────
     * import nodemailer from "nodemailer";
     * const transporter = nodemailer.createTransport({
     *   service: "gmail",
     *   auth: { user: process.env.GMAIL_USER, pass: process.env.GMAIL_PASS },
     * });
     * await transporter.sendMail({
     *   from: email,
     *   to: "agrawal6353@gmail.com",
     *   subject: `Portfolio: message from ${name}`,
     *   text: message,
     * });
     */

    return NextResponse.json({ success: true, message: "Message received!" });
  } catch (error) {
    console.error("[Contact API Error]", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
