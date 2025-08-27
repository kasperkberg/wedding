"use client";

import { useRouter } from "next/navigation";
import { BetterAuthUser } from "../../../../lib/auth-types";
import { RSVPForm } from "../RSVPForm";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface Variation5RSVPProps {
  user: BetterAuthUser | null;
}

export function Variation5RSVP({ user }: Variation5RSVPProps) {
  const router = useRouter();

  if (!user) {
    return (
      <motion.div
        id="rsvp-section"
        className="py-24 bg-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="w-12 h-12 border-2 border-black mx-auto mb-8"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            />
            <motion.h3
              className="text-3xl md:text-4xl font-light text-black mb-6 font-mono tracking-wider"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              [ RSVP ]
            </motion.h3>
            <motion.p
              className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto font-mono"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              viewport={{ once: true }}
            >
              [ Log ind for at svare på invitationen ]
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              viewport={{ once: true }}
            >
              <Button
                onClick={() => router.push("/login")}
                size="lg"
                className="bg-black text-white hover:bg-gray-800 border-0 font-mono tracking-wider"
              >
                [ LOG IND ]
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      id="rsvp-section"
      className="py-24 bg-white"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        {/* Minimalist Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="w-16 h-16 border-2 border-black mx-auto mb-8"
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
            viewport={{ once: true }}
          >
            <motion.div
              className="w-4 h-4 bg-black mx-auto mt-6"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3, delay: 0.6 }}
            />
          </motion.div>

          <motion.h3
            className="text-3xl md:text-4xl font-light text-black mb-6 font-mono tracking-wider"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            [ RSVP ]
          </motion.h3>

          <motion.p
            className="text-xl text-gray-600 max-w-2xl mx-auto mb-8 font-mono"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            viewport={{ once: true }}
          >
            [ Kære {user.name}, vi glæder os til din tilstedeværelse ]
          </motion.p>

          <motion.div
            className="flex items-center justify-center space-x-4 mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="w-8 h-px bg-black"></div>
            <div className="w-4 h-4 border border-black rotate-45"></div>
            <div className="w-8 h-px bg-black"></div>
          </motion.div>
        </motion.div>

        {/* Clean RSVP Form Container */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <Card className="border-2 border-black shadow-none rounded-none overflow-hidden">
            <CardContent className="p-8 md:p-12">
              <motion.div
                className="text-center mb-8"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                viewport={{ once: true }}
              >
                <motion.p
                  className="text-lg text-gray-600 font-mono"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                  viewport={{ once: true }}
                >
                  [ Din tilstedeværelse betyder alt for os ]
                </motion.p>
              </motion.div>

              <RSVPForm user={user} />
            </CardContent>
          </Card>
        </motion.div>

        {/* Minimalist Footer */}
        <motion.div
          className="text-center mt-16 pt-8 border-t-2 border-black"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="flex items-center justify-center space-x-6 mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            viewport={{ once: true }}
          >
            <div className="w-4 h-4 border border-black rotate-45"></div>
            <motion.p
              className="text-gray-600 font-mono text-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.9 }}
              viewport={{ once: true }}
            >
              [ Tak for din deltagelse i vores særlige dag ]
            </motion.p>
            <div className="w-4 h-4 border border-black rotate-45"></div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}
