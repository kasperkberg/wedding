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
        className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50 z-10"
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
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 wedding-abramo text-wedding-ivory drop-shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            whileHover={{ scale: 1.02 }}
          >
            Tirill & Christian
          </motion.h1>

          <motion.div
            className="wedding-divider"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 1.0 }}
          />
        </motion.div>

        {/* Wedding announcement */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.8 }}
        >
          <motion.p
            className="text-2xl md:text-3xl lg:text-4xl mb-6 wedding-abramo font-light tracking-wide text-wedding-ivory"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 2.0 }}
          >
            Vi gifter os
          </motion.p>

          <motion.p
            className="text-lg md:text-xl opacity-90 wedding-abramo font-light text-wedding-ivory max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 2.2 }}
          >
            Vi inviterer jer til at fejre vores kærlighed
          </motion.p>

          {/* Save the date */}
          <motion.p
            className="text-xl md:text-2xl lg:text-3xl mt-6 wedding-abramo font-medium text-wedding-ivory"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 2.4 }}
          >
            Save the date
            <br />
            26.06.2026
          </motion.p>
        </motion.div>

        {/* Call to action button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 2.5 }}
        >
          <Button
            onClick={handleAuthAction}
            size="lg"
            className="hover:scale-105 wedding-button cursor-pointer px-6 md:px-8 py-3 md:py-4 rounded-full text-base md:text-lg font-medium shadow-2xl min-w-[160px] md:min-w-[200px]"
          >
            Tilmeld dig
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}
