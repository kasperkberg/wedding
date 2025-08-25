// Import the schema to generate types from it
import { user as userTable, session as sessionTable } from "../auth-schema";
import { InferSelectModel } from "drizzle-orm";

// Generate types directly from the database schema
export type User = InferSelectModel<typeof userTable>;
export type SessionRecord = InferSelectModel<typeof sessionTable>;

// Extract role type from the user table
export type UserRole = User["role"];

// Better Auth session type (this comes from Better Auth itself)
export interface Session {
  user: User;
  session: {
    id: string;
    userId: string;
    expiresAt: Date;
  };
}
