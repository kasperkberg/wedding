"use client";

import { useEffect, useState } from "react";
import { User } from "../../../lib/auth-types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";

interface RSVP {
  id: number;
  userId: string;
  name?: string;
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
  onRSVPSubmitted?: () => void;
  onRSVPLoaded?: (rsvp: RSVP | null) => void;
}

export function RSVPForm({
  user,
  onRSVPSubmitted,
  onRSVPLoaded,
}: RSVPFormProps) {
  const [rsvp, setRsvp] = useState<RSVP | null>(null);
  const [additionalGuests, setAdditionalGuests] = useState<AdditionalGuest[]>(
    []
  );
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    name: user.name || "",
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
          name: result.data.name || user.name || "",
          attending: result.data.attending,
          allergies: result.data.allergies || "",
          foodPreferences: result.data.foodPreferences || "",
          message: result.data.message || "",
        });

        // Notify parent component about loaded RSVP data
        onRSVPLoaded?.(result.data);

        // Fetch additional guests
        const guestsResponse = await fetch(
          `/api/additional-guests?rsvpId=${result.data.id}`
        );
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
      } else {
        setRsvp(null); // Set rsvp to null if no RSVP exists
        onRSVPLoaded?.(null);
        setAdditionalGuests([]); // Clear additional guests if no RSVP
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
          name: formData.name,
          attending: formData.attending,
          allergies: formData.allergies,
          foodPreferences: formData.foodPreferences,
          message: formData.message,
        }),
      });

      const rsvpResult = await rsvpResponse.json();

      if (!rsvpResult.success) {
        console.error(`Error saving RSVP: ${rsvpResult.error}`);
        return;
      }

      const rsvpId = rsvpResult.data.id;

      // Save additional guest (only 1)
      if (guestForm.name.trim()) {
        if (additionalGuests[0]) {
          // Update existing guest
          try {
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
          } catch (error) {
            console.error("Error updating guest:", error);
          }
        } else {
          // Add new guest
          try {
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
          } catch (error) {
            console.error("Error adding guest:", error);
          }
        }
      }

      // Show confetti instead of alert
      showConfetti();
      // Scroll to top after confetti
      window.scrollTo({ top: 0, behavior: "smooth" });
      fetchExistingRSVP(); // Refresh the data
      onRSVPSubmitted?.(); // Call the prop function
    } catch (error) {
      console.error("Error saving RSVP:", error);
      // Don't show alert for errors either
    } finally {
      setSaving(false);
    }
  };

  const showConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  const updateGuestForm = (field: string, value: string | boolean) => {
    setGuestForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  if (loading) {
    return (
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-muted-foreground">Indlæser din RSVP...</p>
      </div>
    );
  }

  const formVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  return (
    <motion.form
      variants={formVariants}
      initial="hidden"
      animate="visible"
      onSubmit={handleSubmit}
      className="space-y-8"
    >
      {/* Combined Form - All sections in one cohesive form */}
      <motion.div
        variants={cardVariants}
        className="bg-white rounded-lg p-8 shadow-lg border border-wedding-linen"
      >
        {/* Attendance */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="mb-8"
        >
          <Label className="block text-xl font-bold mb-6 text-black">
            Vil du deltage?
          </Label>
        </motion.div>

        {/* Name Input */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="mb-6"
        >
          <Label className="block text-sm font-semibold mb-2 text-[hsl(25,10%,50%)]">
            Dit navn
          </Label>
          <Input
            type="text"
            value={formData.name || user.name || ""}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, name: e.target.value }))
            }
            placeholder="Dit navn"
            className="max-w-md"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.4 }}
          className="grid md:grid-cols-2 gap-4 mb-8"
        >
          <motion.label
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="flex items-center p-4 bg-wedding-ivory rounded-lg border-2 border-transparent hover:border-wedding-bronze cursor-pointer transition-all wedding-border"
          >
            <input
              type="radio"
              name="attending"
              checked={formData.attending}
              onChange={() =>
                setFormData((prev) => ({ ...prev, attending: true }))
              }
              className="w-5 h-5 text-wedding-bronze focus:ring-wedding-bronze"
            />
            <span className="ml-3 text-lg wedding-abramo">
              Ja, jeg deltager med glæde
            </span>
          </motion.label>
          <motion.label
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="flex items-center p-4 bg-wedding-ivory rounded-lg border-2 border-transparent hover:border-wedding-bronze cursor-pointer transition-all wedding-border"
          >
            <input
              type="radio"
              name="attending"
              checked={!formData.attending}
              onChange={() =>
                setFormData((prev) => ({ ...prev, attending: false }))
              }
              className="w-5 h-5 text-wedding-bronze focus:ring-wedding-bronze"
            />
            <span className="ml-3 text-lg wedding-abramo">
              Desværre, jeg kan ikke deltage
            </span>
          </motion.label>
        </motion.div>

        {/* Main Guest Details - Only show if attending */}
        {formData.attending && (
          <>
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="mb-6 pt-6 border-t border-wedding-linen"
            >
              <h3 className="text-xl mb-6 wedding-abramo text-black font-semibold">
                Dine oplysninger
              </h3>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.4 }}
              className="space-y-4 mb-8"
            >
              <motion.div
                whileFocus={{ scale: 1.01 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Label className="block text-sm font-semibold mb-2 text-[hsl(25,10%,50%)]">
                  Allergier eller særlige kosthensyn
                </Label>
                <Input
                  type="text"
                  value={formData.allergies}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      allergies: e.target.value,
                    }))
                  }
                  placeholder="f.eks. nødder, laktose, vegetar"
                />
              </motion.div>
              <motion.div
                whileFocus={{ scale: 1.01 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Label className="block text-sm font-semibold mb-2 text-[hsl(25,10%,50%)]">
                  Madpræferencer
                </Label>
                <Input
                  type="text"
                  value={formData.foodPreferences}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      foodPreferences: e.target.value,
                    }))
                  }
                  placeholder="f.eks. ingen fisk, kan lide spicy mad"
                />
              </motion.div>
            </motion.div>

            {/* Additional Guest */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="mb-6 pt-6 border-t border-wedding-linen"
            >
              <h3 className="text-xl mb-6 wedding-abramo text-black font-semibold">
                Ønsker du at svare på vegne af flere inviterede?
              </h3>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.4 }}
              className="mb-8"
            >
              <div className="bg-wedding-ivory rounded-lg p-6 border border-wedding-linen">
                <div className="space-y-4">
                  <motion.div
                    whileFocus={{ scale: 1.01 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Input
                      type="text"
                      placeholder="Navn på gæst"
                      value={guestForm.name}
                      onChange={(e) => updateGuestForm("name", e.target.value)}
                    />
                  </motion.div>

                  {/* Only show checkbox when editing an existing guest */}
                  {additionalGuests.length > 0 && (
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="flex items-center"
                    >
                      <input
                        type="checkbox"
                        checked={guestForm.attending}
                        onChange={(e) =>
                          updateGuestForm("attending", e.target.checked)
                        }
                        className="w-5 h-5 text-wedding-forest focus:ring-wedding-forest"
                      />
                      <span className="ml-3">Gæsten deltager også</span>
                    </motion.div>
                  )}

                  {guestForm.name.trim() && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-6 pt-4 border-t border-wedding-linen"
                    >
                      <motion.h4
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1, duration: 0.3 }}
                        className="text-lg font-semibold mb-4"
                      >
                        {guestForm.name}s oplysninger
                      </motion.h4>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.3 }}
                        className="space-y-4"
                      >
                        <motion.div
                          whileFocus={{ scale: 1.01 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <Label className="block text-sm font-semibold mb-2 text-[hsl(25,10%,50%)]">
                            Gæstens allergier eller særlige kosthensyn
                          </Label>
                          <Input
                            type="text"
                            value={guestForm.allergies}
                            onChange={(e) =>
                              updateGuestForm("allergies", e.target.value)
                            }
                            placeholder="f.eks. nødder, laktose, vegetar"
                          />
                        </motion.div>
                        <motion.div
                          whileFocus={{ scale: 1.01 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <Label className="block text-sm font-semibold mb-2 text-[hsl(25,10%,50%)]">
                            Gæstens madpræferencer
                          </Label>
                          <Input
                            type="text"
                            value={guestForm.foodPreferences}
                            onChange={(e) =>
                              updateGuestForm("foodPreferences", e.target.value)
                            }
                            placeholder="f.eks. ingen fisk, kan lide spicy mad"
                          />
                        </motion.div>
                      </motion.div>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}

        {/* Message */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="pt-6 border-t border-wedding-linen"
        >
          <h3 className="text-xl mb-4 wedding-abramo text-black font-semibold">
            Besked
          </h3>
          <motion.div
            whileFocus={{ scale: 1.01 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Textarea
              value={formData.message}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, message: e.target.value }))
              }
              rows={4}
              placeholder={
                formData.attending
                  ? "Eventuelle kommentarer, ønsker eller spørgsmål..."
                  : "Årsag til at du ikke kan deltage..."
              }
            />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Submit Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="text-center"
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          <Button
            type="submit"
            disabled={saving}
            size="lg"
            className="wedding-button px-12 py-4 text-xl font-bold rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <motion.span
              key={saving ? "saving" : "normal"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {saving ? "Gemmer..." : rsvp ? "Opdater tilmelding" : "Tilmeld"}
            </motion.span>
          </Button>
        </motion.div>
      </motion.div>

      {/* Status */}
      {rsvp && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
          variants={cardVariants}
        >
          <div className="bg-white rounded-lg p-6 shadow-lg border border-wedding-linen">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.3 }}
              className="text-muted-foreground"
            >
              Sidst opdateret:{" "}
              {new Date(rsvp.updatedAt).toLocaleString("da-DK")}
            </motion.p>
          </div>
        </motion.div>
      )}
    </motion.form>
  );
}
