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

interface Variation5InfoProps {
  user: BetterAuthUser | null;
  event: WeddingEvent | null;
}

export function Variation5Info({ user, event }: Variation5InfoProps) {
  if (!event) {
    return (
      <motion.div
        className="py-24 bg-gray-50"
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
              className="w-16 h-16 border-2 border-gray-400 mx-auto mb-8"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            />
            <motion.h3
              className="text-2xl font-light text-gray-800 mb-6 font-mono tracking-wider"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
            >
              [ BRYLLUPSOPLYSNINGER ]
            </motion.h3>
            <motion.p
              className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              viewport={{ once: true }}
            >
              [ Bryllupsoplysningerne er endnu ikke oprettet ]
            </motion.p>
            {user && isAdmin(user.role) && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.0 }}
                viewport={{ once: true }}
              >
                <Button asChild size="lg" className="bg-black text-white hover:bg-gray-800 border-0 font-mono tracking-wider">
                  <Link href="/admin">[ OPRET BRYLLUPSOPLYSNINGER ]</Link>
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
      className="py-24 bg-gray-50"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Minimalist Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="flex items-center justify-center mb-12"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
          >
            <div className="flex space-x-4">
              <motion.div
                className="w-8 h-px bg-black"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 1, delay: 0.4 }}
                viewport={{ once: true }}
              />
              <motion.div
                className="w-4 h-4 border border-black rotate-45"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              />
              <motion.div
                className="w-8 h-px bg-black"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 1, delay: 0.8 }}
                viewport={{ once: true }}
              />
            </div>
          </motion.div>

          <motion.h2
            className="text-4xl md:text-5xl font-light text-black mb-8 font-mono tracking-wider"
            initial={{ scale: 0.9 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
          >
            [ {event.title} ]
          </motion.h2>

          <motion.div
            className="w-32 h-px bg-black mx-auto"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            viewport={{ once: true }}
          />
        </motion.div>

        {/* Minimalist Event Display */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-block border-2 border-black p-12"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <motion.div
              className="text-6xl mb-8"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
            >
              ◇
            </motion.div>

            <motion.h3
              className="text-3xl font-light text-black mb-6 font-mono"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              viewport={{ once: true }}
            >
              {formatDate(event.date)}
            </motion.h3>

            {event.time && (
              <motion.p
                className="text-xl text-gray-700 mb-6 font-mono"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.9 }}
                viewport={{ once: true }}
              >
                [ {event.time} ]
              </motion.p>
            )}

            <motion.div
              className="flex items-center justify-center text-gray-700 mb-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.1 }}
              viewport={{ once: true }}
            >
              <span className="text-2xl mr-4">▢</span>
              <span className="text-lg font-mono">{event.location}</span>
            </motion.div>

            <motion.div
              className="text-center text-sm text-gray-600 font-mono"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.3 }}
              viewport={{ once: true }}
            >
              [ Vi ser frem til jeres tilstedeværelse ]
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Clean Grid Layout */}
        <div className="grid md:grid-cols-2 gap-12">
          {/* Location Details */}
          {event.locationDetails && (
            <motion.div
              className="border-2 border-black p-8"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.01 }}
            >
              <motion.div
                className="flex items-center mb-8"
                initial={{ x: -20, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <span className="text-3xl mr-4">▢</span>
                <h4 className="text-xl font-light text-black font-mono">[ STED OG TRANSPORT ]</h4>
              </motion.div>
              <div className="text-gray-700 leading-relaxed font-mono">
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
              className="border-2 border-black p-8"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.01 }}
            >
              <motion.div
                className="flex items-center mb-8"
                initial={{ x: -20, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                viewport={{ once: true }}
              >
                <span className="text-3xl mr-4">▢</span>
                <h4 className="text-xl font-light text-black font-mono">[ PROGRAM ]</h4>
              </motion.div>
              <div className="text-gray-700 leading-relaxed font-mono">
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
              className="border-2 border-black p-8 md:col-span-2"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.01 }}
            >
              <motion.div
                className="flex items-center mb-8"
                initial={{ x: -20, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                viewport={{ once: true }}
              >
                <span className="text-3xl mr-4">▢</span>
                <h4 className="text-xl font-light text-black font-mono">[ DRESSCODE ]</h4>
              </motion.div>
              <div className="text-gray-700 leading-relaxed font-mono">
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
              className="border-2 border-black p-8 md:col-span-2"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.01 }}
            >
              <motion.div
                className="flex items-center mb-8"
                initial={{ x: -20, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                viewport={{ once: true }}
              >
                <span className="text-3xl mr-4">▢</span>
                <h4 className="text-xl font-light text-black font-mono">[ YDERLIGERE INFORMATION ]</h4>
              </motion.div>
              <div className="text-gray-700 leading-relaxed font-mono">
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

        {/* Minimalist Footer */}
        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          viewport={{ once: true }}
        >
          <motion.p
            className="text-lg text-gray-600 font-mono"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.9 }}
            viewport={{ once: true }}
          >
            [ Vi glæder os til at se jer ]
          </motion.p>
        </motion.div>
      </div>
    </motion.div>
  );
}
