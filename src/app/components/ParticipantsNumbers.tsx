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
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Indlæser statistikker...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="text-center">
          <p className="text-red-600">Fejl: {error}</p>
        </div>
      </div>
    );
  }

  const attendingCount = rsvps.filter(rsvp => rsvp.attending).length;
  const notAttendingCount = rsvps.filter(rsvp => !rsvp.attending).length;
  const totalGuests = rsvps.reduce((total, rsvp) => {
    let count = rsvp.attending ? 1 : 0;
    count += rsvp.additionalGuests.filter(guest => guest.attending).length;
    return total + count;
  }, 0);

  const additionalGuestsCount = rsvps.reduce((total, rsvp) => {
    return total + rsvp.additionalGuests.filter(guest => guest.attending).length;
  }, 0);

  const totalRSVPs = rsvps.length;
  const responseRate = totalRSVPs > 0 ? ((attendingCount + notAttendingCount) / totalRSVPs * 100).toFixed(1) : "0";

  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Deltagerstatistikker</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{attendingCount}</div>
            <div className="text-sm text-blue-800">Deltager</div>
          </div>
          <div className="bg-red-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-red-600">{notAttendingCount}</div>
            <div className="text-sm text-red-800">Deltager ikke</div>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-green-600">{totalGuests}</div>
            <div className="text-sm text-green-800">Totale gæster</div>
          </div>
        </div>
      </div>

      {/* Additional Stats */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Yderligere statistikker</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-purple-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">{additionalGuestsCount}</div>
            <div className="text-sm text-purple-800">Medbragte gæster</div>
          </div>
          <div className="bg-orange-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-orange-600">{responseRate}%</div>
            <div className="text-sm text-orange-800">Svarprocent ({totalRSVPs} invitationer)</div>
          </div>
        </div>
      </div>
    </div>
  );
}
