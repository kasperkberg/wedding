import { auth } from "../../lib/auth";
import { headers } from "next/headers";
import { WeddingHero } from "./components/WeddingHero";
import { MainContent } from "./components/MainContent";
import { BetterAuthUser } from "../../lib/auth-types";

export default async function Home() {
  // Get headers once to avoid multiple calls
  const requestHeaders = await headers();

  // Fetch user session on the server
  const session = await auth.api.getSession({
    headers: requestHeaders,
  });

  // Convert to BetterAuthUser type, handling the image field properly
  const user: BetterAuthUser | null = session?.user
    ? {
        ...session.user,
        image: session.user.image ?? null, // Convert undefined to null
        role: session.user.role as "guest" | "admin",
      }
    : null;

  // Fetch event data on the server
  const eventResponse = await fetch(
    `${
      process.env.NODE_ENV === "production"
        ? process.env.BETTER_AUTH_URL!
        : "http://localhost:3000"
    }/api/wedding`,
    {
      headers: requestHeaders,
      cache: "no-store",
    }
  );

  const eventResult = await eventResponse.json();
  const event = eventResult.success ? eventResult.data : null;

  return (
    <div className="min-h-screen">
      {/* Hero Section with Background Image */}
      <WeddingHero user={user} />

      {/* Main Content with Animations */}
      <MainContent user={user} event={event} />
    </div>
  );
}
