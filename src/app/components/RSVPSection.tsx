"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { User } from "../../../lib/auth-types";
import { authClient } from "../../../lib/auth-client";
import { RSVPForm } from "./RSVPForm";

export function RSVPSection() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data } = await authClient.getSession();
        const currentUser = data?.user as User | null;
        setUser(currentUser);
      } catch (error) {
        console.error("Error checking auth:", error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Indlæser...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <section id="rsvp-section" className="wedding-card rounded-2xl p-8 text-center">
        <div className="text-6xl mb-6">💌</div>
        <h2 className="text-4xl font-bold text-wedding-charcoal mb-6">
          RSVP
        </h2>
        <p className="text-wedding-stone mb-8 text-lg max-w-md mx-auto">
          Log ind for at svare på invitationen og se din RSVP-status.
        </p>
        <button
          onClick={() => router.push("/login")}
          className="wedding-button px-8 py-4 rounded-full text-lg font-medium"
        >
          Log ind med Google
        </button>
      </section>
    );
  }

  return (
    <section id="rsvp-section" className="wedding-card rounded-2xl p-8">
      <div className="text-center mb-8">
        <div className="text-6xl mb-6">💌</div>
        <h2 className="text-4xl font-bold text-wedding-charcoal mb-4">
          RSVP
        </h2>
        <p className="text-wedding-stone text-xl">
          Hej {user.name}! Vi glæder os til at fejre med dig.
        </p>
        <div className="w-24 h-1 bg-gradient-to-r from-wedding-forest to-wedding-rose mx-auto mt-6 rounded-full"></div>
      </div>

      <RSVPForm user={user} />
    </section>
  );
}
