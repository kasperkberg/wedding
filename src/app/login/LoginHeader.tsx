"use client";

import { motion } from "framer-motion";

export function LoginHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.3 }}
      className="text-center mb-8"
    >
      <motion.h1
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
        className="text-3xl font-bold wedding-abramo text-wedding-sage mb-2"
      >
        Velkommen
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.3 }}
        className="text-wedding-sage wedding-abramo"
      >
        Log ind for at se bryllupsinvitationen
      </motion.p>
    </motion.div>
  );
}
