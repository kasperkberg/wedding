import { eq } from "drizzle-orm";
import { db } from "./index";
import { things } from "./schema";

// Get all things
export async function getAllThings() {
  return await db.select().from(things);
}

// Get a thing by ID
export async function getThingById(id: number) {
  return await db.select().from(things).where(eq(things.id, id)).limit(1);
}

// Create a new thing
export async function createThing(title: string) {
  return await db.insert(things).values({ title }).returning();
}

// Update a thing
export async function updateThing(id: number, title: string) {
  return await db
    .update(things)
    .set({ title })
    .where(eq(things.id, id))
    .returning();
}

// Delete a thing
export async function deleteThing(id: number) {
  return await db.delete(things).where(eq(things.id, id));
}
