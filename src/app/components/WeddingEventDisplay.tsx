"use client";

import { BetterAuthUser } from "../../../lib/auth-types";
import { isAdmin } from "../../../lib/role-utils";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

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
          className="text-6xl mb-8 text-wedding-bronze"
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          📝
        </motion.div>
        <motion.h3
          className="text-3xl mb-6 wedding-serif text-wedding-navy"
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
      className="space-y-16"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      {/* Event Title and Date */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
      >
        <motion.div
          className="text-6xl mb-8 text-wedding-bronze"
          initial={{ scale: 0, rotate: -180 }}
          whileInView={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          ♣
        </motion.div>
        <motion.h3
          className="text-4xl md:text-5xl lg:text-6xl mb-8 wedding-serif text-wedding-navy font-light"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
        >
          {event.title}
        </motion.h3>
        <motion.div
          className="text-2xl md:text-3xl text-wedding-stone mb-6 font-medium wedding-serif"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
        >
          {formatDate(event.date)}
          {event.time && (
            <motion.span
              className="block md:inline md:ml-4 text-xl md:text-2xl text-wedding-bronze font-light"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.0 }}
              viewport={{ once: true }}
            >
              kl. {event.time}
            </motion.span>
          )}
        </motion.div>
        <motion.div
          className="flex items-center justify-center text-wedding-stone"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          viewport={{ once: true }}
        >
          <motion.span
            className="text-2xl mr-3 text-wedding-bronze"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.4, delay: 1.4 }}
            viewport={{ once: true }}
          >
            •
          </motion.span>
          <span className="text-xl md:text-2xl wedding-serif font-light">
            {event.location}
          </span>
        </motion.div>
      </motion.div>

      {/* Location Details */}
      {event.locationDetails && (
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="flex items-center mb-8"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <motion.span
              className="text-4xl mr-6 text-wedding-bronze"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              viewport={{ once: true }}
            >
              •
            </motion.span>
            <h4 className="text-3xl md:text-4xl wedding-serif text-wedding-navy font-light">
              Sted og transport
            </h4>
          </motion.div>
          <motion.div
            className="text-lg md:text-xl text-wedding-stone leading-relaxed wedding-serif font-light"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
          >
            {event.locationDetails.split("\n").map((line, index) => (
              <motion.p
                key={index}
                className="mb-4"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
                viewport={{ once: true }}
              >
                {line}
              </motion.p>
            ))}
          </motion.div>
        </motion.div>
      )}

      {/* Program */}
      {event.program && (
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="flex items-center mb-8"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <motion.span
              className="text-4xl mr-6 text-wedding-bronze"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              viewport={{ once: true }}
            >
              •
            </motion.span>
            <h4 className="text-3xl md:text-4xl wedding-serif text-wedding-navy font-light">
              Program
            </h4>
          </motion.div>
          <motion.div
            className="text-lg md:text-xl text-wedding-stone leading-relaxed wedding-serif font-light"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
          >
            {event.program.split("\n").map((line, index) => (
              <motion.p
                key={index}
                className="mb-4"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
                viewport={{ once: true }}
              >
                {line}
              </motion.p>
            ))}
          </motion.div>
        </motion.div>
      )}

      {/* Dresscode */}
      {event.dresscode && (
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="flex items-center mb-8"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <motion.span
              className="text-4xl mr-6 text-wedding-bronze"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              viewport={{ once: true }}
            >
              •
            </motion.span>
            <h4 className="text-3xl md:text-4xl wedding-serif text-wedding-navy font-light">
              Dresscode
            </h4>
          </motion.div>
          <motion.div
            className="text-lg md:text-xl text-wedding-stone leading-relaxed wedding-serif font-light"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
          >
            {event.dresscode.split("\n").map((line, index) => (
              <motion.p
                key={index}
                className="mb-4"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
                viewport={{ once: true }}
              >
                {line}
              </motion.p>
            ))}
          </motion.div>
        </motion.div>
      )}

      {/* Additional Information */}
      {event.additionalInfo && (
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="flex items-center mb-8"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <motion.span
              className="text-4xl mr-6 text-wedding-bronze"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              viewport={{ once: true }}
            >
              •
            </motion.span>
            <h4 className="text-3xl md:text-4xl wedding-serif text-wedding-navy font-light">
              Yderligere information
            </h4>
          </motion.div>
          <motion.div
            className="text-lg md:text-xl text-wedding-stone leading-relaxed wedding-serif font-light"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
          >
            {event.additionalInfo.split("\n").map((line, index) => (
              <motion.p
                key={index}
                className="mb-4"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
                viewport={{ once: true }}
              >
                {line}
              </motion.p>
            ))}
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
}
