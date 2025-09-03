"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "../../../lib/auth-client";
import { ForgotPasswordForm } from "@/components/auth/forgot-password-form";

interface EmailLoginFormProps {
  onBack: () => void;
}

export function EmailLoginForm({ onBack }: EmailLoginFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [authError, setAuthError] = useState<string>("");
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
    // Clear auth error when user starts typing
    if (authError) {
      setAuthError("");
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
    } else if (formData.password.length < 8) {
      newErrors.password = "Password skal være mindst 8 tegn";
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
    setAuthError(""); // Clear any previous auth errors

    try {
      if (isSignUp) {
        const { data, error } = await authClient.signUp.email(
          {
            email: formData.email,
            password: formData.password,
            name: formData.name,
            callbackURL: "/",
          },
          {
            onError: (ctx) => {
              setAuthError(`Opretning af konto fejlede: ${ctx.error.message}`);
            },
          }
        );

        if (error) {
          if (
            error.message?.includes("already exists") ||
            error.message?.includes("duplicate") ||
            error.message?.includes("unique")
          ) {
            setAuthError(
              "En bruger med denne email findes allerede. Prøv at logge ind i stedet."
            );
          } else {
            setAuthError(`Opretning af konto fejlede: ${error.message}`);
          }
        } else {
          if (data?.user) {
            console.log("User created successfully, redirecting...");
            window.location.href = "/";
          } else {
            try {
              const session = await authClient.getSession();
              if (session.data?.user) {
                window.location.href = "/";
              } else {
                setAuthError("Konto oprettet! Log venligst ind.");
                setIsSignUp(false);
              }
            } catch (sessionError) {
              console.error("Error getting session:", sessionError);
              setIsSignUp(false);
            }
          }
        }
      } else {
        const { data, error } = await authClient.signIn.email(
          {
            email: formData.email,
            password: formData.password,
            callbackURL: "/",
            rememberMe: true,
          },
          {
            onError: (ctx) => {
              setAuthError(`Log ind fejlede: ${ctx.error.message}`);
            },
          }
        );

        if (error) {
          if (
            error.message?.includes("invalid") ||
            error.message?.includes("wrong") ||
            error.message?.includes("incorrect")
          ) {
            setAuthError("Forkert email eller password. Prøv igen.");
          } else if (
            error.message?.includes("not found") ||
            error.message?.includes("doesn't exist")
          ) {
            setAuthError(
              "Ingen bruger fundet med denne email. Opret en konto i stedet."
            );
          } else {
            setAuthError(`Log ind fejlede: ${error.message}`);
          }
        } else {
          if (data?.user) {
            window.location.href = "/";
          } else {
            try {
              const session = await authClient.getSession();
              if (session.data?.user) {
                window.location.href = "/";
              } else {
                setAuthError(
                  "Log ind fejlede. Tjek venligst dine oplysninger."
                );
              }
            } catch (sessionError) {
              console.error("Error getting session:", sessionError);
              setAuthError("Log ind fejlede. Tjek venligst dine oplysninger.");
            }
          }
        }
      }
    } catch (error) {
      console.error("Auth error:", error);
      setAuthError(
        `Autentificering fejlede: ${
          error instanceof Error ? error.message : "Ukendt fejl"
        }`
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.2 }}
      className="space-y-4"
    >
      {/* Back button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.05, duration: 0.2 }}
        onClick={onBack}
        className="text-wedding-stone hover:text-wedding-bronze transition-colors duration-200 text-sm mb-4 flex items-center gap-2"
      >
        ← Tilbage til Google login
      </motion.button>

      {/* Toggle between Sign In and Sign Up - Only show when not viewing forgot password */}
      {!showForgotPassword && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.2 }}
          className="flex rounded-lg bg-wedding-linen p-1 mb-6"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsSignUp(false)}
            className={`flex-1 cursor-pointer py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
              !isSignUp
                ? "bg-white text-wedding-navy shadow-sm"
                : "text-wedding-stone hover:text-wedding-bronze"
            }`}
          >
            Log ind
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsSignUp(true)}
            className={`flex-1 cursor-pointer py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
              isSignUp
                ? "bg-white text-wedding-navy shadow-sm"
                : "text-wedding-stone hover:text-wedding-bronze"
            }`}
          >
            Opret konto
          </motion.button>
        </motion.div>
      )}

      {/* General Authentication Error */}
      {authError && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-50 border border-red-200 rounded-md p-3 mb-4"
        >
          <p className="text-sm text-red-600">{authError}</p>
        </motion.div>
      )}

      {/* Email/Password Form - Only show when not viewing forgot password */}
      {!showForgotPassword && (
        <motion.form
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.2 }}
          onSubmit={handleEmailAuth}
          className="space-y-4"
        >
          {isSignUp && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Label
                htmlFor="name"
                className="text-sm font-medium text-wedding-navy"
              >
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
            <Label
              htmlFor="email"
              className="text-sm font-medium text-wedding-navy"
            >
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
            <Label
              htmlFor="password"
              className="text-sm font-medium text-wedding-navy"
            >
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
              placeholder="Mindst 8 tegn"
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">{errors.password}</p>
            )}
            {!isSignUp && (
              <button
                type="button"
                onClick={() => setShowForgotPassword(true)}
                className="text-sm text-wedding-bronze hover:text-wedding-bronze/80 transition-colors duration-200 mt-1"
              >
                Glemt password?
              </button>
            )}
          </div>

          {isSignUp && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Label
                htmlFor="confirmPassword"
                className="text-sm font-medium text-wedding-navy"
              >
                Bekræft password
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={(e) =>
                  handleInputChange("confirmPassword", e.target.value)
                }
                className={`mt-1 border-wedding-linen focus:border-wedding-bronze ${
                  errors.confirmPassword
                    ? "border-red-300 focus:border-red-500"
                    : ""
                }`}
                placeholder="Gentag dit password"
              />
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.confirmPassword}
                </p>
              )}
            </motion.div>
          )}

          <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full wedding-button cursor-pointer py-3 text-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading
                ? isSignUp
                  ? "Opretter konto..."
                  : "Logger ind..."
                : isSignUp
                ? "Opret konto"
                : "Log ind"}
            </Button>
          </motion.div>
        </motion.form>
      )}

      {/* Forgot Password Form */}
      {showForgotPassword && (
        <ForgotPasswordForm onBack={() => setShowForgotPassword(false)} />
      )}
    </motion.div>
  );
}
