import {
  pgTable,
  serial,
  varchar,
  text,
  timestamp,
  boolean,
  integer,
} from "drizzle-orm/pg-core";
import { user } from "../../../auth-schema";

export * from "../../../auth-schema";

// Wedding event information
export const weddingEvent = pgTable("wedding_event", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  date: timestamp("date").notNull(),
  time: varchar("time", { length: 50 }),
  location: text("location").notNull(),
  locationDetails: text("location_details"),
  program: text("program"),
  dresscode: text("dresscode"),
  additionalInfo: text("additional_info"),
  createdAt: timestamp("created_at")
    .$defaultFn(() => new Date())
    .notNull(),
  updatedAt: timestamp("updated_at")
    .$defaultFn(() => new Date())
    .notNull(),
});

// RSVP responses
export const rsvp = pgTable("rsvp", {
  id: serial("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  attending: boolean("attending").notNull(),
  allergies: text("allergies"),
  foodPreferences: text("food_preferences"),
  message: text("message"),
  createdAt: timestamp("created_at")
    .$defaultFn(() => new Date())
    .notNull(),
  updatedAt: timestamp("updated_at")
    .$defaultFn(() => new Date())
    .notNull(),
});

// Additional guests (1 per RSVP)
export const additionalGuests = pgTable("additional_guests", {
  id: serial("id").primaryKey(),
  rsvpId: integer("rsvp_id")
    .notNull()
    .references(() => rsvp.id, { onDelete: "cascade" }),
  name: varchar("name", { length: 255 }).notNull(),
  attending: boolean("attending").notNull(),
  allergies: text("allergies"),
  foodPreferences: text("food_preferences"),
  createdAt: timestamp("created_at")
    .$defaultFn(() => new Date())
    .notNull(),
});


