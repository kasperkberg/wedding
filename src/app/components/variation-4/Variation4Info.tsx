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

interface Variation4InfoProps {
  user: BetterAuthUser | null;
  event: WeddingEvent | null;
}

export function Variation4Info({ user, event }: Variation4InfoProps) {
  if (!event) {
    return (
      <motion.div
        className="text-center py-20 bg-gradient-to-br from-burgundy-50 to-gold-50"
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
          className="text-3xl mb-6 text-burgundy-800 font-serif"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          Bryllupsoplysninger
        </motion.h3>
        <motion.p
          className="text-lg text-burgundy-600 mb-8 max-w-2xl mx-auto"
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
            <Button asChild size="lg" className="bg-burgundy-600 text-white hover:bg-burgundy-700">
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
      className="py-24 bg-gradient-to-br from-burgundy-50 to-gold-50"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Elegant Header */}
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
            <div className="flex items-center space-x-6">
              <motion.div
                className="w-20 h-px bg-gradient-to-r from-transparent to-burgundy-400"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 1, delay: 0.4 }}
                viewport={{ once: true }}
              />
              <motion.span
                className="text-4xl text-burgundy-600"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                💎
              </motion.span>
              <motion.div
                className="w-20 h-px bg-gradient-to-l from-transparent to-burgundy-400"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 1, delay: 0.6 }}
                viewport={{ once: true }}
              />
            </div>
          </motion.div>

          <motion.h2
            className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-burgundy-600 to-gold-600 bg-clip-text text-transparent mb-6 font-serif"
            initial={{ scale: 0.9 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            viewport={{ once: true }}
          >
            {event.title}
          </motion.h2>

          <motion.div
            className="flex items-center justify-center space-x-4 mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            viewport={{ once: true }}
          >
            <span className="text-3xl">✨</span>
            <div className="w-40 h-px bg-gradient-to-r from-transparent via-gold-400 to-transparent"></div>
            <span className="text-3xl">✨</span>
          </motion.div>
        </motion.div>

        {/* Luxurious Event Showcase */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-block bg-white/80 backdrop-blur-sm rounded-3xl p-12 shadow-2xl border-2 border-gold-200"
            whileHover={{ scale: 1.02, y: -10 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <motion.div
              className="text-7xl mb-8"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              viewport={{ once: true }}
            >
              👑
            </motion.div>

            <motion.h3
              className="text-4xl font-bold text-burgundy-800 mb-6 font-serif"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              viewport={{ once: true }}
            >
              {formatDate(event.date)}
            </motion.h3>

            {event.time && (
              <motion.p
                className="text-2xl text-gold-700 mb-6 font-medium"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.9 }}
                viewport={{ once: true }}
              >
                Kl. {event.time}
              </motion.p>
            )}

            <motion.div
              className="flex items-center justify-center text-burgundy-700 mb-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.1 }}
              viewport={{ once: true }}
            >
              <span className="text-4xl mr-4">🏰</span>
              <span className="text-2xl font-medium">{event.location}</span>
            </motion.div>

            <motion.div
              className="text-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.3 }}
              viewport={{ once: true }}
            >
              <p className="text-lg text-burgundy-600 font-serif italic mb-4">
                &quot;En dag fyldt med elegance og uforglemmelige
                øjeblikke&quot;
              </p>
              <div className="flex items-center justify-center space-x-2 text-gold-600">
                <span>✨</span>
                <span>💎</span>
                <span>✨</span>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Elegant Details Grid */}
        <div className="grid md:grid-cols-2 gap-12">
          {/* Location Details */}
          {event.locationDetails && (
            <motion.div
              className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-burgundy-200"
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
                <h4 className="text-2xl font-bold text-burgundy-700 font-serif">
                  Sted og transport
                </h4>
              </motion.div>
              <div className="text-burgundy-700 leading-relaxed">
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
              className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-burgundy-200"
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
                <h4 className="text-2xl font-bold text-burgundy-700 font-serif">
                  Program
                </h4>
              </motion.div>
              <div className="text-burgundy-700 leading-relaxed">
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
              className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-burgundy-200 md:col-span-2"
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
                <h4 className="text-2xl font-bold text-burgundy-700 font-serif">
                  Dresscode
                </h4>
              </motion.div>
              <div className="text-burgundy-700 leading-relaxed">
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
              className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-burgundy-200 md:col-span-2"
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
                <h4 className="text-2xl font-bold text-burgundy-700 font-serif">
                  Yderligere information
                </h4>
              </motion.div>
              <div className="text-burgundy-700 leading-relaxed">
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

        {/* Elegant Footer */}
        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          viewport={{ once: true }}
        >
          <motion.p
            className="text-2xl text-burgundy-600 font-serif italic"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.9 }}
            viewport={{ once: true }}
          >
            &quot;Vi ser frem til at fejres denne særlige dag med jer&quot;
          </motion.p>
        </motion.div>
      </div>
    </motion.div>
  );
}
