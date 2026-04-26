/**
 * Cloudflare Pages Function — POST /api/contact
 * Receives the contact form and sends an email via Resend API.
 * Required environment variable (set in Cloudflare Pages dashboard):
 *   RESEND_API_KEY  →  your Resend API key (re_xxxxxxxx)
 */
export async function onRequestPost(context) {
  const { request, env } = context;

  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  };

  try {
    // Parse JSON body sent from main.js
    const body = await request.json();
    const { name, email, phone, subject, message, botcheck } = body;

    // Honeypot — reject bots silently
    if (botcheck) {
      return new Response(JSON.stringify({ success: true }), {
        headers: corsHeaders,
      });
    }

    // Basic validation
    if (!name || !email || !subject || !message) {
      return new Response(
        JSON.stringify({ success: false, message: "Missing required fields." }),
        { status: 400, headers: corsHeaders }
      );
    }

    // Check API key is configured
    if (!env.RESEND_API_KEY) {
      return new Response(
        JSON.stringify({ success: false, message: "Email service not configured." }),
        { status: 500, headers: corsHeaders }
      );
    }

    // Send via Resend
    const resendRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "GET Digital Services <noreply@getservices.live>",
        to: ["get.corp.je@gmail.com"],
        reply_to: email,
        subject: `[Contact] ${subject}`,
        html: `
          <div style="font-family:sans-serif;max-width:600px;margin:0 auto;">
            <h2 style="color:#07142b">New Contact Form Submission</h2>
            <table style="width:100%;border-collapse:collapse;">
              <tr><td style="padding:8px 0;color:#64748b;width:100px"><strong>Name</strong></td><td>${name}</td></tr>
              <tr><td style="padding:8px 0;color:#64748b"><strong>Email</strong></td><td><a href="mailto:${email}">${email}</a></td></tr>
              <tr><td style="padding:8px 0;color:#64748b"><strong>Phone</strong></td><td>${phone || "Not provided"}</td></tr>
              <tr><td style="padding:8px 0;color:#64748b"><strong>Subject</strong></td><td>${subject}</td></tr>
            </table>
            <hr style="border:1px solid #dfe7f2;margin:16px 0">
            <p style="color:#101828;white-space:pre-wrap">${message}</p>
            <hr style="border:1px solid #dfe7f2;margin:16px 0">
            <p style="color:#94a3b8;font-size:13px">Sent from getservices.live contact form</p>
          </div>
        `,
      }),
    });

    if (resendRes.ok) {
      return new Response(JSON.stringify({ success: true }), {
        headers: corsHeaders,
      });
    }

    const errData = await resendRes.json();
    throw new Error(errData.message || "Failed to send email");

  } catch (err) {
    return new Response(
      JSON.stringify({ success: false, message: err.message || "Server error" }),
      { status: 500, headers: corsHeaders }
    );
  }
}

// Handle OPTIONS preflight
export async function onRequestOptions() {
  return new Response(null, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
