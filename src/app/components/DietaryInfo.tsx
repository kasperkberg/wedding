"use client";

import { useEffect, useState } from "react";

interface RSVPWithGuests {
  id: number;
  userId: string;
  attending: boolean;
  allergies?: string;
  foodPreferences?: string;
  message?: string;
  createdAt: string;
  updatedAt: string;
  user?: {
    name: string;
    email: string;
  };
  additionalGuests: Array<{
    id: number;
    name: string;
    attending: boolean;
    allergies?: string;
    foodPreferences?: string;
  }>;
}

interface DietaryItem {
  name: string;
  type: "allergy" | "preference";
  guestName: string;
  details: string;
}

export function DietaryInfo() {
  const [rsvps, setRsvps] = useState<RSVPWithGuests[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchRSVPs();
  }, []);

  const fetchRSVPs = async () => {
    try {
      const response = await fetch("/api/rsvp/all");
      const result = await response.json();

      if (result.success) {
        setRsvps(result.data);
      } else {
        setError(result.error);
      }
    } catch (err) {
      console.error("Error fetching RSVPs:", err);
      setError("Kunne ikke hente RSVP'er");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="wedding-card-enhanced rounded-2xl p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-wedding-lemon mx-auto mb-4"></div>
          <p className="wedding-abramo text-wedding-stone">Indl&aelig;ser kostinformation...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="wedding-card-enhanced rounded-2xl p-8">
        <div className="text-center">
          <p className="wedding-abramo text-wedding-rose">Fejl: {error}</p>
        </div>
      </div>
    );
  }

  const dietaryItems: DietaryItem[] = [];

  rsvps.forEach((rsvp) => {
    if (rsvp.attending) {
      if (rsvp.allergies) {
        dietaryItems.push({
          name: rsvp.user?.name || "Ukendt bruger",
          type: "allergy",
          guestName: rsvp.user?.name || "Ukendt bruger",
          details: rsvp.allergies,
        });
      }
      if (rsvp.foodPreferences) {
        dietaryItems.push({
          name: rsvp.user?.name || "Ukendt bruger",
          type: "preference",
          guestName: rsvp.user?.name || "Ukendt bruger",
          details: rsvp.foodPreferences,
        });
      }

      rsvp.additionalGuests.forEach((guest) => {
        if (guest.attending) {
          if (guest.allergies) {
            dietaryItems.push({
              name: rsvp.user?.name || "Ukendt bruger",
              type: "allergy",
              guestName: guest.name,
              details: guest.allergies,
            });
          }
          if (guest.foodPreferences) {
            dietaryItems.push({
              name: rsvp.user?.name || "Ukendt bruger",
              type: "preference",
              guestName: guest.name,
              details: guest.foodPreferences,
            });
          }
        }
      });
    }
  });

  const allergies = dietaryItems.filter((item) => item.type === "allergy");
  const preferences = dietaryItems.filter((item) => item.type === "preference");

  return (
    <div className="space-y-6">
      {/* Allergies */}
      <div className="wedding-card-enhanced rounded-2xl p-6 sm:p-8">
        <h3 className="admin-section-title mb-6">Allergier</h3>
        {allergies.length > 0 ? (
          <div className="space-y-3">
            {allergies.map((allergy, index) => (
              <div
                key={index}
                className="border border-wedding-rose/20 rounded-xl p-4 bg-wedding-rose/5"
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="wedding-abramo text-wedding-charcoal">
                    {allergy.guestName}
                  </h4>
                  <span className="admin-badge admin-badge-not-attending">
                    Allergi
                  </span>
                </div>
                <p className="wedding-abramo text-sm text-wedding-charcoal/80">
                  {allergy.details}
                </p>
                {allergy.guestName !== allergy.name && (
                  <p className="wedding-abramo text-xs text-wedding-stone mt-1">
                    Fra: {allergy.name}
                  </p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="wedding-abramo text-wedding-stone">
              Ingen allergier registreret
            </p>
          </div>
        )}
      </div>

      {/* Preferences */}
      <div className="wedding-card-enhanced rounded-2xl p-6 sm:p-8">
        <h3 className="admin-section-title mb-6">Madpr&aelig;ferencer</h3>
        {preferences.length > 0 ? (
          <div className="space-y-3">
            {preferences.map((preference, index) => (
              <div
                key={index}
                className="border border-wedding-bronze/20 rounded-xl p-4 bg-wedding-bronze/5"
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="wedding-abramo text-wedding-charcoal">
                    {preference.guestName}
                  </h4>
                  <span className="admin-badge admin-badge-admin">
                    Pr&aelig;ference
                  </span>
                </div>
                <p className="wedding-abramo text-sm text-wedding-charcoal/80">
                  {preference.details}
                </p>
                {preference.guestName !== preference.name && (
                  <p className="wedding-abramo text-xs text-wedding-stone mt-1">
                    Fra: {preference.name}
                  </p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="wedding-abramo text-wedding-stone">
              Ingen madpr&aelig;ferencer registreret
            </p>
          </div>
        )}
      </div>

      {/* Summary */}
      {(allergies.length > 0 || preferences.length > 0) && (
        <div className="wedding-card-enhanced rounded-2xl p-6 sm:p-8">
          <h3 className="admin-section-title mb-6">Sammendrag</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="admin-stat-card text-center">
              <div
                className="wedding-abramo text-3xl mb-1"
                style={{ color: "var(--wedding-rose)" }}
              >
                {allergies.length}
              </div>
              <div className="wedding-abramo text-sm text-wedding-stone">
                Allergier
              </div>
            </div>
            <div className="admin-stat-card text-center">
              <div
                className="wedding-abramo text-3xl mb-1"
                style={{ color: "var(--wedding-bronze)" }}
              >
                {preferences.length}
              </div>
              <div className="wedding-abramo text-sm text-wedding-stone">
                Madpr&aelig;ferencer
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
