"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { User } from "../../../lib/auth-types";
import { authClient } from "../../../lib/auth-client";
import { RSVPForm } from "./RSVPForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

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
      <Card>
        <CardContent className="p-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Indlæser...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!user) {
    return (
      <section id="rsvp-section">
        <Card>
          <CardContent className="p-8 text-center">
            <div className="text-6xl mb-6 font-bold text-wedding-bronze">∞</div>
            <CardTitle className="text-4xl mb-6 wedding-serif">RSVP</CardTitle>
            <p className="text-muted-foreground mb-8 text-lg max-w-md mx-auto wedding-serif">
              Log ind for at svare på invitationen og se din RSVP-status.
            </p>
            <Button
              onClick={() => router.push("/login")}
              size="lg"
              className="wedding-button px-8 py-4 rounded-full text-lg wedding-serif"
            >
              Log ind med Google
            </Button>
          </CardContent>
        </Card>
      </section>
    );
  }

  return (
    <section id="rsvp-section">
      <Card>
        <CardContent className="p-8">
          <div className="text-center mb-8">
            <div className="text-6xl mb-6 font-bold text-wedding-bronze">♥</div>
            <CardTitle className="text-4xl mb-4 wedding-serif">RSVP</CardTitle>
            <p className="text-muted-foreground text-xl wedding-serif">
              Hej {user.name}! Vi glæder os til at fejre med dig.
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-wedding-bronze to-wedding-navy mx-auto mt-6 rounded-full"></div>
          </div>

          <RSVPForm user={user} />
        </CardContent>
      </Card>
    </section>
  );
}
