import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/lib/db";
import * as authSchema from "../auth-schema";
import { sendPasswordResetEmail } from "./email-service";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: authSchema,
  }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
    sendResetPassword: async ({ user, url, token }, request) => {
      try {
        const result = await sendPasswordResetEmail({
          to: user.email,
          resetUrl: url,
          userName: user.name,
          token: token,
        });

        if (!result.success) {
          console.error("Failed to send password reset email:", result.error);
          throw new Error("Failed to send password reset email");
        }

        console.log(`Password reset email sent to ${user.email}`);
      } catch (error) {
        console.error("Error sending password reset email:", error);
        throw error;
      }
    },
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
