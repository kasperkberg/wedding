import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/lib/db";
import * as authSchema from "../auth-schema";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: authSchema,
  }),
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
