"use client";

import { WeddingEventDisplay } from "./WeddingEventDisplay";
import { RSVPSection } from "./RSVPSection";
import { motion } from "framer-motion";
import { BetterAuthUser } from "../../../lib/auth-types";

interface WeddingEvent {
  id: number;
  title: string;
  date: string;
  time?: string;
  location: string;
  locationDetails?: string;
  program?: string;
  dresscode?: string;
  additionalInfo?: string;
  createdAt: string;
  updatedAt: string;
}

interface MainContentProps {
  user: BetterAuthUser | null;
  event: WeddingEvent | null;
}

export function MainContent({ user, event }: MainContentProps) {
  return (
    <>
      {/* Main Content - Seamless transition from hero */}
      <motion.div
        className="relative bg-wedding-sage py-24"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 1 }}
      >
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          {/* Wedding Event Information */}
          <motion.section
            className="mb-24"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <motion.h2
                className="text-4xl md:text-5xl lg:text-6xl font-bold wedding-script text-wedding-navy mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                Bryllupsdetaljer
              </motion.h2>
              <motion.div
                className="w-24 h-1 bg-gradient-to-r from-transparent via-wedding-bronze to-transparent mx-auto"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                viewport={{ once: true }}
              />
            </motion.div>

            <WeddingEventDisplay user={user} event={event} />
          </motion.section>

          {/* RSVP Section */}
          <motion.section
            className="mb-24"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <motion.h2
                className="text-4xl md:text-5xl lg:text-6xl font-bold wedding-script text-wedding-navy mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                RSVP
              </motion.h2>
              <motion.div
                className="w-24 h-1 bg-gradient-to-r from-transparent via-wedding-bronze to-transparent mx-auto"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                viewport={{ once: true }}
              />
            </motion.div>

            <RSVPSection user={user} />
          </motion.section>
        </div>
      </motion.div>
    </>
  );
}
