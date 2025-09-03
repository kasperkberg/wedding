"use client";

import { BetterAuthUser } from "../../../lib/auth-types";
import { RSVPForm } from "./RSVPForm";
import { motion } from "framer-motion";
import { useState } from "react";

interface RSVPSectionProps {
  user: BetterAuthUser | null;
  onRSVPSubmitted?: () => void;
}

export function RSVPSection({ user, onRSVPSubmitted }: RSVPSectionProps) {
  const [isAttending, setIsAttending] = useState<boolean | null>(null);

  if (!user) {
    return null;
  }

  const handleRSVPLoaded = (rsvp: { attending: boolean } | null) => {
    setIsAttending(rsvp?.attending ?? null);
  };

  return (
    <motion.div
      id="rsvp-section"
      className="space-y-12"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
      >
        <motion.h2
          className="text-3xl md:text-4xl lg:text-5xl font-bold wedding-abramo text-black mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          {isAttending ? "Opdater tilmelding" : "Svar venligst"}
        </motion.h2>
        <motion.p
          className="text-xl md:text-2xl text-[hsl(25,10%,50%)] wedding-abramo font-light"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
        >
          {isAttending
            ? `Hej ${user.name}! Hvis du har noget at ændre, kan du gøre det her`
            : `Hej ${user.name}! Vi glæder os til at fejre dagen med dig.`}
        </motion.p>
        <motion.div
          className="wedding-divider"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        />
      </motion.div>

      {/* RSVP Form */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        viewport={{ once: true }}
      >
        <RSVPForm
          user={user}
          onRSVPSubmitted={onRSVPSubmitted}
          onRSVPLoaded={handleRSVPLoaded}
        />
      </motion.div>
    </motion.div>
  );
}
