// Import the schema to generate types from it
import { user as userTable, session as sessionTable } from "../auth-schema";
import { InferSelectModel } from "drizzle-orm";

// Generate types directly from the database schema
export type User = InferSelectModel<typeof userTable>;
export type SessionRecord = InferSelectModel<typeof sessionTable>;

// Extract role type from the user table
export type UserRole = "guest" | "admin";

// Better Auth compatible User type (fixes type mismatch issues)
export interface BetterAuthUser {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image: string | null;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

// Better Auth session type (this comes from Better Auth itself)
export interface Session {
  user: BetterAuthUser;
  session: {
    id: string;
    userId: string;
    expiresAt: Date;
  };
}
