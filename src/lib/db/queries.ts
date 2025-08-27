import { eq } from "drizzle-orm";
import { db } from "./index";
import { weddingEvent, rsvp, additionalGuests } from "./schema";

// Wedding Event queries
export async function getWeddingEvent() {
  return await db.select().from(weddingEvent).limit(1);
}

export async function createOrUpdateWeddingEvent(eventData: {
  title: string;
  date: Date;
  time?: string;
  location: string;
  locationDetails?: string;
  program?: string;
  dresscode?: string;
  additionalInfo?: string;
}) {
  const existingEvent = await getWeddingEvent();

  if (existingEvent.length > 0) {
    // Update existing event
    return await db
      .update(weddingEvent)
      .set({
        ...eventData,
        updatedAt: new Date(),
      })
      .where(eq(weddingEvent.id, existingEvent[0].id))
      .returning();
  } else {
    // Create new event
    return await db.insert(weddingEvent).values(eventData).returning();
  }
}

// RSVP queries
export async function getUserRsvp(userId: string) {
  return await db.select().from(rsvp).where(eq(rsvp.userId, userId));
}

export async function createOrUpdateRsvp(rsvpData: {
  userId: string;
  attending: boolean;
  allergies?: string;
  foodPreferences?: string;
  message?: string;
}) {
  const existingRsvp = await getUserRsvp(rsvpData.userId);

  if (existingRsvp.length > 0) {
    // Update existing RSVP
    return await db
      .update(rsvp)
      .set({
        ...rsvpData,
        updatedAt: new Date(),
      })
      .where(eq(rsvp.id, existingRsvp[0].id))
      .returning();
  } else {
    // Create new RSVP
    return await db.insert(rsvp).values(rsvpData).returning();
  }
}

// Additional guests queries
export async function getAdditionalGuests(rsvpId: number) {
  return await db
    .select()
    .from(additionalGuests)
    .where(eq(additionalGuests.rsvpId, rsvpId));
}

export async function addAdditionalGuest(guestData: {
  rsvpId: number;
  name: string;
  attending: boolean;
  allergies?: string;
  foodPreferences?: string;
}) {
  return await db.insert(additionalGuests).values(guestData).returning();
}

export async function updateAdditionalGuest(
  id: number,
  guestData: {
    name: string;
    attending: boolean;
    allergies?: string;
    foodPreferences?: string;
  }
) {
  return await db
    .update(additionalGuests)
    .set(guestData)
    .where(eq(additionalGuests.id, id))
    .returning();
}

export async function deleteAdditionalGuest(id: number) {
  return await db.delete(additionalGuests).where(eq(additionalGuests.id, id));
}

export async function getAllRsvpsWithGuests() {
  const rsvps = await db.select().from(rsvp);
  const result = await Promise.all(
    rsvps.map(async (rsvpItem) => ({
      ...rsvpItem,
      additionalGuests: await getAdditionalGuests(rsvpItem.id),
    }))
  );
  return result;
}
