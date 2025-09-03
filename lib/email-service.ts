import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

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

export async function sendPasswordResetEmail({
  to,
  resetUrl,
  userName,
}: SendPasswordResetEmailParams): Promise<EmailResult> {
  try {
    const { data, error } = await resend.emails.send({
      from: "Tirill & CC <noreply@tirillogcc.com>",
      to: [to],
      subject: "Nulstil dit password - Wedding",
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
