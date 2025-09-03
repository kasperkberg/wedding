"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle, AlertCircle, ArrowLeft, Lock, Eye, EyeOff } from "lucide-react";
import { resetPassword } from "../../../lib/auth-client";

export function ResetPasswordForm() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  useEffect(() => {
    if (!token) {
      setError("Invalid or missing reset token. Please request a new password reset.");
    }
  }, [token]);

  const handleSubmit = async () => {
    if (!newPassword || !confirmPassword || !token) return;

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await resetPassword({
        newPassword,
        token,
      });

      if (response.error) {
        setError(
          response.error.message ||
          "Failed to reset password. The token may be expired or invalid."
        );
        return;
      }

      setIsSuccess(true);

      // Redirect to login page after 3 seconds
      setTimeout(() => {
        router.push("/login");
      }, 3000);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Failed to reset password. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleBackToAuth = () => {
    router.push("/login");
  };

  // Success state
  if (isSuccess) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-wedding-linen via-white to-wedding-linen p-4 md:p-8 pt-12">
        <div className="flex-1 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-wedding-linen p-8"
          >
            <div className="text-center">
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-wedding-navy mb-2">
                Password Reset Successful
              </h2>
              <p className="text-wedding-stone mb-6">
                Your password has been updated successfully
              </p>

              <div className="text-center">
                <p className="text-sm text-wedding-stone mb-4">
                  You will be automatically redirected to the sign-in page in a
                  few seconds.
                </p>

                <Button
                  onClick={handleBackToAuth}
                  variant="outline"
                  className="w-full border-wedding-bronze text-wedding-bronze hover:bg-wedding-bronze hover:text-white transition-colors duration-200"
                >
                  <ArrowLeft className="size-4 mr-2" />
                  Go to Sign In Now
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  // Invalid token state
  if (!token) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-wedding-linen via-white to-wedding-linen p-4 md:p-8 pt-12">
        <div className="flex-1 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-wedding-linen p-8"
          >
            <div className="text-center">
              <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <AlertCircle className="w-8 h-8 text-red-600" />
              </div>
              <h2 className="text-2xl font-bold text-wedding-navy mb-2">
                Invalid Reset Link
              </h2>
              <p className="text-wedding-stone mb-6">
                This password reset link is invalid or has expired
              </p>

              <div className="text-center space-y-4">
                <p className="text-sm text-wedding-stone">
                  Password reset links expire after 1 hour for security reasons.
                  Please request a new password reset link.
                </p>

                <Button onClick={handleBackToAuth} className="w-full wedding-button">
                  <ArrowLeft className="size-4 mr-2" />
                  Back to Sign In
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  const isFormValid =
    newPassword &&
    confirmPassword &&
    newPassword === confirmPassword &&
    newPassword.length >= 8;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-wedding-linen via-white to-wedding-linen p-4 md:p-8 pt-12">
      <div className="flex-1 flex items-start justify-center">
        <div className="w-full max-w-md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-xl border border-wedding-linen p-8"
          >
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-wedding-navy mb-2">
                Reset Your Password
              </h1>
              <p className="text-wedding-stone">
                Enter your new password to complete the reset
              </p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            <div className="space-y-6">
              <div className="space-y-2">
                <Label
                  htmlFor="new-password"
                  className="text-sm font-medium text-wedding-navy"
                >
                  New Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-wedding-stone" />
                  <Input
                    id="new-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    disabled={loading}
                    className="pl-10 pr-10 border-wedding-linen focus:border-wedding-bronze"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-wedding-stone hover:text-wedding-bronze transition-colors"
                    disabled={loading}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                <p className="text-xs text-wedding-stone">
                  Password must be at least 8 characters long
                </p>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="confirm-password"
                  className="text-sm font-medium text-wedding-navy"
                >
                  Confirm Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-wedding-stone" />
                  <Input
                    id="confirm-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    disabled={loading}
                    className="pl-10 border-wedding-linen focus:border-wedding-bronze"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && isFormValid) {
                        handleSubmit();
                      }
                    }}
                  />
                </div>
              </div>

              {/* Password match indicator */}
              {newPassword && confirmPassword && (
                <div className="flex items-center space-x-2">
                  {newPassword === confirmPassword ? (
                    <>
                      <CheckCircle className="size-4 text-green-500" />
                      <span className="text-sm text-green-600">
                        Passwords match
                      </span>
                    </>
                  ) : (
                    <>
                      <AlertCircle className="size-4 text-red-500" />
                      <span className="text-sm text-red-500">
                        Passwords do not match
                      </span>
                    </>
                  )}
                </div>
              )}

              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  onClick={handleSubmit}
                  className="w-full wedding-button cursor-pointer py-3 text-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={loading || !isFormValid}
                >
                  {loading ? (
                    <div className="flex items-center space-x-2">
                      <div className="size-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Updating Password...</span>
                    </div>
                  ) : (
                    <span>Update Password</span>
                  )}
                </Button>
              </motion.div>

              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  onClick={handleBackToAuth}
                  variant="outline"
                  className="w-full border-wedding-bronze text-wedding-bronze hover:bg-wedding-bronze hover:text-white transition-colors duration-200"
                  disabled={loading}
                >
                  <ArrowLeft className="size-4 mr-2" />
                  Back to Sign In
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
