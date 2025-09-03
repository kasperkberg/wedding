"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { LoginHeader } from "./LoginHeader";
import { GoogleLoginButton } from "./GoogleLoginButton";
import { EmailLoginForm } from "./EmailLoginForm";

export function LoginForm() {
  const [showEmailForm, setShowEmailForm] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen flex items-center justify-center bg-wedding-sage p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="max-w-md w-full"
      >
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="bg-wedding-ivory rounded-2xl shadow-xl p-8 border border-wedding-linen"
        >
          <LoginHeader />

          {!showEmailForm ? (
            <>
              <GoogleLoginButton />

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.3 }}
                className="relative my-6"
              >
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-wedding-linen"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-wedding-ivory text-wedding-stone wedding-abramo">
                    eller
                  </span>
                </div>
              </motion.div>

              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.3 }}
                onClick={() => setShowEmailForm(true)}
                className="w-full text-center cursor-pointer text-wedding-sage hover:text-wedding-bronze transition-colors duration-200 py-2"
              >
                Jeg kan ikke logge ind med Google
              </motion.button>
            </>
          ) : (
            <EmailLoginForm onBack={() => setShowEmailForm(false)} />
          )}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
