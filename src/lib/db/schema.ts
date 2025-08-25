import { pgTable, serial, varchar } from "drizzle-orm/pg-core";
export * from "../../../auth-schema";

export const things = pgTable("things", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
});
