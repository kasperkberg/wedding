"use client";

import { useRouter } from "next/navigation";
import { BetterAuthUser } from "../../../../lib/auth-types";
import { motion } from "framer-motion";

interface Variation4HeroProps {
  user: BetterAuthUser | null;
}

export function Variation4Hero({ user }: Variation4HeroProps) {
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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-burgundy-900 via-burgundy-800 to-gold-900">
      {/* Elegant background pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="luxury" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
              <circle cx="30" cy="30" r="1.5" fill="#FFD700" />
              <circle cx="10" cy="10" r="1" fill="#FFD700" />
              <circle cx="50" cy="50" r="1" fill="#FFD700" />
              <path d="M20,20 L40,20 M30,10 L30,40" stroke="#FFD700" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#luxury)" />
        </svg>
      </div>

      {/* Floating gold particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-gold-400"
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 50 - 25, 0],
              rotate: [0, 180, 360],
              opacity: [0.8, 0.4, 0.8],
            }}
            transition={{
              duration: Math.random() * 6 + 4,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 8 + 6}px`,
            }}
          >
            ✨
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
        {/* Elegant decorative elements */}
        <motion.div
          className="flex items-center justify-center mb-8"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8, delay: 0.8, type: "spring" }}
        >
          <div className="flex items-center space-x-8">
            <motion.div
              className="w-16 h-px bg-gradient-to-r from-transparent to-gold-400"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 1 }}
            />
            <motion.span
              className="text-4xl text-gold-400"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              💎
            </motion.span>
            <motion.div
              className="w-16 h-px bg-gradient-to-l from-transparent to-gold-400"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 1.2 }}
            />
          </div>
        </motion.div>

        {/* Wedding announcement */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <motion.p
            className="text-xl md:text-2xl mb-6 font-light tracking-widest text-gold-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.4 }}
          >
            EN ÆDELIG BEGIVENHED
          </motion.p>

          {/* Luxurious names */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.6 }}
          >
            <motion.div
              className="relative"
              whileHover={{ scale: 1.02 }}
            >
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold bg-gradient-to-r from-gold-400 via-yellow-300 to-gold-500 bg-clip-text text-transparent font-serif tracking-wider">
                TIRILL
              </h1>
              <motion.div
                className="absolute -top-8 -left-8 text-4xl opacity-70"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              >
                👑
              </motion.div>
            </motion.div>

            {/* Elegant ampersand */}
            <motion.div
              className="flex items-center justify-center space-x-6"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8, delay: 1.8, type: "spring" }}
            >
              <motion.span
                className="text-6xl md:text-7xl text-gold-400 font-serif"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2.5, repeat: Infinity }}
              >
                &
              </motion.span>
              <motion.span
                className="text-3xl text-gold-300"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                💍
              </motion.span>
            </motion.div>

            <motion.div
              className="relative"
              whileHover={{ scale: 1.02 }}
            >
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold bg-gradient-to-r from-gold-400 via-yellow-300 to-gold-500 bg-clip-text text-transparent font-serif tracking-wider">
                CHRISTIAN
              </h1>
              <motion.div
                className="absolute -top-8 -right-8 text-4xl opacity-70"
                animate={{ rotate: [0, -360] }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              >
                👑
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Luxurious message */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 2.0 }}
        >
          <motion.p
            className="text-lg md:text-xl text-gold-100 font-medium italic max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 2.2 }}
          >
            Med største ære og glæde inviterer vi til en uforglemmelig dag fyldt med elegance og kærlighed
          </motion.p>
        </motion.div>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 2.4 }}
        >
          <motion.button
            onClick={handleAuthAction}
            className="group relative px-10 py-5 bg-gradient-to-r from-gold-600 to-yellow-600 text-burgundy-900 font-bold rounded-full shadow-2xl hover:shadow-gold-500/25 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10 flex items-center gap-2 text-lg">
              <span>{user ? "Se invitationen" : "Til invitationen"}</span>
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                👑
              </motion.span>
            </span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-yellow-600 to-gold-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
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
              className="text-3xl text-gold-400"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              👑
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}
