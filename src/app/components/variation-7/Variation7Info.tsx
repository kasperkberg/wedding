"use client";

import { BetterAuthUser } from "../../../../lib/auth-types";
import { isAdmin } from "../../../../lib/role-utils";
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

interface Variation7InfoProps {
  user: BetterAuthUser | null;
  event: WeddingEvent | null;
}

export function Variation7Info({ user, event }: Variation7InfoProps) {
  if (!event) {
    return (
      <motion.div
        className="py-32 bg-white"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="w-32 h-32 border border-gray-300 mx-auto mb-8 flex items-center justify-center"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <span className="text-6xl">🎨</span>
            </motion.div>
            <motion.h3
              className="text-3xl font-serif font-light text-black mb-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
            >
              Exhibition Catalogue
            </motion.h3>
            <motion.p
              className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              viewport={{ once: true }}
            >
              The exhibition details are currently being curated.
            </motion.p>
            {user && isAdmin(user.role) && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.0 }}
                viewport={{ once: true }}
              >
                <Button asChild size="lg" className="bg-black text-white hover:bg-gray-800 border-0 font-light tracking-widest">
                  <Link href="/admin">CURATE EXHIBITION</Link>
                </Button>
              </motion.div>
            )}
          </motion.div>
        </div>
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
      className="py-32 bg-white"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Gallery header */}
        <motion.div
          className="text-center mb-32"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="w-24 h-1 bg-black mx-auto mb-8"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            viewport={{ once: true }}
          />

          <motion.h2
            className="text-5xl md:text-6xl font-serif font-light text-black mb-12 tracking-tight"
            initial={{ scale: 0.9 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            {event.title}
          </motion.h2>

          <motion.div
            className="flex items-center justify-center space-x-8 mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="w-16 h-px bg-gray-300"></div>
            <div className="w-3 h-3 bg-black rotate-45"></div>
            <div className="w-16 h-px bg-gray-300"></div>
          </motion.div>
        </motion.div>

        {/* Featured piece */}
        <motion.div
          className="text-center mb-32"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-block border border-gray-300 p-16 max-w-2xl"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <motion.div
              className="text-8xl mb-8"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
            >
              💫
            </motion.div>

            <motion.h3
              className="text-4xl font-serif font-light text-black mb-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              viewport={{ once: true }}
            >
              Opening Night
            </motion.h3>

            <motion.div
              className="text-2xl text-gray-700 mb-6 font-light"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.9 }}
              viewport={{ once: true }}
            >
              {formatDate(event.date)}
            </motion.div>

            {event.time && (
              <motion.p
                className="text-xl text-gray-500 mb-6 font-light"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 1.1 }}
                viewport={{ once: true }}
              >
                {event.time}
              </motion.p>
            )}

            <motion.div
              className="flex items-center justify-center text-gray-700 mb-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.3 }}
              viewport={{ once: true }}
            >
              <span className="text-4xl mr-4">📍</span>
              <span className="text-lg font-light">{event.location}</span>
            </motion.div>

            <motion.div
              className="text-center text-sm text-gray-500 border-t border-gray-300 pt-6 font-light"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.5 }}
              viewport={{ once: true }}
            >
              &quot;A celebration of love in its most beautiful form&quot;
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Gallery grid layout */}
        <div className="grid md:grid-cols-2 gap-32">
          {/* Exhibition details */}
          {event.locationDetails && (
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <h4 className="text-2xl font-serif font-light text-black mb-4">Venue</h4>
                <div className="w-12 h-px bg-black mb-6"></div>
              </motion.div>
              <div className="text-gray-700 leading-relaxed space-y-4">
                {event.locationDetails.split("\n").map((line, index) => (
                  <motion.p
                    key={index}
                    className="font-light"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    {line}
                  </motion.p>
                ))}
              </div>
            </motion.div>
          )}

          {/* Program */}
          {event.program && (
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                viewport={{ once: true }}
              >
                <h4 className="text-2xl font-serif font-light text-black mb-4">Programme</h4>
                <div className="w-12 h-px bg-black mb-6"></div>
              </motion.div>
              <div className="text-gray-700 leading-relaxed space-y-4">
                {event.program.split("\n").map((line, index) => (
                  <motion.p
                    key={index}
                    className="font-light"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    {line}
                  </motion.p>
                ))}
              </div>
            </motion.div>
          )}

          {/* Dresscode */}
          {event.dresscode && (
            <motion.div
              className="space-y-8 md:col-span-2"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                viewport={{ once: true }}
              >
                <h4 className="text-2xl font-serif font-light text-black mb-4">Attire</h4>
                <div className="w-12 h-px bg-black mb-6"></div>
              </motion.div>
              <div className="text-gray-700 leading-relaxed space-y-4">
                {event.dresscode.split("\n").map((line, index) => (
                  <motion.p
                    key={index}
                    className="font-light"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    {line}
                  </motion.p>
                ))}
              </div>
            </motion.div>
          )}

          {/* Additional Info */}
          {event.additionalInfo && (
            <motion.div
              className="space-y-8 md:col-span-2"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                viewport={{ once: true }}
              >
                <h4 className="text-2xl font-serif font-light text-black mb-4">Additional Information</h4>
                <div className="w-12 h-px bg-black mb-6"></div>
              </motion.div>
              <div className="text-gray-700 leading-relaxed space-y-4">
                {event.additionalInfo.split("\n").map((line, index) => (
                  <motion.p
                    key={index}
                    className="font-light"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.9 + index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    {line}
                  </motion.p>
                ))}
              </div>
            </motion.div>
          )}
        </div>

        {/* Gallery footer */}
        <motion.div
          className="text-center mt-32"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          viewport={{ once: true }}
        >
          <motion.p
            className="text-xl text-gray-600 font-serif font-light italic"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.9 }}
            viewport={{ once: true }}
          >
            &quot;Love is the greatest masterpiece of all&quot;
          </motion.p>
        </motion.div>
      </div>
    </motion.div>
  );
}
