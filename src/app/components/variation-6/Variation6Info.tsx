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

interface Variation6InfoProps {
  user: BetterAuthUser | null;
  event: WeddingEvent | null;
}

export function Variation6Info({ user, event }: Variation6InfoProps) {
  if (!event) {
    return (
      <motion.div
        className="py-24 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"
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
              className="border-4 border-cyan-400 p-8 mb-8 inline-block"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <motion.div
                className="text-4xl mb-4"
                initial={{ rotate: -180 }}
                whileInView={{ rotate: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                viewport={{ once: true }}
              >
                🎯
              </motion.div>
            </motion.div>
            <motion.h3
              className="text-3xl font-mono font-bold text-cyan-400 mb-6 tracking-wider"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              viewport={{ once: true }}
            >
              [ MISSION BRIEFING UNAVAILABLE ]
            </motion.h3>
            <motion.p
              className="text-lg text-cyan-300 mb-8 max-w-2xl mx-auto font-mono"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.0 }}
              viewport={{ once: true }}
            >
              [ SYSTEM ERROR: WEDDING DATA NOT FOUND ]
            </motion.p>
            {user && isAdmin(user.role) && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.2 }}
                viewport={{ once: true }}
              >
                <Button asChild size="lg" className="bg-cyan-600 text-black hover:bg-cyan-500 border-2 border-cyan-400 font-mono tracking-wider">
                  <Link href="/admin">[ INITIALIZE MISSION DATA ]</Link>
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
      className="py-24 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Retro game header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="border-4 border-cyan-400 p-8 mb-8 inline-block"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
          >
            <motion.div
              className="text-5xl mb-4"
              initial={{ scale: 0, rotate: -180 }}
              whileInView={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, delay: 0.4, type: "spring" }}
              viewport={{ once: true }}
            >
              🎮
            </motion.div>
          </motion.div>

          <motion.h2
            className="text-4xl md:text-5xl font-mono font-bold text-transparent bg-gradient-to-r from-cyan-400 to-magenta-400 bg-clip-text mb-8 tracking-wider"
            initial={{ scale: 0.9 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
          >
            [ LEVEL: {event.title.toUpperCase()} ]
          </motion.h2>

          <motion.div
            className="flex items-center justify-center space-x-4 mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="w-16 h-px bg-gradient-to-r from-transparent to-cyan-400"></div>
            <div className="w-4 h-4 border-2 border-cyan-400 rotate-45"></div>
            <div className="w-16 h-px bg-gradient-to-l from-transparent to-cyan-400"></div>
          </motion.div>
        </motion.div>

        {/* Game mission card */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="border-4 border-cyan-400 bg-black/50 backdrop-blur-sm rounded-lg p-12 inline-block max-w-4xl"
            whileHover={{ scale: 1.02, borderColor: "#ff00ff" }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <motion.div
              className="text-6xl mb-8"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
            >
              🎯
            </motion.div>

            <motion.h3
              className="text-3xl font-mono font-bold text-cyan-400 mb-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              viewport={{ once: true }}
            >
              [ MISSION OBJECTIVE ]
            </motion.h3>

            <motion.div
              className="text-2xl text-white mb-6 font-mono"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.9 }}
              viewport={{ once: true }}
            >
              {formatDate(event.date).toUpperCase()}
            </motion.div>

            {event.time && (
              <motion.p
                className="text-xl text-magenta-400 mb-6 font-mono"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 1.1 }}
                viewport={{ once: true }}
              >
                [ START TIME: {event.time} ]
              </motion.p>
            )}

            <motion.div
              className="flex items-center justify-center text-cyan-300 mb-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.3 }}
              viewport={{ once: true }}
            >
              <span className="text-3xl mr-4">📍</span>
              <span className="text-lg font-mono">{event.location.toUpperCase()}</span>
            </motion.div>

            <motion.div
              className="text-center text-sm text-cyan-400 font-mono border-t border-cyan-400 pt-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.5 }}
              viewport={{ once: true }}
            >
              [ COMPLETE OBJECTIVE TO UNLOCK BONUS CONTENT ]
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Game-style grid layout */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Location Details */}
          {event.locationDetails && (
            <motion.div
              className="border-2 border-cyan-400 bg-black/30 p-8"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.01, borderColor: "#00ffff" }}
            >
              <motion.div
                className="flex items-center mb-6"
                initial={{ x: -20, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <span className="text-3xl mr-4">🗺️</span>
                <h4 className="text-xl font-mono font-bold text-cyan-400">[ LOCATION GRID ]</h4>
              </motion.div>
              <div className="text-cyan-300 leading-relaxed font-mono">
                {event.locationDetails.split("\n").map((line, index) => (
                  <motion.p
                    key={index}
                    className="mb-4"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    [ {line} ]
                  </motion.p>
                ))}
              </div>
            </motion.div>
          )}

          {/* Program */}
          {event.program && (
            <motion.div
              className="border-2 border-magenta-400 bg-black/30 p-8"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.01, borderColor: "#ff00ff" }}
            >
              <motion.div
                className="flex items-center mb-6"
                initial={{ x: -20, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                viewport={{ once: true }}
              >
                <span className="text-3xl mr-4">📋</span>
                <h4 className="text-xl font-mono font-bold text-magenta-400">[ QUEST LOG ]</h4>
              </motion.div>
              <div className="text-magenta-300 leading-relaxed font-mono">
                {event.program.split("\n").map((line, index) => (
                  <motion.p
                    key={index}
                    className="mb-4"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    [ {line} ]
                  </motion.p>
                ))}
              </div>
            </motion.div>
          )}

          {/* Dresscode */}
          {event.dresscode && (
            <motion.div
              className="border-2 border-cyan-400 bg-black/30 p-8 md:col-span-2"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.01, borderColor: "#00ffff" }}
            >
              <motion.div
                className="flex items-center mb-6"
                initial={{ x: -20, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                viewport={{ once: true }}
              >
                <span className="text-3xl mr-4">👔</span>
                <h4 className="text-xl font-mono font-bold text-cyan-400">[ CHARACTER LOADOUT ]</h4>
              </motion.div>
              <div className="text-cyan-300 leading-relaxed font-mono">
                {event.dresscode.split("\n").map((line, index) => (
                  <motion.p
                    key={index}
                    className="mb-4"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    [ {line} ]
                  </motion.p>
                ))}
              </div>
            </motion.div>
          )}

          {/* Additional Info */}
          {event.additionalInfo && (
            <motion.div
              className="border-2 border-magenta-400 bg-black/30 p-8 md:col-span-2"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.01, borderColor: "#ff00ff" }}
            >
              <motion.div
                className="flex items-center mb-6"
                initial={{ x: -20, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                viewport={{ once: true }}
              >
                <span className="text-3xl mr-4">💡</span>
                <h4 className="text-xl font-mono font-bold text-magenta-400">[ HIDDEN LEVELS ]</h4>
              </motion.div>
              <div className="text-magenta-300 leading-relaxed font-mono">
                {event.additionalInfo.split("\n").map((line, index) => (
                  <motion.p
                    key={index}
                    className="mb-4"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.9 + index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    [ {line} ]
                  </motion.p>
                ))}
              </div>
            </motion.div>
          )}
        </div>

        {/* Game footer */}
        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          viewport={{ once: true }}
        >
          <motion.p
            className="text-lg text-cyan-400 font-mono"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.9 }}
            viewport={{ once: true }}
          >
            [ LOADING NEXT LEVEL... ]
          </motion.p>
        </motion.div>
      </div>
    </motion.div>
  );
}
