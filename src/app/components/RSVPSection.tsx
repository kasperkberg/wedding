"use client";

import { useRouter } from "next/navigation";
import { BetterAuthUser } from "../../../lib/auth-types";
import { RSVPForm } from "./RSVPForm";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface RSVPSectionProps {
  user: BetterAuthUser | null;
}

export function RSVPSection({ user }: RSVPSectionProps) {
  const router = useRouter();

  if (!user) {
    return (
      <motion.div
        className="text-center py-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <motion.div
          className="text-6xl mb-8 text-wedding-bronze"
          initial={{ scale: 0, rotate: -180 }}
          whileInView={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          ∞
        </motion.div>
        <motion.h3
          className="text-4xl md:text-5xl lg:text-6xl mb-8 wedding-serif text-wedding-navy font-light"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          RSVP
        </motion.h3>
        <motion.p
          className="text-lg md:text-xl text-wedding-stone mb-12 max-w-2xl mx-auto wedding-serif font-light"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          viewport={{ once: true }}
        >
          Log ind for at svare på invitationen og se din RSVP-status.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          viewport={{ once: true }}
        >
          <Button
            onClick={() => router.push("/login")}
            size="lg"
            className="wedding-button px-8 py-4 rounded-full text-lg wedding-serif"
          >
            Log ind med Google
          </Button>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      id="rsvp-section"
      className="space-y-12"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      {/* Welcome Header */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
      >
        <motion.div
          className="text-6xl mb-8 text-wedding-bronze"
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          ♥
        </motion.div>
        <motion.h3
          className="text-4xl md:text-5xl lg:text-6xl mb-8 wedding-serif text-wedding-navy font-light"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
        >
          RSVP
        </motion.h3>
        <motion.p
          className="text-xl md:text-2xl text-wedding-stone wedding-serif font-light"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
        >
          Hej {user.name}! Vi glæder os til at fejre med dig.
        </motion.p>
        <motion.div
          className="w-24 h-1 bg-gradient-to-r from-wedding-bronze to-wedding-navy mx-auto mt-8 rounded-full"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 1.0 }}
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
        <RSVPForm user={user} />
      </motion.div>
    </motion.div>
  );
}
