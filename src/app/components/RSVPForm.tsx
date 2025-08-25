"use client";

import { useEffect, useState } from "react";
import { User } from "../../../lib/auth-types";

interface RSVP {
  id: number;
  userId: string;
  attending: boolean;
  allergies?: string;
  foodPreferences?: string;
  message?: string;
  createdAt: string;
  updatedAt: string;
}

interface AdditionalGuest {
  id: number;
  rsvpId: number;
  name: string;
  attending: boolean;
  allergies?: string;
  foodPreferences?: string;
  createdAt: string;
}

interface RSVPFormProps {
  user: User;
}

export function RSVPForm({ user }: RSVPFormProps) {
  const [rsvp, setRsvp] = useState<RSVP | null>(null);
  const [additionalGuests, setAdditionalGuests] = useState<AdditionalGuest[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    attending: true,
    allergies: "",
    foodPreferences: "",
    message: "",
  });

  const [guestForm, setGuestForm] = useState({
    name: "",
    attending: true,
    allergies: "",
    foodPreferences: "",
  });

  useEffect(() => {
    fetchExistingRSVP();
  }, [user.id]);

  const fetchExistingRSVP = async () => {
    try {
      const response = await fetch(`/api/rsvp?userId=${user.id}`);
      const result = await response.json();

      if (result.success && result.data) {
        setRsvp(result.data);
        setFormData({
          attending: result.data.attending,
          allergies: result.data.allergies || "",
          foodPreferences: result.data.foodPreferences || "",
          message: result.data.message || "",
        });

        // Fetch additional guests
        const guestsResponse = await fetch(`/api/additional-guests?rsvpId=${result.data.id}`);
        const guestsResult = await guestsResponse.json();

        if (guestsResult.success && guestsResult.data.length > 0) {
          const guest = guestsResult.data[0]; // Only take the first guest since we only allow 1
          setAdditionalGuests(guestsResult.data);
          setGuestForm({
            name: guest.name,
            attending: guest.attending,
            allergies: guest.allergies || "",
            foodPreferences: guest.foodPreferences || "",
          });
        }
      }
    } catch (error) {
      console.error("Error fetching RSVP:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      // Save main RSVP
      const rsvpResponse = await fetch("/api/rsvp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user.id,
          attending: formData.attending,
          allergies: formData.allergies,
          foodPreferences: formData.foodPreferences,
          message: formData.message,
        }),
      });

      const rsvpResult = await rsvpResponse.json();

      if (!rsvpResult.success) {
        alert(`Fejl ved gemning af RSVP: ${rsvpResult.error}`);
        return;
      }

      const rsvpId = rsvpResult.data.id;

      // Save additional guest (only 1)
      if (guestForm.name.trim()) {
        if (additionalGuests[0]) {
          // Update existing guest
          await fetch("/api/additional-guests", {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: additionalGuests[0].id,
              name: guestForm.name,
              attending: guestForm.attending,
              allergies: guestForm.allergies,
              foodPreferences: guestForm.foodPreferences,
            }),
          });
        } else {
          // Add new guest
          await fetch("/api/additional-guests", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              rsvpId,
              name: guestForm.name,
              attending: guestForm.attending,
              allergies: guestForm.allergies,
              foodPreferences: guestForm.foodPreferences,
            }),
          });
        }
      }

      alert("Din RSVP er gemt! Tak for svaret.");
      fetchExistingRSVP(); // Refresh the data
    } catch (error) {
      console.error("Error saving RSVP:", error);
      alert("Der skete en fejl ved gemning af din RSVP");
    } finally {
      setSaving(false);
    }
  };

  const updateGuestForm = (field: string, value: string | boolean) => {
    setGuestForm(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  if (loading) {
    return (
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Indlæser din RSVP...</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Attendance */}
      <div>
        <label className="block text-lg font-medium text-gray-900 mb-4">
          Vil du deltage? *
        </label>
        <div className="flex space-x-6">
          <label className="flex items-center">
            <input
              type="radio"
              name="attending"
              checked={formData.attending}
              onChange={() => setFormData(prev => ({ ...prev, attending: true }))}
              className="w-4 h-4 text-blue-600 focus:ring-blue-500"
            />
            <span className="ml-2 text-lg">Ja, jeg deltager med glæde! 🎉</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="attending"
              checked={!formData.attending}
              onChange={() => setFormData(prev => ({ ...prev, attending: false }))}
              className="w-4 h-4 text-blue-600 focus:ring-blue-500"
            />
            <span className="ml-2 text-lg">Desværre, jeg kan ikke deltage</span>
          </label>
        </div>
      </div>

      {/* Main Guest Details */}
      {formData.attending && (
        <div>
          <label className="block text-lg font-medium text-gray-900 mb-4">
            Dine oplysninger
          </label>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Allergier eller særlige kosthensyn
              </label>
              <input
                type="text"
                value={formData.allergies}
                onChange={(e) => setFormData(prev => ({ ...prev, allergies: e.target.value }))}
                placeholder="f.eks. nødder, laktose, vegetar"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Madpræferencer
              </label>
              <input
                type="text"
                value={formData.foodPreferences}
                onChange={(e) => setFormData(prev => ({ ...prev, foodPreferences: e.target.value }))}
                placeholder="f.eks. ingen fisk, kan lide spicy mad"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      )}

      {/* Additional Guest */}
      {formData.attending && (
        <div>
          <label className="block text-lg font-medium text-gray-900 mb-4">
            Ønsker du at medbringe én person?
          </label>
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Navn på gæst"
                  value={guestForm.name}
                  onChange={(e) => updateGuestForm("name", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={guestForm.attending}
                  onChange={(e) => updateGuestForm("attending", e.target.checked)}
                  className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2">Gæsten deltager også</span>
              </div>

              {guestForm.name.trim() && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Gæstens allergier eller særlige kosthensyn
                    </label>
                    <input
                      type="text"
                      value={guestForm.allergies}
                      onChange={(e) => updateGuestForm("allergies", e.target.value)}
                      placeholder="f.eks. nødder, laktose, vegetar"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Gæstens madpræferencer
                    </label>
                    <input
                      type="text"
                      value={guestForm.foodPreferences}
                      onChange={(e) => updateGuestForm("foodPreferences", e.target.value)}
                      placeholder="f.eks. ingen fisk, kan lide spicy mad"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Message */}
      <div>
        <label className="block text-lg font-medium text-gray-900 mb-2">
          Besked
        </label>
        <textarea
          value={formData.message}
          onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Eventuelle kommentarer, ønsker eller spørgsmål..."
        />
      </div>

      {/* Submit Button */}
      <div className="text-center">
        <button
          type="submit"
          disabled={saving}
          className="px-8 py-3 bg-blue-600 text-white text-lg rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {saving ? "Gemmer..." : rsvp ? "Opdater RSVP" : "Send RSVP"}
        </button>
      </div>

      {/* Status */}
      {rsvp && (
        <div className="text-center text-sm text-gray-500">
          <p>Sidst opdateret: {new Date(rsvp.updatedAt).toLocaleString('da-DK')}</p>
        </div>
      )}
    </form>
  );
}
