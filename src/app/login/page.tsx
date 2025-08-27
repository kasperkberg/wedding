"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { authClient } from "../../../lib/auth-client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Check if user is already signed in
  useEffect(() => {
    const checkSession = async () => {
      const { data } = await authClient.getSession();
      if (data?.user) {
        router.push("/");
      }
    };
    checkSession();
  }, [router]);

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });
    } catch (error) {
      console.error("Sign in error:", error);
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email) {
      newErrors.email = "Email er påkrævet";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Ugyldig email format";
    }

    if (!formData.password) {
      newErrors.password = "Password er påkrævet";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password skal være mindst 6 tegn";
    }

    if (isSignUp) {
      if (!formData.name) {
        newErrors.name = "Navn er påkrævet";
      }

      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords stemmer ikke overens";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    try {
      if (isSignUp) {
        // TODO: Implement sign up logic (frontend only for now)
        console.log("Sign up attempt:", { name: formData.name, email: formData.email });
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
      } else {
        // TODO: Implement sign in logic (frontend only for now)
        console.log("Sign in attempt:", { email: formData.email });
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    } catch (error) {
      console.error("Auth error:", error);
    } finally {
      setIsLoading(false);
    }
  };

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
        transition={{ duration: 0.5, delay: 0.2 }}
        className="max-w-md w-full"
      >
        {/* Login Section */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white rounded-2xl shadow-xl p-8 border border-wedding-linen"
        >
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.4 }}
            className="text-center mb-8"
          >
            <motion.div
              className="text-5xl mb-4 text-wedding-bronze"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.8, type: "spring", stiffness: 200 }}
            >
              💍
            </motion.div>
            <motion.h1
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.8, type: "spring", stiffness: 200 }}
              className="text-3xl font-bold wedding-script text-wedding-navy mb-2"
            >
              Velkommen
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.0, duration: 0.4 }}
              className="text-wedding-stone wedding-serif"
            >
              Log ind for at se bryllupsinvitationen
            </motion.p>
          </motion.div>

          {/* Toggle between Sign In and Sign Up */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.4 }}
            className="flex rounded-lg bg-wedding-linen p-1 mb-6"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsSignUp(false)}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
                !isSignUp
                  ? "bg-white text-wedding-navy shadow-sm"
                  : "text-wedding-stone hover:text-wedding-navy"
              }`}
            >
              Log ind
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsSignUp(true)}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
                isSignUp
                  ? "bg-white text-wedding-navy shadow-sm"
                  : "text-wedding-stone hover:text-wedding-navy"
              }`}
            >
              Opret konto
            </motion.button>
          </motion.div>

          {/* Email/Password Form */}
          <motion.form
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.4 }}
            onSubmit={handleEmailAuth}
            className="space-y-4"
          >
            {isSignUp && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Label htmlFor="name" className="text-sm font-medium text-wedding-navy">
                  Navn
                </Label>
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className={`mt-1 border-wedding-linen focus:border-wedding-bronze ${
                    errors.name ? "border-red-300 focus:border-red-500" : ""
                  }`}
                  placeholder="Dit fulde navn"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                )}
              </motion.div>
            )}

            <div>
              <Label htmlFor="email" className="text-sm font-medium text-wedding-navy">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className={`mt-1 border-wedding-linen focus:border-wedding-bronze ${
                  errors.email ? "border-red-300 focus:border-red-500" : ""
                }`}
                placeholder="din.email@eksempel.dk"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            <div>
              <Label htmlFor="password" className="text-sm font-medium text-wedding-navy">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                className={`mt-1 border-wedding-linen focus:border-wedding-bronze ${
                  errors.password ? "border-red-300 focus:border-red-500" : ""
                }`}
                placeholder="Mindst 6 tegn"
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
              )}
            </div>

            {isSignUp && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Label htmlFor="confirmPassword" className="text-sm font-medium text-wedding-navy">
                  Bekræft password
                </Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                  className={`mt-1 border-wedding-linen focus:border-wedding-bronze ${
                    errors.confirmPassword ? "border-red-300 focus:border-red-500" : ""
                  }`}
                  placeholder="Gentag dit password"
                />
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
                )}
              </motion.div>
            )}

            <motion.div
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full wedding-button py-3 text-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading
                  ? (isSignUp ? "Opretter konto..." : "Logger ind...")
                  : (isSignUp ? "Opret konto" : "Log ind")
                }
              </Button>
            </motion.div>
          </motion.form>

          {/* Divider */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3, duration: 0.4 }}
            className="relative my-6"
          >
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-wedding-linen"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-wedding-stone wedding-serif">eller</span>
            </div>
          </motion.div>

          {/* Google Sign In */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.4 }}
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              onClick={handleGoogleSignIn}
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-wedding-linen rounded-lg hover:bg-wedding-linen transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <motion.svg
                initial={{ rotate: 0 }}
                animate={{ rotate: isLoading ? 360 : 0 }}
                transition={{
                  duration: isLoading ? 1 : 0,
                  repeat: isLoading ? Infinity : 0,
                  ease: "linear"
                }}
                className="w-5 h-5"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </motion.svg>
              <motion.span
                key={isLoading ? "loading" : "normal"}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {isLoading ? "Logger ind..." : "Fortsæt med Google"}
              </motion.span>
            </motion.button>
          </motion.div>



        </motion.div>
      </motion.div>
    </motion.div>
  );
}
