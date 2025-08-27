"use client";

import { useEffect, useState } from "react";
import { User } from "../../../lib/auth-types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

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
  const [additionalGuests, setAdditionalGuests] = useState<AdditionalGuest[]>(
    []
  );
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
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0
    }
  };

  return (
    <motion.form
      variants={formVariants}
      initial="hidden"
      animate="visible"
      onSubmit={handleSubmit}
      className="space-y-8"
    >
      {/* Attendance */}
      <motion.div variants={cardVariants}>
        <Card>
          <CardContent className="p-6">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
            >
              <Label className="block text-xl font-bold mb-6">
                Vil du deltage? *
              </Label>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.4 }}
              className="grid md:grid-cols-2 gap-4"
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
                <span className="ml-3 text-lg wedding-serif">
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
                <span className="ml-3 text-lg wedding-serif">
                  Desværre, jeg kan ikke deltage
                </span>
              </motion.label>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Main Guest Details */}
      {formData.attending && (
        <motion.div variants={cardVariants}>
          <Card>
            <CardContent className="p-6">
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.4 }}
              >
                <CardTitle className="text-xl mb-6 wedding-serif">
                  Dine oplysninger
                </CardTitle>
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.4 }}
                className="space-y-4"
              >
                <motion.div
                  whileFocus={{ scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Label className="block text-sm font-semibold mb-2">
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
                  <Label className="block text-sm font-semibold mb-2">
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
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Additional Guest */}
      {formData.attending && (
        <motion.div variants={cardVariants}>
          <Card>
            <CardContent className="p-6">
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.4 }}
              >
                <CardTitle className="text-xl mb-6 wedding-serif">
                  Ønsker du at medbringe én person?
                </CardTitle>
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.4 }}
              >
                <Card className="bg-white">
                  <CardContent className="p-4">
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

                      {guestForm.name.trim() && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="mt-6 pt-4 border-t"
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
                              <Label className="block text-sm font-semibold mb-2">
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
                              <Label className="block text-sm font-semibold mb-2">
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
                  </CardContent>
                </Card>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Message */}
      <motion.div variants={cardVariants}>
        <Card>
          <CardContent className="p-6">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
            >
              <CardTitle className="text-xl mb-4 wedding-serif">Besked</CardTitle>
            </motion.div>
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
                placeholder="Eventuelle kommentarer, ønsker eller spørgsmål..."
              />
            </motion.div>
          </CardContent>
        </Card>
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
              {saving ? "Gemmer..." : rsvp ? "Opdater RSVP" : "Send RSVP"}
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
          <Card>
            <CardContent className="p-3 text-center text-sm">
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.3 }}
                className="text-muted-foreground"
              >
                Sidst opdateret:{" "}
                {new Date(rsvp.updatedAt).toLocaleString("da-DK")}
              </motion.p>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </motion.form>
  );
}
