import { auth } from "../../lib/auth";
import { headers } from "next/headers";
import { WeddingHero } from "./components/WeddingHero";
import { MainContent } from "./components/MainContent";
import { WeddingDashboard } from "./components/WeddingDashboard";
import { BetterAuthUser } from "../../lib/auth-types";

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

export default async function Home() {
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

  // If user is authenticated, show the combined dashboard
  if (user) {
    return <WeddingDashboard user={user} event={event} />;
  }

  // If user is not authenticated, show the original hero + main content
  return (
    <div className="min-h-screen">
      {/* Hero Section with Background Image */}
      <WeddingHero user={user} />

      {/* Main Content with Animations */}
      <MainContent user={user} event={event} />
    </div>
  );
}
