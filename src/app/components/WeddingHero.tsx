"use client";

import { useRouter } from "next/navigation";
import { BetterAuthUser } from "../../../lib/auth-types";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface WeddingHeroProps {
  user: BetterAuthUser | null;
}

export function WeddingHero({ user }: WeddingHeroProps) {
  const router = useRouter();

  const handleAuthAction = () => {
    if (user) {
      document.getElementById("rsvp-section")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    } else {
      router.push("/login");
    }
  };

  return (
    <section className="wedding-hero relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Reduced background overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/30 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      />

      {/* Main content */}
      <motion.div
        className="relative z-20 text-center text-white px-4 max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        {/* Names */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 wedding-script text-wedding-ivory drop-shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            whileHover={{ scale: 1.02 }}
          >
            Tirill
          </motion.h1>

          {/* Simple infinity symbol */}
          <motion.div
            className="flex items-center justify-center mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 1.0 }}
          >
            <motion.div
              className="w-16 h-px bg-wedding-bronze rounded-full"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.5, delay: 1.2 }}
            />
            <motion.div
              className="text-3xl md:text-4xl font-bold text-wedding-bronze mx-6"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                duration: 0.6,
                delay: 1.3,
                type: "spring",
                stiffness: 200,
              }}
              whileHover={{
                rotate: 360,
                scale: 1.1,
                transition: { duration: 0.5 },
              }}
            >
              ∞
            </motion.div>
            <motion.div
              className="w-16 h-px bg-wedding-bronze rounded-full"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.5, delay: 1.4 }}
            />
          </motion.div>

          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold wedding-script text-wedding-ivory drop-shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.5 }}
            whileHover={{ scale: 1.02 }}
          >
            Christian
          </motion.h1>
        </motion.div>

        {/* Wedding announcement */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.8 }}
        >
          <motion.p
            className="text-xl md:text-2xl lg:text-3xl mb-6 wedding-serif font-light tracking-wide text-wedding-ivory"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 2.0 }}
          >
            Vi gifter os
          </motion.p>

          <motion.p
            className="text-base md:text-lg opacity-90 wedding-serif font-light text-wedding-ivory max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 2.2 }}
          >
            Vi inviterer jer til at fejre vores kærlighed
          </motion.p>
        </motion.div>

        {/* Call to action button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 2.5 }}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            <Button
              onClick={handleAuthAction}
              size="lg"
              className="wedding-button px-8 py-4 rounded-full text-lg font-medium shadow-2xl"
            >
              Se invitationen
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 3.0 }}
      >
        <motion.div
          className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center p-2"
          animate={{ y: [0, 8, 0] }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <motion.div
            className="w-1 h-2 bg-white/60 rounded-full"
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
