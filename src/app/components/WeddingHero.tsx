"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { User } from "../../../lib/auth-types";
import { authClient } from "../../../lib/auth-client";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export function WeddingHero() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data } = await authClient.getSession();
        setUser(data?.user as User | null);
      } catch (error) {
        console.error("Error checking auth:", error);
      }
    };

    checkAuth();
  }, []);

  const handleAuthAction = () => {
    if (user) {
      // Scroll to RSVP section if authenticated
      document.getElementById("rsvp-section")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    } else {
      router.push("/login");
    }
  };

  return (
    <section className="wedding-hero relative overflow-hidden">
      {/* Overlay for better text readability */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      ></motion.div>

      {/* Main content */}
      <div className="relative z-20 flex items-center justify-center min-h-screen px-4">
        <motion.div
          className="text-center text-white"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
        >
          {/* Main heading with elegant styling */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <motion.h1
              className="text-6xl md:text-8xl font-bold mb-4 wedding-script text-wedding-ivory drop-shadow-lg"
              initial={{ opacity: 0, x: -100, rotate: -10 }}
              animate={{ opacity: 1, x: 0, rotate: 0 }}
              transition={{
                delay: 1.0,
                duration: 1.2,
                type: "spring",
                stiffness: 100
              }}
              whileHover={{ scale: 1.05 }}
            >
              Tirill
            </motion.h1>

            <motion.div
              className="flex items-center justify-center mb-4"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.5, duration: 0.8, type: "spring", stiffness: 200 }}
            >
              <motion.div
                className="flex-1 h-px bg-gradient-to-r from-transparent via-wedding-bronze to-transparent"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 1.7, duration: 0.6 }}
              ></motion.div>
              <motion.div
                className="text-4xl mx-6 font-bold text-wedding-bronze"
                initial={{ scale: 0, rotate: 180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{
                  delay: 1.8,
                  duration: 0.8,
                  type: "spring",
                  stiffness: 300
                }}
                whileHover={{ rotate: 360 }}
                whileTap={{ scale: 1.2 }}
              >
                ∞
              </motion.div>
              <motion.div
                className="flex-1 h-px bg-gradient-to-r from-transparent via-wedding-bronze to-transparent"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 1.9, duration: 0.6 }}
              ></motion.div>
            </motion.div>

            <motion.h1
              className="text-6xl md:text-8xl font-bold mb-6 wedding-script text-wedding-ivory drop-shadow-lg"
              initial={{ opacity: 0, x: 100, rotate: 10 }}
              animate={{ opacity: 1, x: 0, rotate: 0 }}
              transition={{
                delay: 2.0,
                duration: 1.2,
                type: "spring",
                stiffness: 100
              }}
              whileHover={{ scale: 1.05 }}
            >
              Christian
            </motion.h1>
          </motion.div>

          {/* Wedding announcement */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.5, duration: 0.8 }}
          >
            <motion.p
              className="text-xl md:text-2xl mb-4 wedding-serif font-light tracking-wider text-wedding-ivory"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 2.7, duration: 0.6 }}
            >
              Vi gifter os
            </motion.p>

            <motion.div
              className="w-32 h-px bg-wedding-bronze mx-auto mb-6 rounded-full"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 2.9, duration: 0.5 }}
            ></motion.div>

            <motion.p
              className="text-lg md:text-xl opacity-90 wedding-serif font-light text-wedding-ivory"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 3.1, duration: 0.6 }}
            >
              Vi inviterer jer til at fejre vores kærlighed
            </motion.p>
          </motion.div>

          {/* Call to action button */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3.3, duration: 0.6 }}
          >
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Button
                onClick={handleAuthAction}
                size="lg"
                className="wedding-button px-8 py-4 rounded-full text-lg font-medium shadow-2xl"
              >
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 3.5, duration: 0.4 }}
                >
                  {user ? "Se invitationen" : "Se invitation"}
                </motion.span>
              </Button>
            </motion.div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 4.0, duration: 0.6 }}
          >
            <motion.div
              className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center"
              animate={{ y: [0, 10, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <motion.div
                className="w-1 h-3 bg-white/70 rounded-full mt-2"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              ></motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative bottom border */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-wedding-sage to-transparent z-15"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.8, duration: 1 }}
      ></motion.div>
    </section>
  );
}
