"use client";

import { useRouter } from "next/navigation";
import { BetterAuthUser } from "../../../../lib/auth-types";
import { motion } from "framer-motion";

interface Variation6HeroProps {
  user: BetterAuthUser | null;
}

export function Variation6Hero({ user }: Variation6HeroProps) {
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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Retro grid background */}
      <div className="absolute inset-0 opacity-20">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="pixelGrid" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <rect width="20" height="20" fill="none" stroke="#00ffff" strokeWidth="0.5" opacity="0.3"/>
              <rect x="19" y="19" width="1" height="1" fill="#ff00ff"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#pixelGrid)" />
        </svg>
      </div>

      {/* Floating retro elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-cyan-400 font-mono"
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 60 - 30, 0],
              rotate: [0, 360],
              opacity: [0.8, 0.4, 0.8],
            }}
            transition={{
              duration: Math.random() * 5 + 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 15 + 10}px`,
            }}
          >
            {["█", "▓", "▒", "░", "■", "□", "▪", "▫"][Math.floor(Math.random() * 8)]}
          </motion.div>
        ))}
      </div>

      {/* Main content */}
      <motion.div
        className="relative z-20 text-center text-white px-6 max-w-5xl mx-auto"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        {/* Retro game border */}
        <motion.div
          className="border-4 border-cyan-400 p-8 mb-8 inline-block"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8, delay: 0.8, type: "spring" }}
        >
          <motion.div
            className="border-2 border-magenta-400 p-6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 1.0, type: "spring" }}
          >
            <motion.div
              className="text-6xl mb-4"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, delay: 1.2, type: "spring" }}
            >
              🎮
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Pixelated title */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1.4 }}
        >
          <motion.p
            className="text-lg md:text-xl mb-8 font-mono tracking-wider text-cyan-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.6 }}
          >
            LEVEL UP YOUR LOVE STORY
          </motion.p>

          {/* Gaming-style names */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.8 }}
          >
            <motion.div
              className="relative"
              whileHover={{ scale: 1.02 }}
            >
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold font-mono tracking-wider text-transparent bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text pixelated">
                TIRILL
              </h1>
              <motion.div
                className="absolute -top-4 -left-4 text-2xl"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                ⭐
              </motion.div>
            </motion.div>

            {/* Game controller symbol */}
            <motion.div
              className="flex items-center justify-center space-x-6"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8, delay: 2.0, type: "spring" }}
            >
              <div className="w-12 h-12 border-2 border-cyan-400 rounded"></div>
              <motion.span
                className="text-6xl font-mono text-magenta-400"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                ×
              </motion.span>
              <div className="w-12 h-12 border-2 border-magenta-400 rounded"></div>
            </motion.div>

            <motion.div
              className="relative"
              whileHover={{ scale: 1.02 }}
            >
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold font-mono tracking-wider text-transparent bg-gradient-to-r from-magenta-400 via-pink-400 to-purple-400 bg-clip-text pixelated">
                CHRISTIAN
              </h1>
              <motion.div
                className="absolute -top-4 -right-4 text-2xl"
                animate={{ rotate: [0, -360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                💎
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Retro game instructions */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 2.2 }}
        >
          <motion.p
            className="text-lg md:text-xl text-cyan-300 font-mono max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 2.4 }}
          >
            [ PRESS START TO BEGIN YOUR QUEST FOR ETERNAL LOVE ]
          </motion.p>
        </motion.div>

        {/* Game button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 2.6 }}
        >
          <motion.button
            onClick={handleAuthAction}
            className="group relative px-8 py-4 bg-gradient-to-r from-cyan-600 to-magenta-600 text-white font-mono font-bold border-4 border-cyan-400 hover:border-magenta-400 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10 tracking-wider text-lg">
              {user ? "[ CONTINUE GAME ]" : "[ INSERT COIN ]"}
            </span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-magenta-600 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              initial={false}
            />
          </motion.button>
        </motion.div>

        {/* Retro sound waves */}
        <motion.div
          className="mt-12 flex justify-center space-x-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 3.0 }}
        >
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className="w-1 bg-cyan-400"
              animate={{ height: [20, 60, 20] }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.1,
              }}
            />
          ))}
        </motion.div>
      </motion.div>

      {/* Scanlines effect */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <div className="w-full h-full bg-gradient-to-b from-transparent via-cyan-400 to-transparent animate-pulse"></div>
      </div>
    </section>
  );
}
