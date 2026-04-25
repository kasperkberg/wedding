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

export function ParticipantsList() {
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
          <p className="wedding-abramo text-wedding-stone">Indl&aelig;ser deltagere...</p>
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

  return (
    <div className="wedding-card-enhanced rounded-2xl p-6 sm:p-8">
      <h3 className="admin-section-title mb-6">Alle deltagere</h3>

      <div className="space-y-4">
        {rsvps.map((rsvp) => (
          <div
            key={rsvp.id}
            className="border border-wedding-linen rounded-xl p-4 bg-wedding-ivory/40 hover:bg-wedding-ivory/70 transition-colors"
          >
            <div className="flex items-center justify-between mb-2">
              <h4 className="wedding-abramo text-wedding-charcoal text-base">
                {rsvp.user?.name || "Ukendt bruger"}
              </h4>
              <span
                className={`admin-badge ${
                  rsvp.attending
                    ? "admin-badge-attending"
                    : "admin-badge-not-attending"
                }`}
              >
                {rsvp.attending ? "Deltager" : "Deltager ikke"}
              </span>
            </div>

            {rsvp.user?.email && (
              <p className="text-sm text-wedding-stone wedding-abramo mb-2">
                {rsvp.user.email}
              </p>
            )}

            {/* Additional guests */}
            {rsvp.additionalGuests.length > 0 && (
              <div className="mt-3 pt-3 border-t border-wedding-linen/60">
                <h5 className="wedding-abramo text-sm text-wedding-stone mb-2">
                  Medbragte g&aelig;ster:
                </h5>
                <div className="space-y-2">
                  {rsvp.additionalGuests.map((guest) => (
                    <div
                      key={guest.id}
                      className="bg-wedding-sage/30 p-3 rounded-lg"
                    >
                      <div className="flex items-center justify-between">
                        <span className="wedding-abramo text-sm text-wedding-charcoal">
                          {guest.name}
                        </span>
                        <span
                          className={`admin-badge ${
                            guest.attending
                              ? "admin-badge-attending"
                              : "admin-badge-not-attending"
                          }`}
                        >
                          {guest.attending ? "Deltager" : "Deltager ikke"}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Message */}
            {rsvp.message && (
              <div className="mt-3 pt-3 border-t border-wedding-linen/60">
                <h5 className="wedding-abramo text-sm text-wedding-stone mb-1">
                  Besked:
                </h5>
                <p className="text-sm text-wedding-charcoal italic wedding-abramo">
                  &quot;{rsvp.message}&quot;
                </p>
              </div>
            )}

            <div className="mt-3 pt-3 border-t border-wedding-linen/60">
              <p className="text-xs text-wedding-stone wedding-abramo">
                RSVP sendt:{" "}
                {new Date(rsvp.createdAt).toLocaleString("da-DK")}
                {rsvp.createdAt !== rsvp.updatedAt && (
                  <span className="ml-2">
                    &bull; Opdateret:{" "}
                    {new Date(rsvp.updatedAt).toLocaleString("da-DK")}
                  </span>
                )}
              </p>
            </div>
          </div>
        ))}

        {rsvps.length === 0 && (
          <div className="text-center py-10">
            <p className="wedding-abramo text-wedding-stone">
              Ingen RSVP&apos;er endnu
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
