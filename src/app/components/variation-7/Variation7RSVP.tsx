"use client";

import { useRouter } from "next/navigation";
import { BetterAuthUser } from "../../../../lib/auth-types";
import { RSVPForm } from "../RSVPForm";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface Variation7RSVPProps {
  user: BetterAuthUser | null;
}

export function Variation7RSVP({ user }: Variation7RSVPProps) {
  const router = useRouter();

  if (!user) {
    return (
      <motion.div
        id="rsvp-section"
        className="py-32 bg-gray-50"
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
              className="w-32 h-32 border border-gray-300 mx-auto mb-8 flex items-center justify-center"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <span className="text-6xl">🎨</span>
            </motion.div>
            <motion.h3
              className="text-4xl md:text-5xl font-serif font-light text-black mb-6"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              Gallery Admission
            </motion.h3>
            <motion.p
              className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              viewport={{ once: true }}
            >
              Please register to view this exclusive exhibition.
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
                className="bg-black text-white hover:bg-gray-800 border-0 font-light tracking-widest"
              >
                ENTER GALLERY
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
      className="py-32 bg-gray-50"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        {/* Gallery reception header */}
        <motion.div
          className="text-center mb-24"
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

          <motion.h3
            className="text-4xl md:text-5xl font-serif font-light text-black mb-6 tracking-tight"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Guest Registration
          </motion.h3>

          <motion.p
            className="text-xl text-gray-600 max-w-2xl mx-auto mb-8 leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            viewport={{ once: true }}
          >
            Dear {user.name}, we are delighted to welcome you to our intimate
            gathering.
          </motion.p>

          <motion.div
            className="flex items-center justify-center space-x-8 mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="w-16 h-px bg-gray-300"></div>
            <div className="w-3 h-3 bg-black rotate-45"></div>
            <div className="w-16 h-px bg-gray-300"></div>
          </motion.div>
        </motion.div>

        {/* Gallery reception form */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <Card className="border border-gray-300 bg-white shadow-none rounded-none overflow-hidden">
            <CardContent className="p-12 md:p-16">
              <motion.div
                className="text-center mb-12"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                viewport={{ once: true }}
              >
                <motion.p
                  className="text-lg text-gray-600 font-serif font-light italic"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                  viewport={{ once: true }}
                >
                  &quot;Your presence will complete this masterpiece&quot;
                </motion.p>
              </motion.div>

              <RSVPForm user={user} />
            </CardContent>
          </Card>
        </motion.div>

        {/* Gallery reception footer */}
        <motion.div
          className="text-center mt-24 pt-12 border-t border-gray-300"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="flex items-center justify-center space-x-8 mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            viewport={{ once: true }}
          >
            <div className="w-3 h-3 bg-black rotate-45"></div>
            <motion.p
              className="text-gray-600 font-serif font-light text-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.9 }}
              viewport={{ once: true }}
            >
              Thank you for being part of this beautiful celebration
            </motion.p>
            <div className="w-3 h-3 bg-black rotate-45"></div>
          </motion.div>

          {/* Gallery signature */}
          <motion.div
            className="mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.1 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-center space-x-2 text-sm text-gray-500 font-mono tracking-wider">
              <span>TIRILL</span>
              <span>×</span>
              <span>CHRISTIAN</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}
