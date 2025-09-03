"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Send } from "lucide-react";
import { forgetPassword } from "../../../lib/auth-client";

interface ForgotPasswordFormProps {
  onBack: () => void;
}

export function ForgotPasswordForm({ onBack }: ForgotPasswordFormProps) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    if (!email) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await forgetPassword({
        email,
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (response.error) {
        setError(
          response.error.message ||
              "Failed to send reset email. Please try again."
        );
        return;
      }

      setIsSubmitted(true);
    } catch (error) {
      console.error("Error in handleSubmit:", error);
      setError(
        error instanceof Error
          ? error.message
          : "Failed to send reset email. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-6 space-y-4"
      >
        <div className="text-center">
          <div className="text-5xl mb-4 text-wedding-bronze flex justify-center">
            <div className="w-12 h-12 bg-wedding-bronze/10 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-wedding-bronze" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 00-2-2H5a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
          <h3 className="text-lg font-medium text-wedding-navy mb-2">
            Email sendt!
          </h3>
          <p className="text-sm text-wedding-stone mb-4">
            Tjek din email for et link til at nulstille dit password.
          </p>
          <div className="space-y-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setIsSubmitted(false);
                setError(null);
              }}
              className="w-full text-sm text-wedding-bronze hover:text-wedding-bronze/80 transition-colors duration-200"
            >
              Send en ny email
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onBack}
              className="w-full text-sm text-wedding-navy hover:text-wedding-bronze transition-colors duration-200"
            >
              Tilbage til login
            </motion.button>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-6 space-y-4"
    >
      <div className="text-center">
        <h3 className="text-lg font-medium text-wedding-navy mb-4">
          Glemt password?
        </h3>
        <p className="text-sm text-wedding-stone mb-4">
          Indtast din email for at få et nyt password.
        </p>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <Label htmlFor="forgotEmail" className="text-sm font-medium text-wedding-navy">
            Email
          </Label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-4 w-4 text-wedding-stone" />
            <Input
              id="forgotEmail"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 pl-10 border-wedding-linen focus:border-wedding-bronze"
              placeholder="din.email@eksempel.dk"
              onKeyDown={(e) => {
                if (e.key === "Enter" && email) {
                  e.preventDefault();
                  handleSubmit();
                }
              }}
            />
          </div>
        </div>

        <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
          <Button
            type="submit"
            onClick={handleSubmit}
            disabled={loading || !email}
            className="w-full wedding-button cursor-pointer py-3 text-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="flex items-center space-x-2">
                <div className="size-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Sender...</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Send className="size-4" />
                <span>Send reset link</span>
              </div>
            )}
          </Button>
        </motion.div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="button"
          onClick={onBack}
          className="w-full text-sm text-wedding-navy hover:text-wedding-bronze transition-colors duration-200"
        >
          Tilbage til login
        </motion.button>
      </form>
    </motion.div>
  );
}
