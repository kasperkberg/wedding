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

interface Variation3InfoProps {
  user: BetterAuthUser | null;
  event: WeddingEvent | null;
}

export function Variation3Info({ user, event }: Variation3InfoProps) {
  if (!event) {
    return (
      <motion.div
        className="text-center py-20 bg-gradient-to-br from-amber-50 to-yellow-50"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <motion.div
          className="text-6xl mb-6"
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          📝
        </motion.div>
        <motion.h3
          className="text-3xl mb-6 text-amber-800 font-serif"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          Bryllupsoplysninger
        </motion.h3>
        <motion.p
          className="text-lg text-amber-700 mb-8 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
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
            <Button asChild size="lg" className="bg-amber-600 text-white hover:bg-amber-700">
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
      className="py-24 bg-gradient-to-br from-amber-50 to-yellow-50"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Natural Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="flex items-center justify-center mb-8"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
          >
            <div className="flex space-x-4 text-4xl">
              <motion.span
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                🌿
              </motion.span>
              <motion.span
                animate={{ rotate: [0, -5, 5, 0] }}
                transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
              >
                🍂
              </motion.span>
              <motion.span
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity, delay: 1 }}
              >
                🌳
              </motion.span>
            </div>
          </motion.div>

          <motion.h2
            className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-amber-600 to-yellow-600 bg-clip-text text-transparent mb-6 font-serif"
            initial={{ scale: 0.9 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            {event.title}
          </motion.h2>

          <motion.div
            className="flex items-center justify-center space-x-2 mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="text-2xl">🌱</span>
            <div className="w-32 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent"></div>
            <span className="text-2xl">🌱</span>
          </motion.div>
        </motion.div>

        {/* Natural Event Display */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-block bg-white/70 backdrop-blur-sm rounded-3xl p-12 shadow-xl border border-amber-200"
            whileHover={{ scale: 1.02, y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <motion.div
              className="text-6xl mb-8"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
            >
              🌿
            </motion.div>

            <motion.h3
              className="text-4xl font-bold text-amber-800 mb-6 font-serif"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              viewport={{ once: true }}
            >
              {formatDate(event.date)}
            </motion.h3>

            {event.time && (
              <motion.p
                className="text-2xl text-amber-700 mb-6 font-medium"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.9 }}
                viewport={{ once: true }}
              >
                Kl. {event.time}
              </motion.p>
            )}

            <motion.div
              className="flex items-center justify-center text-amber-700 mb-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.1 }}
              viewport={{ once: true }}
            >
              <span className="text-3xl mr-4">🏞️</span>
              <span className="text-xl font-medium">{event.location}</span>
            </motion.div>

            <motion.div
              className="text-center text-amber-600 italic"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.3 }}
              viewport={{ once: true }}
            >
              <p className="mb-2">I naturens skønne omgivelser</p>
              <p>🌿 Med kærlighed fra naturen 🌿</p>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Natural Details Grid */}
        <div className="grid md:grid-cols-2 gap-12">
          {/* Location Details */}
          {event.locationDetails && (
            <motion.div
              className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-amber-200"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
            >
              <motion.div
                className="flex items-center mb-6"
                initial={{ x: -20, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <span className="text-4xl mr-4">🚗</span>
                <h4 className="text-2xl font-bold text-amber-700 font-serif">Sted og transport</h4>
              </motion.div>
              <div className="text-amber-700 leading-relaxed">
                {event.locationDetails.split("\n").map((line, index) => (
                  <motion.p
                    key={index}
                    className="mb-3"
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
              className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-amber-200"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
            >
              <motion.div
                className="flex items-center mb-6"
                initial={{ x: -20, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                viewport={{ once: true }}
              >
                <span className="text-4xl mr-4">📋</span>
                <h4 className="text-2xl font-bold text-amber-700 font-serif">Program</h4>
              </motion.div>
              <div className="text-amber-700 leading-relaxed">
                {event.program.split("\n").map((line, index) => (
                  <motion.p
                    key={index}
                    className="mb-3"
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
              className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-amber-200 md:col-span-2"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
            >
              <motion.div
                className="flex items-center mb-6"
                initial={{ x: -20, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                viewport={{ once: true }}
              >
                <span className="text-4xl mr-4">👔</span>
                <h4 className="text-2xl font-bold text-amber-700 font-serif">Dresscode</h4>
              </motion.div>
              <div className="text-amber-700 leading-relaxed">
                {event.dresscode.split("\n").map((line, index) => (
                  <motion.p
                    key={index}
                    className="mb-3"
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
              className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-amber-200 md:col-span-2"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
            >
              <motion.div
                className="flex items-center mb-6"
                initial={{ x: -20, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                viewport={{ once: true }}
              >
                <span className="text-4xl mr-4">💝</span>
                <h4 className="text-2xl font-bold text-amber-700 font-serif">Yderligere information</h4>
              </motion.div>
              <div className="text-amber-700 leading-relaxed">
                {event.additionalInfo.split("\n").map((line, index) => (
                  <motion.p
                    key={index}
                    className="mb-3"
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

        {/* Natural Footer */}
        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          viewport={{ once: true }}
        >
          <motion.p
            className="text-xl text-amber-600 font-serif italic"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.9 }}
            viewport={{ once: true }}
          >
            I harmoni med naturen 💚
          </motion.p>
        </motion.div>
      </div>
    </motion.div>
  );
}
