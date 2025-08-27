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
  type: 'allergy' | 'preference';
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
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Indlæser kostinformation...</p>
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

  // Collect all dietary information
  const dietaryItems: DietaryItem[] = [];

  rsvps.forEach(rsvp => {
    if (rsvp.attending) {
      // Main guest dietary info
      if (rsvp.allergies) {
        dietaryItems.push({
          name: rsvp.user?.name || "Ukendt bruger",
          type: 'allergy',
          guestName: rsvp.user?.name || "Ukendt bruger",
          details: rsvp.allergies
        });
      }
      if (rsvp.foodPreferences) {
        dietaryItems.push({
          name: rsvp.user?.name || "Ukendt bruger",
          type: 'preference',
          guestName: rsvp.user?.name || "Ukendt bruger",
          details: rsvp.foodPreferences
        });
      }

      // Additional guests dietary info
      rsvp.additionalGuests.forEach(guest => {
        if (guest.attending) {
          if (guest.allergies) {
            dietaryItems.push({
              name: rsvp.user?.name || "Ukendt bruger",
              type: 'allergy',
              guestName: guest.name,
              details: guest.allergies
            });
          }
          if (guest.foodPreferences) {
            dietaryItems.push({
              name: rsvp.user?.name || "Ukendt bruger",
              type: 'preference',
              guestName: guest.name,
              details: guest.foodPreferences
            });
          }
        }
      });
    }
  });

  const allergies = dietaryItems.filter(item => item.type === 'allergy');
  const preferences = dietaryItems.filter(item => item.type === 'preference');

  return (
    <div className="space-y-6">
      {/* Allergies Section */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Allergier</h3>
        {allergies.length > 0 ? (
          <div className="space-y-3">
            {allergies.map((allergy, index) => (
              <div key={index} className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-red-800">{allergy.guestName}</h4>
                  <span className="bg-red-100 text-red-800 px-2 py-1 text-xs font-medium rounded-full">
                    Allergi
                  </span>
                </div>
                <p className="text-red-700">{allergy.details}</p>
                <p className="text-xs text-red-600 mt-1">Fra: {allergy.name}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">Ingen allergier registreret</p>
          </div>
        )}
      </div>

      {/* Food Preferences Section */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Madpræferencer</h3>
        {preferences.length > 0 ? (
          <div className="space-y-3">
            {preferences.map((preference, index) => (
              <div key={index} className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-blue-800">{preference.guestName}</h4>
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 text-xs font-medium rounded-full">
                    Præference
                  </span>
                </div>
                <p className="text-blue-700">{preference.details}</p>
                <p className="text-xs text-blue-600 mt-1">Fra: {preference.name}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">Ingen madpræferencer registreret</p>
          </div>
        )}
      </div>

      {/* Summary */}
      {(allergies.length > 0 || preferences.length > 0) && (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Sammendrag</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-red-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-red-600">{allergies.length}</div>
              <div className="text-sm text-red-800">Allergier</div>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{preferences.length}</div>
              <div className="text-sm text-blue-800">Madpræferencer</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
