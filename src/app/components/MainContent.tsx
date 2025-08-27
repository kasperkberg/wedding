"use client";

import { WeddingEventDisplay } from "./WeddingEventDisplay";
import { RSVPSection } from "./RSVPSection";
import { PhotoGallery } from "./PhotoGallery";
import { Card, CardContent } from "@/components/ui/card";
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
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.8 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <>
      {/* Main Content */}
      <motion.div
        className="relative -mt-20 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        <div className="max-w-6xl mx-auto px-4">
          {/* Wedding Information Cards */}
          <motion.div
            className="grid lg:grid-cols-3 gap-8 mb-16"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {/* Quick Info Cards */}
            <motion.div variants={cardVariants}>
              <Card className="rounded-2xl transform hover:scale-105 transition-transform duration-300">
                <CardContent className="p-6 text-center">
                  <motion.div
                    className="text-4xl mb-4 font-bold text-wedding-bronze"
                    initial={{ scale: 0, rotate: -180 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                    viewport={{ once: true }}
                  >
                    ∞
                  </motion.div>
                  <motion.h3
                    className="text-xl font-bold mb-2 wedding-serif"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7, duration: 0.4 }}
                    viewport={{ once: true }}
                  >
                    Bryllup
                  </motion.h3>
                  <motion.p
                    className="text-muted-foreground"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.9, duration: 0.4 }}
                    viewport={{ once: true }}
                  >
                    Vi siger ja til hinanden
                  </motion.p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={cardVariants}>
              <Card className="rounded-2xl transform hover:scale-105 transition-transform duration-300">
                <CardContent className="p-6 text-center">
                  <motion.div
                    className="text-4xl mb-4 font-bold text-wedding-navy"
                    initial={{ scale: 0, rotate: 180 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
                    viewport={{ once: true }}
                  >
                    ♣
                  </motion.div>
                  <motion.h3
                    className="text-xl font-bold mb-2 wedding-serif"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.4 }}
                    viewport={{ once: true }}
                  >
                    Fest
                  </motion.h3>
                  <motion.p
                    className="text-muted-foreground"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 1.0, duration: 0.4 }}
                    viewport={{ once: true }}
                  >
                    Vi fejrer sammen med jer
                  </motion.p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={cardVariants}>
              <Card className="rounded-2xl transform hover:scale-105 transition-transform duration-300">
                <CardContent className="p-6 text-center">
                  <motion.div
                    className="text-4xl mb-4 font-bold text-wedding-rose"
                    initial={{ scale: 0, rotate: 180 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.7, type: "spring", stiffness: 200 }}
                    viewport={{ once: true }}
                  >
                    ♥
                  </motion.div>
                  <motion.h3
                    className="text-xl font-bold mb-2 wedding-serif"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9, duration: 0.4 }}
                    viewport={{ once: true }}
                  >
                    Kærlighed
                  </motion.h3>
                  <motion.p
                    className="text-muted-foreground"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 1.1, duration: 0.4 }}
                    viewport={{ once: true }}
                  >
                    Vi deler øjeblikket med jer
                  </motion.p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          {/* Wedding Event Information */}
          <motion.div
            className="mb-16"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <WeddingEventDisplay user={user} event={event} />
          </motion.div>

          {/* Photo Gallery Section */}
          <motion.div
            className="mb-16"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <PhotoGallery />
          </motion.div>

          {/* RSVP Section */}
          <motion.div
            className="mb-16"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <RSVPSection user={user} />
          </motion.div>
        </div>
      </motion.div>

      {/* Elegant Footer */}
      <motion.div
        className="bg-gradient-to-r from-wedding-linen to-wedding-ivory py-12"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto px-4 text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{
              delay: 0.3,
              duration: 0.6,
              type: "spring",
              stiffness: 100,
            }}
            viewport={{ once: true }}
          >
            <Card className="rounded-2xl inline-block">
              <CardContent className="p-8">
                <motion.div
                  className="text-6xl mb-4 font-bold text-wedding-bronze"
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                  viewport={{ once: true }}
                >
                  ∞
                </motion.div>
                <motion.h2
                  className="text-2xl font-bold mb-4 wedding-serif"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.4 }}
                  viewport={{ once: true }}
                >
                  Med kærlighed og glæde
                </motion.h2>
                <motion.div
                  className="flex items-center justify-center space-x-8 text-wedding-navy"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.9, duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <div className="text-center">
                    <div className="text-lg font-semibold wedding-serif">
                      Tirill
                    </div>
                    <div className="text-sm">&</div>
                  </div>
                  <motion.div
                    className="text-2xl font-bold text-wedding-bronze"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ delay: 1.1, type: "spring", stiffness: 300 }}
                    viewport={{ once: true }}
                  >
                    ♥
                  </motion.div>
                  <div className="text-center">
                    <div className="text-lg font-semibold wedding-serif">
                      Christian
                    </div>
                    <div className="text-sm">&</div>
                  </div>
                </motion.div>
                <motion.div
                  className="mt-6 text-muted-foreground text-sm wedding-serif"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 1.3, duration: 0.4 }}
                  viewport={{ once: true }}
                >
                  Tak fordi I vil være en del af vores særlige dag
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
}
