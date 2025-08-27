"use client";

import { useRouter } from "next/navigation";
import { BetterAuthUser } from "../../../lib/auth-types";
import { RSVPForm } from "./RSVPForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface RSVPSectionProps {
  user: BetterAuthUser | null;
}

export function RSVPSection({ user }: RSVPSectionProps) {
  const router = useRouter();

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
