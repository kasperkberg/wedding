import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/lib/db";
import * as authSchema from "../auth-schema";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: authSchema,
  }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
    sendResetPassword: async ({ user, url, token }, request) => {
      // For now, we'll just log the reset URL
      // In production, you'd send an actual email
      console.log(`Password reset for ${user.email}: ${url}`);
      
      // TODO: Implement actual email sending
      // You can use services like Resend, SendGrid, or your own SMTP server
      // Example with Resend:
      // await resend.emails.send({
      //   from: 'noreply@yourdomain.com',
      //   to: user.email,
      //   subject: 'Nulstil dit password',
      //   html: `<p>Klik på linket for at nulstille dit password: <a href="${url}">${url}</a></p>`
      // });
    }
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: "guest",
        required: true,
        input: false,
      },
    },
  },
  baseURL:
    process.env.NODE_ENV === "production"
      ? process.env.BETTER_AUTH_URL!
      : "http://localhost:3000",
  secret: process.env.BETTER_AUTH_SECRET!,
});
