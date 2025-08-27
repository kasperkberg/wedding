"use client";

import { useRouter } from "next/navigation";
import { BetterAuthUser } from "../../../../lib/auth-types";
import { motion } from "framer-motion";

interface Variation7HeroProps {
  user: BetterAuthUser | null;
}

export function Variation7Hero({ user }: Variation7HeroProps) {
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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white">
      {/* Subtle geometric pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="gallery" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <circle cx="50" cy="50" r="1" fill="#000" />
              <line x1="50" y1="0" x2="50" y2="100" stroke="#000" strokeWidth="0.2" />
              <line x1="0" y1="50" x2="100" y2="50" stroke="#000" strokeWidth="0.2" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#gallery)" />
        </svg>
      </div>

      {/* Main content */}
      <motion.div
        className="relative z-20 max-w-6xl mx-auto px-6 lg:px-8"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        {/* Gallery-style layout */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left side - Artistic title */}
          <motion.div
            className="text-left"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.div
              className="mb-8"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4, type: "spring" }}
            >
              <div className="w-24 h-1 bg-black mb-4"></div>
              <h2 className="text-2xl font-light text-gray-600 tracking-widest">EXHIBITION</h2>
            </motion.div>

            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <motion.h1
                className="text-7xl md:text-8xl lg:text-9xl font-serif font-light leading-none text-black"
                whileHover={{ scale: 1.02 }}
              >
                Tirill
              </motion.h1>

              <motion.div
                className="flex items-center space-x-4"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.8, delay: 0.8, type: "spring" }}
              >
                <div className="w-12 h-px bg-black"></div>
                <motion.span
                  className="text-3xl font-serif"
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  ×
                </motion.span>
                <div className="w-12 h-px bg-black"></div>
              </motion.div>

              <motion.h1
                className="text-7xl md:text-8xl lg:text-9xl font-serif font-light leading-none text-black"
                whileHover={{ scale: 1.02 }}
              >
                Christian
              </motion.h1>
            </motion.div>

            <motion.div
              className="mt-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
            >
              <p className="text-lg text-gray-700 font-light leading-relaxed max-w-md">
                An intimate gathering celebrating the union of two souls in perfect harmony.
              </p>
            </motion.div>

            <motion.div
              className="mt-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
            >
              <motion.button
                onClick={handleAuthAction}
                className="group px-8 py-3 border-2 border-black text-black hover:bg-black hover:text-white transition-all duration-300 font-light tracking-widest"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {user ? "VIEW EXHIBITION" : "ENTER GALLERY"}
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Right side - Gallery piece */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <motion.div
              className="aspect-square bg-gray-50 border border-gray-200 flex items-center justify-center"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.div
                className="text-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.8, delay: 1.0, type: "spring" }}
              >
                <motion.div
                  className="text-8xl mb-4"
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  💫
                </motion.div>
                <p className="text-sm text-gray-500 font-light tracking-wider">
                  INTERACTIVE INSTALLATION
                </p>
              </motion.div>
            </motion.div>

            {/* Gallery label */}
            <motion.div
              className="absolute -bottom-8 left-0 right-0 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.4 }}
            >
              <div className="bg-white px-6 py-2 border border-gray-200 inline-block shadow-sm">
                <p className="text-xs text-gray-500 font-mono tracking-wider">
                  TIRILL × CHRISTIAN • 2024 • UNIQUE PIECE
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Gallery navigation dots */}
        <motion.div
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex space-x-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 2.0 }}
        >
          {[1, 2, 3].map((dot, index) => (
            <motion.div
              key={dot}
              className={`w-2 h-2 rounded-full ${
                index === 0 ? 'bg-black' : 'bg-gray-300'
              }`}
              animate={{ scale: index === 0 ? [1, 1.2, 1] : 1 }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          ))}
        </motion.div>
      </motion.div>

      {/* Museum-style lighting effect */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white/50 to-transparent"></div>
    </section>
  );
}
