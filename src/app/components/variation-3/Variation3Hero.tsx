"use client";

import { useRouter } from "next/navigation";
import { BetterAuthUser } from "../../../../lib/auth-types";
import { motion } from "framer-motion";

interface Variation3HeroProps {
  user: BetterAuthUser | null;
}

export function Variation3Hero({ user }: Variation3HeroProps) {
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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      {/* Wood texture background */}
      <div className="absolute inset-0 opacity-5">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="wood" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
              <rect width="200" height="200" fill="#8B4513" />
              <path d="M0,0 L200,20 L200,0 Z" fill="#654321" opacity="0.3" />
              <path d="M0,40 L200,60 L200,40 Z" fill="#654321" opacity="0.2" />
              <path d="M0,80 L200,100 L200,80 Z" fill="#654321" opacity="0.25" />
              <path d="M0,120 L200,140 L200,120 Z" fill="#654321" opacity="0.15" />
              <path d="M0,160 L200,180 L200,160 Z" fill="#654321" opacity="0.2" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#wood)" />
        </svg>
      </div>

      {/* Floating leaves */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-amber-700"
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 60 - 30, 0],
              rotate: [0, 360],
              opacity: [0.6, 0.9, 0.6],
            }}
            transition={{
              duration: Math.random() * 5 + 4,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 25 + 15}px`,
            }}
          >
            {["🍂", "🌿", "🌳", "🍀"][Math.floor(Math.random() * 4)]}
          </motion.div>
        ))}
      </div>

      {/* Main content */}
      <motion.div
        className="relative z-20 text-center text-amber-900 px-6 max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        {/* Natural wood border */}
        <motion.div
          className="flex items-center justify-center mb-12"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8, delay: 0.8, type: "spring" }}
        >
          <div className="flex space-x-6 text-4xl">
            <motion.span
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              🌿
            </motion.span>
            <motion.span
              animate={{ rotate: [0, -5, 5, 0] }}
              transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
            >
              🍂
            </motion.span>
            <motion.span
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity, delay: 1 }}
            >
              🌳
            </motion.span>
          </div>
        </motion.div>

        {/* Wedding announcement */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <motion.p
            className="text-lg md:text-xl mb-8 font-medium tracking-widest text-amber-700"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            I NATURENS SKØD
          </motion.p>

          {/* Earthy names */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
          >
            <motion.div
              className="relative"
              whileHover={{ scale: 1.02 }}
            >
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold bg-gradient-to-r from-amber-600 via-orange-600 to-yellow-600 bg-clip-text text-transparent font-serif">
                TIRILL
              </h1>
              <motion.div
                className="absolute -top-6 -left-6 text-3xl opacity-70"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              >
                🌿
              </motion.div>
            </motion.div>

            {/* Natural ampersand */}
            <motion.div
              className="flex items-center justify-center space-x-4"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8, delay: 1.6, type: "spring" }}
            >
              <motion.span
                className="text-5xl md:text-7xl text-amber-600 font-serif"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                &
              </motion.span>
              <motion.span
                className="text-2xl"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                🌱
              </motion.span>
            </motion.div>

            <motion.div
              className="relative"
              whileHover={{ scale: 1.02 }}
            >
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold bg-gradient-to-r from-amber-600 via-orange-600 to-yellow-600 bg-clip-text text-transparent font-serif">
                CHRISTIAN
              </h1>
              <motion.div
                className="absolute -top-6 -right-6 text-3xl opacity-70"
                animate={{ rotate: [0, -360] }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              >
                🍂
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Natural message */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.8 }}
        >
          <motion.p
            className="text-lg md:text-xl text-amber-800 font-medium italic max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 2.0 }}
          >
            Vi inviterer jer til at fejre vores kærlighed i naturens smukke omgivelser
          </motion.p>
        </motion.div>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 2.2 }}
        >
          <motion.button
            onClick={handleAuthAction}
            className="group relative px-10 py-5 bg-gradient-to-r from-amber-600 to-orange-600 text-white font-semibold rounded-full shadow-xl hover:shadow-amber-500/25 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10 flex items-center gap-2">
              <span>{user ? "Se invitationen" : "Log ind"}</span>
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                🌿
              </motion.span>
            </span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-orange-600 to-amber-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
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
            animate={{ y: [0, 12, 0] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <motion.div
              className="text-3xl"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              🍂
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}
