"use client";

import { useRouter } from "next/navigation";
import { BetterAuthUser } from "../../../../lib/auth-types";
import { motion } from "framer-motion";

interface Variation5HeroProps {
  user: BetterAuthUser | null;
}

export function Variation5Hero({ user }: Variation5HeroProps) {
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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Geometric grid background */}
      <div className="absolute inset-0 opacity-10">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <rect width="40" height="40" fill="none" stroke="#ffffff" strokeWidth="0.5"/>
              <circle cx="20" cy="20" r="1" fill="#ffffff" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Floating geometric shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute border border-white/20"
            animate={{
              y: [0, -40, 0],
              x: [0, Math.random() * 80 - 40, 0],
              rotate: [0, 360],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: Math.random() * 8 + 6,
              repeat: Infinity,
              delay: Math.random() * 4,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 60 + 20}px`,
              height: `${Math.random() * 60 + 20}px`,
            }}
          >
            {i % 4 === 0 && <div className="w-full h-full bg-white/5" />}
            {i % 4 === 1 && <div className="w-full h-full rounded-full bg-white/5" />}
            {i % 4 === 2 && <div className="w-full h-full rotate-45 bg-white/5" />}
            {i % 4 === 3 && <div className="w-full h-full border-2 border-white/20" style={{clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)'}} />}
          </motion.div>
        ))}
      </div>

      {/* Main content */}
      <motion.div
        className="relative z-20 text-center text-white px-6 max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        {/* Minimalist line */}
        <motion.div
          className="w-32 h-px bg-white mx-auto mb-16"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
        />

        {/* Wedding announcement */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <motion.p
            className="text-lg md:text-xl mb-12 font-light tracking-widest text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            WEDDING
          </motion.p>

          {/* Clean names */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
          >
            <motion.div
              className="relative"
              whileHover={{ scale: 1.02 }}
            >
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight font-mono">
                TIRILL
              </h1>
              <motion.div
                className="absolute -top-2 -left-2 w-4 h-4 border border-white"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.4, delay: 1.6 }}
              />
            </motion.div>

            {/* Minimalist divider */}
            <motion.div
              className="flex items-center justify-center space-x-4"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8, delay: 1.6, type: "spring" }}
            >
              <div className="w-8 h-px bg-white"></div>
              <motion.span
                className="text-4xl font-light"
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                ×
              </motion.span>
              <div className="w-8 h-px bg-white"></div>
            </motion.div>

            <motion.div
              className="relative"
              whileHover={{ scale: 1.02 }}
            >
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight font-mono">
                CHRISTIAN
              </h1>
              <motion.div
                className="absolute -top-2 -right-2 w-4 h-4 border border-white"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.4, delay: 1.8 }}
              />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Minimalist message */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.8 }}
        >
          <motion.p
            className="text-lg md:text-xl text-gray-300 font-light max-w-3xl mx-auto leading-relaxed font-mono"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 2.0 }}
          >
            [ Vi inviterer jer til at fejre vores forbindelse ]
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
            className="group relative px-8 py-4 border border-white text-white font-light hover:bg-white hover:text-black transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10 tracking-wider">
              {user ? "[ SE INVITATIONEN ]" : "[ LOG IND ]"}
            </span>
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      {user && (
        <motion.div
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-20"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 3.0 }}
        >
          <motion.div
            className="flex flex-col items-center space-y-2"
            animate={{ y: [0, 8, 0] }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <div className="w-px h-8 bg-white/60"></div>
            <div className="w-4 h-4 border border-white/60 rotate-45"></div>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}
