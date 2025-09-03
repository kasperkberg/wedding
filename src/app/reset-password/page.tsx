import { ResetPasswordForm } from "@/components/auth/reset-password-form";
import { Suspense } from "react";

function ResetPasswordContent() {
  return <ResetPasswordForm />;
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPasswordContent />
    </Suspense>
  );
}

export const metadata = {
  title: "Reset Password - Wedding",
  description: "Reset your wedding account password",
  robots: {
    index: false,
    follow: false,
  },
};
