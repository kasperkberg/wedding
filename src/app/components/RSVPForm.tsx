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
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Attendance */}
      <div className="bg-wedding-sage-light rounded-xl p-6">
        <label className="block text-xl font-bold text-wedding-charcoal mb-6">
          Vil du deltage? *
        </label>
        <div className="grid md:grid-cols-2 gap-4">
          <label className="flex items-center p-4 bg-white rounded-lg border-2 border-transparent hover:border-wedding-forest cursor-pointer transition-all">
            <input
              type="radio"
              name="attending"
              checked={formData.attending}
              onChange={() => setFormData(prev => ({ ...prev, attending: true }))}
              className="w-5 h-5 text-wedding-forest focus:ring-wedding-forest"
            />
            <span className="ml-3 text-lg text-wedding-charcoal">Ja, jeg deltager med glæde! 🎉</span>
          </label>
          <label className="flex items-center p-4 bg-white rounded-lg border-2 border-transparent hover:border-wedding-rose cursor-pointer transition-all">
            <input
              type="radio"
              name="attending"
              checked={!formData.attending}
              onChange={() => setFormData(prev => ({ ...prev, attending: false }))}
              className="w-5 h-5 text-wedding-rose focus:ring-wedding-rose"
            />
            <span className="ml-3 text-lg text-wedding-charcoal">Desværre, jeg kan ikke deltage</span>
          </label>
        </div>
      </div>

      {/* Main Guest Details */}
      {formData.attending && (
        <div className="bg-wedding-sage-light rounded-xl p-6">
          <h3 className="text-xl font-bold text-wedding-charcoal mb-6 flex items-center">
            <span className="text-2xl mr-3">🍽️</span>
            Dine oplysninger
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-wedding-charcoal mb-2">
                Allergier eller særlige kosthensyn
              </label>
              <input
                type="text"
                value={formData.allergies}
                onChange={(e) => setFormData(prev => ({ ...prev, allergies: e.target.value }))}
                placeholder="f.eks. nødder, laktose, vegetar"
                className="w-full px-4 py-3 border border-wedding-sage-dark rounded-lg focus:outline-none focus:ring-2 focus:ring-wedding-forest bg-white"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-wedding-charcoal mb-2">
                Madpræferencer
              </label>
              <input
                type="text"
                value={formData.foodPreferences}
                onChange={(e) => setFormData(prev => ({ ...prev, foodPreferences: e.target.value }))}
                placeholder="f.eks. ingen fisk, kan lide spicy mad"
                className="w-full px-4 py-3 border border-wedding-sage-dark rounded-lg focus:outline-none focus:ring-2 focus:ring-wedding-forest bg-white"
              />
            </div>
          </div>
        </div>
      )}

      {/* Additional Guest */}
      {formData.attending && (
        <div className="bg-wedding-sage-light rounded-xl p-6">
          <h3 className="text-xl font-bold text-wedding-charcoal mb-6 flex items-center">
            <span className="text-2xl mr-3">👥</span>
            Ønsker du at medbringe én person?
          </h3>
          <div className="bg-white rounded-lg p-4 border border-wedding-sage-dark">
            <div className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Navn på gæst"
                  value={guestForm.name}
                  onChange={(e) => updateGuestForm("name", e.target.value)}
                  className="w-full px-4 py-3 border border-wedding-sage-dark rounded-lg focus:outline-none focus:ring-2 focus:ring-wedding-forest"
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={guestForm.attending}
                  onChange={(e) => updateGuestForm("attending", e.target.checked)}
                  className="w-5 h-5 text-wedding-forest focus:ring-wedding-forest"
                />
                <span className="ml-3 text-wedding-charcoal">Gæsten deltager også</span>
              </div>

              {guestForm.name.trim() && (
                <div className="mt-6 pt-4 border-t border-wedding-sage-dark">
                  <h4 className="text-lg font-semibold text-wedding-charcoal mb-4">
                    {guestForm.name}s oplysninger
                  </h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-wedding-charcoal mb-2">
                        Gæstens allergier eller særlige kosthensyn
                      </label>
                      <input
                        type="text"
                        value={guestForm.allergies}
                        onChange={(e) => updateGuestForm("allergies", e.target.value)}
                        placeholder="f.eks. nødder, laktose, vegetar"
                        className="w-full px-4 py-3 border border-wedding-sage-dark rounded-lg focus:outline-none focus:ring-2 focus:ring-wedding-forest"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-wedding-charcoal mb-2">
                        Gæstens madpræferencer
                      </label>
                      <input
                        type="text"
                        value={guestForm.foodPreferences}
                        onChange={(e) => updateGuestForm("foodPreferences", e.target.value)}
                        placeholder="f.eks. ingen fisk, kan lide spicy mad"
                        className="w-full px-4 py-3 border border-wedding-sage-dark rounded-lg focus:outline-none focus:ring-2 focus:ring-wedding-forest"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Message */}
      <div className="bg-wedding-sage-light rounded-xl p-6">
        <h3 className="text-xl font-bold text-wedding-charcoal mb-4 flex items-center">
          <span className="text-2xl mr-3">💭</span>
          Besked
        </h3>
        <textarea
          value={formData.message}
          onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
          rows={4}
          className="w-full px-4 py-3 border border-wedding-sage-dark rounded-lg focus:outline-none focus:ring-2 focus:ring-wedding-forest bg-white"
          placeholder="Eventuelle kommentarer, ønsker eller spørgsmål..."
        />
      </div>

      {/* Submit Button */}
      <div className="text-center">
        <button
          type="submit"
          disabled={saving}
          className="wedding-button px-12 py-4 text-xl font-bold rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {saving ? "Gemmer..." : rsvp ? "Opdater RSVP" : "Send RSVP"}
        </button>
      </div>

      {/* Status */}
      {rsvp && (
        <div className="text-center text-sm text-wedding-stone bg-wedding-sage-light rounded-lg p-3">
          <p>Sidst opdateret: {new Date(rsvp.updatedAt).toLocaleString('da-DK')}</p>
        </div>
      )}
    </form>
  );
}
