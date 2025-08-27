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
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Indlæser deltagere...</p>
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

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-4">Alle deltagere</h3>
      <div className="space-y-4">
        {rsvps.map((rsvp) => (
          <div key={rsvp.id} className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold text-gray-900">
                {rsvp.user?.name || "Ukendt bruger"}
              </h4>
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                rsvp.attending
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}>
                {rsvp.attending ? "Deltager" : "Deltager ikke"}
              </span>
            </div>

            {rsvp.user?.email && (
              <p className="text-sm text-gray-600 mb-2">{rsvp.user.email}</p>
            )}

            {/* Additional guests */}
            {rsvp.additionalGuests.length > 0 && (
              <div className="mt-3 pt-3 border-t border-gray-200">
                <h5 className="font-medium text-sm text-gray-700 mb-2">Medbragte gæster:</h5>
                <div className="space-y-2">
                  {rsvp.additionalGuests.map((guest) => (
                    <div key={guest.id} className="bg-gray-50 p-3 rounded">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-sm">{guest.name}</span>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          guest.attending
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}>
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
              <div className="mt-3 pt-3 border-t border-gray-200">
                <h5 className="font-medium text-sm text-gray-700 mb-1">Besked:</h5>
                                  <p className="text-sm text-gray-600 italic">&quot;{rsvp.message}&quot;</p>
              </div>
            )}

            <div className="mt-3 pt-3 border-t border-gray-200">
              <p className="text-xs text-gray-500">
                RSVP sendt: {new Date(rsvp.createdAt).toLocaleString('da-DK')}
                {rsvp.createdAt !== rsvp.updatedAt && (
                  <span className="ml-2">
                    • Sidst opdateret: {new Date(rsvp.updatedAt).toLocaleString('da-DK')}
                  </span>
                )}
              </p>
            </div>
          </div>
        ))}

        {rsvps.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">Ingen RSVP&apos;er endnu</p>
          </div>
        )}
      </div>
    </div>
  );
}
