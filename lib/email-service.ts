import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// Deliverability: FROM uses a human local-part (not "noreply"). For less spam:
// - In Resend: verify tirillogcc.com (or your subdomain) and add all DNS records (SPF, DKIM, DMARC).
// - We send multipart (text+html), Auto-Submitted (transactional), and List-Unsubscribe (broadcasts).
const FROM = "Tirill & CC <ikkesvar@tirillogcc.com>";
const REPLY_TO: string[] = ["ccnielsen5@gmail.com", "tirill.berg@gmail.com"];

interface SendPasswordResetEmailParams {
  to: string;
  resetUrl: string;
  userName?: string;
  token: string;
}

interface EmailResult {
  success: boolean;
  error?: unknown;
  data?: unknown;
}

function passwordResetText(userName: string | undefined, resetUrl: string): string {
  return `Hej ${userName || "der"},

Du har anmodet om at nulstille dit password til dit wedding account. Ingen bekymringer - det sker for os alle!

Klik på linket nedenfor for at oprette et nyt password:
${resetUrl}

Vigtigt: Dette link udløber om 1 time.

Hvis knappen ikke virker, kopier og indsæt linket i din browser.

Hvis du ikke har anmodet om denne nulstilling, kan du ignorere denne email - dit password forbliver uændret.

Tirill & CC`;
}

export async function sendPasswordResetEmail({
  to,
  resetUrl,
  userName,
}: SendPasswordResetEmailParams): Promise<EmailResult> {
  try {
    const { data, error } = await resend.emails.send({
      from: FROM,
      replyTo: REPLY_TO,
      to: [to],
      subject: "Nulstil dit password - Wedding",
      text: passwordResetText(userName, resetUrl),
      headers: { "Auto-Submitted": "auto-generated" },
      html: `
        <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #ffffff;">
          <!-- Header -->
          <div style="text-align: center; margin-bottom: 30px; padding: 20px; border-bottom: 2px solid #e5e7eb;">
            <h1 style="color: #374151; margin: 0; font-size: 24px; font-weight: 500;">
              Nulstil dit password
            </h1>
          </div>
          
          <!-- Greeting -->
          <div style="margin-bottom: 25px;">
            <p style="color: #374151; font-size: 16px; margin: 0 0 10px 0;">
              Hej ${userName || "der"},
            </p>
            <p style="color: #6b7280; font-size: 15px; line-height: 1.6; margin: 0;">
              Du har anmodet om at nulstille dit password til dit wedding account. Ingen bekymringer - det sker for os alle!
            </p>
          </div>
          
          <!-- Main CTA -->
          <div style="background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px; margin: 25px 0; text-align: center;">
            <p style="margin: 0 0 15px 0; font-size: 15px; color: #374151;">
              Klik på knappen nedenfor for at oprette et nyt password:
            </p>
            <a 
              href="${resetUrl}" 
              style="
                background-color: #8b4513; 
                color: white; 
                padding: 12px 24px; 
                text-decoration: none; 
                border-radius: 6px; 
                display: inline-block;
                font-weight: 500;
                font-size: 14px;
              "
            >
              Nulstil mit password
            </a>
          </div>
          
          <!-- Security warning -->
          <div style="background-color: #fef3c7; border: 1px solid #f59e0b; border-radius: 6px; padding: 15px; margin: 20px 0;">
            <p style="color: #92400e; margin: 0; font-size: 14px;">
              ⏰ <strong>Vigtigt:</strong> Dette nulstillingslink udløber om 1 time af sikkerhedsmæssige årsager.
            </p>
          </div>
          
          <!-- Fallback link -->
          <div style="margin: 20px 0;">
            <p style="color: #6b7280; font-size: 13px; margin: 0 0 8px 0;">
              Hvis knappen ikke virker, kopier og indsæt dette link i din browser:
            </p>
            <p style="color: #6b7280; font-size: 13px; word-break: break-all; background-color: #f9fafb; padding: 10px; border-radius: 4px; border-left: 3px solid #8b4513; margin: 0;">
              ${resetUrl}
            </p>
          </div>
          
          <!-- Divider -->
          <hr style="margin: 25px 0; border: none; border-top: 1px solid #e5e7eb;">
          
          <!-- Security tips -->
          <div style="background-color: #f9fafb; border-radius: 6px; padding: 15px; margin: 20px 0; border: 1px solid #e5e7eb;">
            <h3 style="color: #374151; margin: 0 0 10px 0; font-size: 15px; font-weight: 500;">
              Sikkerhedstips:
            </h3>
            <ul style="color: #6b7280; margin: 0; padding-left: 20px; font-size: 13px; line-height: 1.6;">
              <li>Vælg et stærkt, unikt password</li>
              <li>Genbrug ikke passwords fra andre konti</li>
              <li>Overvej at bruge en password manager</li>
            </ul>
          </div>
          
          <!-- Footer -->
          <div style="text-align: center; margin-top: 25px; padding: 15px; border-top: 1px solid #e5e7eb;">
            <p style="color: #9ca3af; font-size: 12px; margin: 0; line-height: 1.5;">
              Hvis du ikke har anmodet om denne password nulstilling, kan du ignorere denne email - dit password forbliver uændret.
              <br><br>
              <strong>Tirill & CC</strong>
            </p>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error("Password reset email sending error:", error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.error("Password reset email service error:", error);
    return { success: false, error };
  }
}

export interface SendAdminBroadcastParams {
  to: string[];
  subject: string;
  text: string;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

const BATCH_CHUNK_SIZE = 100; // Resend batch API max per request
const BATCH_CHUNK_DELAY_MS = 550; // Pause between batch API calls (rate limit)

export async function sendAdminBroadcast({
  to,
  subject,
  text,
}: SendAdminBroadcastParams): Promise<EmailResult> {
  if (to.length === 0) {
    return { success: false, error: new Error("No recipients") };
  }
  const safe = escapeHtml(text).replace(/\n/g, "<br>");
  const html = `
    <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #ffffff;">
      <div style="margin-bottom: 25px;">
        <p style="color: #374151; font-size: 15px; line-height: 1.6; margin: 0; white-space: pre-line;">${safe}</p>
      </div>
      <hr style="margin: 25px 0; border: none; border-top: 1px solid #e5e7eb;">
      <div style="text-align: center;">
        <p style="color: #9ca3af; font-size: 12px; margin: 0;"><strong>Tirill & CC</strong></p>
      </div>
    </div>
  `;

  const listUnsubscribe = `<mailto:${REPLY_TO[0]}?subject=Afmeld%20bryllupsopdateringer>`;
  const baseItem = {
    from: FROM,
    replyTo: REPLY_TO,
    subject,
    text,
    html,
    headers: { "List-Unsubscribe": listUnsubscribe } as Record<string, string>,
  };

  const allIds: { id: string }[] = [];

  try {
    for (let i = 0; i < to.length; i += BATCH_CHUNK_SIZE) {
      const chunk = to.slice(i, i + BATCH_CHUNK_SIZE).map((email) => ({
        ...baseItem,
        to: [email],
      }));
      const { data, error } = await resend.batch.send(chunk);
      if (error) {
        console.error("Admin broadcast batch error:", error);
        return { success: false, error };
      }
      if (data?.data) allIds.push(...data.data);
      if (i + BATCH_CHUNK_SIZE < to.length) {
        await new Promise((r) => setTimeout(r, BATCH_CHUNK_DELAY_MS));
      }
    }
    return { success: true, data: allIds };
  } catch (error) {
    console.error("Admin broadcast email service error:", error);
    return { success: false, error };
  }
}
