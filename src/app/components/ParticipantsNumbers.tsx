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

export function ParticipantsNumbers() {
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
          <p className="wedding-abramo text-wedding-stone">Indl&aelig;ser statistikker...</p>
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

  const attendingCount = rsvps.filter((rsvp) => rsvp.attending).length;
  const notAttendingCount = rsvps.filter((rsvp) => !rsvp.attending).length;
  const totalGuests = rsvps.reduce((total, rsvp) => {
    let count = rsvp.attending ? 1 : 0;
    count += rsvp.additionalGuests.filter((guest) => guest.attending).length;
    return total + count;
  }, 0);

  const additionalGuestsCount = rsvps.reduce((total, rsvp) => {
    return total + rsvp.additionalGuests.filter((guest) => guest.attending).length;
  }, 0);

  const totalRSVPs = rsvps.length;
  const responseRate =
    totalRSVPs > 0
      ? (((attendingCount + notAttendingCount) / totalRSVPs) * 100).toFixed(1)
      : "0";

  const stats = [
    {
      value: attendingCount,
      label: "Deltager",
      accent: "var(--wedding-bronze)",
    },
    {
      value: notAttendingCount,
      label: "Deltager ikke",
      accent: "var(--wedding-rose)",
    },
    {
      value: totalGuests,
      label: "Totale g\u00e6ster",
      accent: "var(--wedding-gold)",
    },
  ];

  const extraStats = [
    {
      value: additionalGuestsCount,
      label: "Medbragte g\u00e6ster",
      accent: "var(--wedding-lemon)",
    },
    {
      value: `${responseRate}%`,
      label: `Svarprocent (${totalRSVPs} inv.)`,
      accent: "var(--wedding-bronze)",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="wedding-card-enhanced rounded-2xl p-6 sm:p-8">
        <h2 className="admin-section-title mb-6">Deltagerstatistikker</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {stats.map((s) => (
            <div key={s.label} className="admin-stat-card text-center">
              <div
                className="wedding-abramo text-3xl mb-1"
                style={{ color: s.accent }}
              >
                {s.value}
              </div>
              <div className="wedding-abramo text-sm text-wedding-stone">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="wedding-card-enhanced rounded-2xl p-6 sm:p-8">
        <h3 className="admin-section-title mb-6">Yderligere</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {extraStats.map((s) => (
            <div key={s.label} className="admin-stat-card text-center">
              <div
                className="wedding-abramo text-3xl mb-1"
                style={{ color: s.accent }}
              >
                {s.value}
              </div>
              <div className="wedding-abramo text-sm text-wedding-stone">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
