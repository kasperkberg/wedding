"use client";

import { useRouter } from "next/navigation";
import { BetterAuthUser } from "../../../../lib/auth-types";
import { RSVPForm } from "../RSVPForm";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface Variation4RSVPProps {
  user: BetterAuthUser | null;
}

export function Variation4RSVP({ user }: Variation4RSVPProps) {
  const router = useRouter();

  if (!user) {
    return (
      <motion.div
        id="rsvp-section"
        className="py-24 bg-gradient-to-br from-burgundy-50 to-gold-50"
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
              className="text-6xl mb-8"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              💌
            </motion.div>
            <motion.h3
              className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-burgundy-600 to-gold-600 bg-clip-text text-transparent mb-6 font-serif"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              RSVP
            </motion.h3>
            <motion.p
              className="text-xl text-burgundy-600 mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              viewport={{ once: true }}
            >
              Log ind for at svare på denne ærefulde invitation.
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
                className="bg-gradient-to-r from-burgundy-600 to-gold-600 text-white hover:from-burgundy-700 hover:to-gold-700 px-8 py-4 text-lg"
              >
                Log ind
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
      className="py-24 bg-gradient-to-br from-burgundy-50 to-gold-50"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        {/* Luxurious Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="text-6xl mb-8"
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
            viewport={{ once: true }}
          >
            👑
          </motion.div>

          <motion.h3
            className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-burgundy-600 to-gold-600 bg-clip-text text-transparent mb-6 font-serif"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            RSVP
          </motion.h3>

          <motion.p
            className="text-xl text-burgundy-600 max-w-2xl mx-auto mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            viewport={{ once: true }}
          >
            Ærede {user.name}, din tilstedeværelse vil være en stor ære for os.
          </motion.p>

          <motion.div
            className="flex items-center justify-center space-x-4 mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            viewport={{ once: true }}
          >
            <span className="text-3xl">💎</span>
            <div className="w-40 h-px bg-gradient-to-r from-transparent via-gold-400 to-transparent"></div>
            <span className="text-3xl">💎</span>
          </motion.div>
        </motion.div>

        {/* Elegant RSVP Form Container */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <Card className="bg-white/90 backdrop-blur-sm shadow-2xl border-2 border-gold-200 rounded-3xl overflow-hidden">
            <CardContent className="p-8 md:p-12">
              <motion.div
                className="text-center mb-8"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                viewport={{ once: true }}
              >
                <motion.p
                  className="text-lg text-burgundy-600 font-serif italic"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                  viewport={{ once: true }}
                >
                  &quot;Din tilstedeværelse er den største gave&quot;
                </motion.p>
              </motion.div>

              <RSVPForm user={user} />
            </CardContent>
          </Card>
        </motion.div>

        {/* Luxurious Footer */}
        <motion.div
          className="text-center mt-16 pt-8 border-t-2 border-gold-200"
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
            <motion.span
              className="text-3xl"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            >
              💎
            </motion.span>
            <motion.p
              className="text-burgundy-600 font-serif text-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.9 }}
              viewport={{ once: true }}
            >
              Vi takker for din elegante tilstedeværelse ved denne særlige
              begivenhed
            </motion.p>
            <motion.span
              className="text-3xl"
              animate={{ rotate: [0, -360] }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            >
              💎
            </motion.span>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}
