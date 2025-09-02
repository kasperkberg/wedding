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

interface WeddingDashboardProps {
  user: BetterAuthUser;
  event: WeddingEvent | null;
}

export function WeddingDashboard({ user, event }: WeddingDashboardProps) {
  return (
    <div className="min-h-screen wedding-gradient-sage">
      {/* Main Content */}
      <motion.div
        className="relative py-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 1 }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Welcome and Title Section */}
          <motion.section
            className="mb-20"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <motion.h1
                className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 wedding-abramo text-black"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                viewport={{ once: true }}
              >
                Tirill & Christian
              </motion.h1>

              <motion.p
                className="text-xl md:text-2xl mb-4 wedding-abramo font-light text-[hsl(25,10%,50%)]"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                viewport={{ once: true }}
              >
                Vi gifter os
              </motion.p>


            </motion.div>
          </motion.section>

          {/* Wedding Event Information */}
          <motion.section
            className="mb-20"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <motion.h2
                className="text-3xl md:text-4xl lg:text-5xl font-bold wedding-abramo text-black mb-4"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                viewport={{ once: true }}
              >
                Bryllupsdetaljer
              </motion.h2>
              <motion.div
                className="wedding-divider"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              />
            </motion.div>

            <WeddingEventDisplay user={user} event={event} />
          </motion.section>

          {/* RSVP Section */}
          <motion.section
            className="mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
          >


            <RSVPSection user={user} />
          </motion.section>
        </div>
      </motion.div>
    </div>
  );
}
