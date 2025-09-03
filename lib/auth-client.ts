import { createAuthClient } from "better-auth/client";
import { inferAdditionalFields } from "better-auth/client/plugins";
import { auth } from "./auth";

export const authClient = createAuthClient({
  baseURL:
    process.env.NODE_ENV === "production"
      ? process.env.BETTER_AUTH_URL!
      : "http://localhost:3000",
  plugins: [inferAdditionalFields<typeof auth>()],
});

export const {
  useSession,
  signIn,
  signOut,
  deleteUser,
  getSession,
  resetPassword,
  forgetPassword,
} = authClient;