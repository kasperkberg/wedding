import { auth } from "../../../lib/auth";
import { headers } from "next/headers";
import { BetterAuthUser } from "../../../lib/auth-types";
import { Variation5Hero } from "../components/variation-5/Variation5Hero";
import { Variation5Info } from "../components/variation-5/Variation5Info";
import { Variation5RSVP } from "../components/variation-5/Variation5RSVP";

// Safe headers utility function  
async function getSafeHeaders() {
  try {
    return await headers();
  } catch (error) {
    console.error("Headers error:", error);
    // Return empty headers object if headers() fails
    return new Headers();
  }
}

export default async function Variation5Page() {
  let user: BetterAuthUser | null = null;

  try {
    // Fetch user session on the server with safe headers
    const requestHeaders = await getSafeHeaders();
    const session = await auth.api.getSession({
      headers: requestHeaders,
    });

    // Convert to BetterAuthUser type, handling the image field properly
    user = session?.user
      ? {
          ...session.user,
          image: session.user.image ?? null, // Convert undefined to null
          role: session.user.role as "guest" | "admin",
        }
      : null;
  } catch (error) {
    console.error("Session error:", error);
    // Continue without user session
  }

  // Fetch event data on the server
  const eventResponse = await fetch(
    `${
      process.env.NODE_ENV === "production"
        ? process.env.BETTER_AUTH_URL!
        : "http://localhost:3000"
    }/api/wedding`,
    {
      cache: "no-store",
    }
  );

  const eventResult = await eventResponse.json();
  const event = eventResult.success ? eventResult.data : null;

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Variation5Hero user={user} />

      {/* Main Content - only show if user is logged in */}
      {user && (
        <>
          <Variation5Info user={user} event={event} />
          <Variation5RSVP user={user} />
        </>
      )}
    </div>
  );
}