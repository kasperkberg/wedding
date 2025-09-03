"use client";

import { BetterAuthUser } from "../../../lib/auth-types";
import { isAdmin } from "../../../lib/role-utils";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Calendar, MapPin, Clock, Gift } from "lucide-react";

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

interface WeddingEventDisplayProps {
  user: BetterAuthUser | null;
  event: WeddingEvent | null;
}

export function WeddingEventDisplay({ user, event }: WeddingEventDisplayProps) {
  if (!event) {
    return (
      <motion.div
        className="text-center py-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <motion.div
          className="text-6xl mb-8 text-wedding-bronze flex justify-center"
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Calendar className="w-12 h-12" />
        </motion.div>
        <motion.h3
          className="text-3xl mb-6 wedding-abramo text-black"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
        >
          Bryllupsoplysninger
        </motion.h3>
        <motion.p
          className="text-lg text-wedding-stone mb-8 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          viewport={{ once: true }}
        >
          Bryllupsoplysningerne er endnu ikke oprettet.
        </motion.p>
        {user && isAdmin(user.role) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            viewport={{ once: true }}
          >
            <Button asChild size="lg" className="wedding-button">
              <Link href="/admin">Opret bryllupsoplysninger</Link>
            </Button>
          </motion.div>
        )}
      </motion.div>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("da-DK", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <motion.div
      className="space-y-8"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-7xl mx-auto px-4 md:px-0">
        {/* Når (When) Card */}
        <motion.div
          className="wedding-card-enhanced p-6 md:p-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          viewport={{ once: true }}
        >
          <div className="text-center">
            <div className="text-5xl mb-6 text-wedding-bronze flex justify-center">
              <div className="w-16 h-16 bg-wedding-bronze/10 rounded-full flex items-center justify-center">
                <Calendar className="w-8 h-8" />
              </div>
            </div>
            <h4 className="text-lg md:text-xl lg:text-2xl font-bold text-black mb-3 wedding-abramo">
              Når
            </h4>
            <div className="text-[hsl(25,10%,50%)] text-sm md:text-base">
              <div className="font-medium mb-1">{formatDate(event.date)}</div>
              {event.time && (
                <div className="text-[hsl(25,10%,50%)]">kl. {event.time}</div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Hvor (Where) Card */}
        <motion.div
          className="wedding-card-enhanced p-6 md:p-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="text-center">
            <div className="text-5xl mb-6 text-wedding-bronze flex justify-center">
              <div className="w-16 h-16 bg-wedding-bronze/10 rounded-full flex items-center justify-center">
                <MapPin className="w-8 h-8" />
              </div>
            </div>
            <h4 className="text-lg md:text-xl lg:text-2xl font-bold text-black mb-3 wedding-abramo">
              Hvor
            </h4>
            <div className="text-[hsl(25,10%,50%)] text-sm md:text-base">
              <div className="font-medium">{event.location}</div>
              {event.locationDetails && (
                <div className="text-xs mt-2 text-[hsl(25,10%,50%)]">
                  {event.locationDetails.split("\n")[0]}
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Program Card */}
        {event.program && (
          <motion.div
            className="wedding-card-enhanced p-6 md:p-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <div className="text-center">
              <div className="text-5xl mb-6 text-wedding-bronze flex justify-center">
                <div className="w-16 h-16 bg-wedding-bronze/10 rounded-full flex items-center justify-center">
                  <Clock className="w-8 h-8" />
                </div>
              </div>
              <h4 className="text-lg md:text-xl lg:text-2xl font-bold text-black mb-3 wedding-abramo">
                Program
              </h4>
              <div className="text-[hsl(25,10%,50%)] text-sm md:text-base text-center">
                {event.program
                  .split("\n")
                  .slice(0, 3)
                  .map((line, index) => (
                    <div key={index} className="mb-1">
                      {line.length > 40 ? line.substring(0, 37) + "..." : line}
                    </div>
                  ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Påklædning (Dress code) Card */}
        {event.dresscode && (
          <motion.div
            className="wedding-card-enhanced p-6 md:p-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="text-center">
              <div className="text-5xl mb-6 text-wedding-bronze flex justify-center">
                <div className="w-16 h-16 bg-wedding-bronze/10 rounded-full flex items-center justify-center">
                  <Gift className="w-8 h-8" />
                </div>
              </div>
              <h4 className="text-lg md:text-xl lg:text-2xl font-bold text-black mb-3 wedding-abramo">
                Ønsker
              </h4>
              <div className="text-[hsl(25,10%,50%)] text-sm md:text-base text-center">
                {event.dresscode.split("\n").map((line, index) => (
                  <div key={index} className="mb-1">
                    {line}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Additional Information - Show as expanded card if needed */}
      {event.additionalInfo && (
        <motion.div
          className="mt-12 max-w-4xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="wedding-card-enhanced p-6 md:p-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <motion.h4
              className="text-2xl md:text-3xl wedding-abramo text-black mb-6 font-light text-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.7 }}
              viewport={{ once: true }}
            >
              Yderligere information
            </motion.h4>
            <div className="text-lg md:text-xl text-[hsl(25,10%,50%)] leading-relaxed wedding-abramo font-light text-center space-y-4">
              {event.additionalInfo.split("\n").map((line, index) => (
                <div key={index} className="mb-1">
                  {line}
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
}
