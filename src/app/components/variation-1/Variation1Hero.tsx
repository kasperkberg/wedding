"use client";

import { useRouter } from "next/navigation";
import { BetterAuthUser } from "../../../lib/auth-types";
import { motion } from "framer-motion";

interface Variation1HeroProps {
  user: BetterAuthUser | null;
}

export function Variation1Hero({ user }: Variation1HeroProps) {
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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-gray-800 to-black">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-gold-400 rounded-full opacity-30"
            animate={{
              y: [0, -100, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Subtle overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      />

      {/* Main content */}
      <motion.div
        className="relative z-20 text-center text-white px-6 max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        {/* Decorative line */}
        <motion.div
          className="w-24 h-px bg-gradient-to-r from-transparent via-gold-400 to-transparent mx-auto mb-8"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
        />

        {/* Wedding announcement */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <motion.p
            className="text-lg md:text-xl mb-6 font-light tracking-widest text-gold-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            VI GIFTES
          </motion.p>

          {/* Names with elegant styling */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
          >
            <motion.h1
              className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight"
              whileHover={{ scale: 1.02 }}
            >
              <span className="bg-gradient-to-r from-gold-400 via-yellow-300 to-gold-400 bg-clip-text text-transparent">
                TIRILL
              </span>
            </motion.h1>

            {/* Elegant ampersand */}
            <motion.div
              className="text-4xl md:text-6xl text-gold-400 font-serif"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, delay: 1.6, type: "spring" }}
            >
              &
            </motion.div>

            <motion.h1
              className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight"
              whileHover={{ scale: 1.02 }}
            >
              <span className="bg-gradient-to-r from-gold-400 via-yellow-300 to-gold-400 bg-clip-text text-transparent">
                CHRISTIAN
              </span>
            </motion.h1>
          </motion.div>
        </motion.div>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.8 }}
        >
          <motion.button
            onClick={handleAuthAction}
            className="group relative px-8 py-4 bg-gradient-to-r from-gold-500 to-yellow-500 text-black font-semibold rounded-full shadow-2xl hover:shadow-gold-500/25 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10">
              {user ? "Se invitationen" : "Log ind"}
            </span>
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-500 to-gold-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              initial={false}
            />
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      {user && (
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 3.0 }}
        >
          <motion.div
            className="flex flex-col items-center"
            animate={{ y: [0, 8, 0] }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <motion.svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              className="text-gold-400"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <path
                d="M12 5L12 19M12 19L6 13M12 19L18 13"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </motion.svg>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}
