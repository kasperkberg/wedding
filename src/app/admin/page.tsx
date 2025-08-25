"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { User, UserRole } from "../../../lib/auth-types";
import { authClient } from "../../../lib/auth-client";
import { canEditEvent } from "../../../lib/role-utils";
import Link from "next/link";
import { WeddingEventEditor } from "../components/WeddingEventEditor";
import { RSVPOverview } from "../components/RSVPOverview";

export default function AdminPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data } = await authClient.getSession();
        const currentUser = data?.user as User | null;

        if (!currentUser || !canEditEvent(currentUser.role)) {
          router.push("/");
          return;
        }

        setUser(currentUser);
      } catch (error) {
        console.error("Error checking auth:", error);
        router.push("/");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  const handleSignOut = async () => {
    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            window.location.href = "/";
          },
        },
      });
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto py-8">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Bryllups Administration
              </h1>
              <p className="text-gray-600">
                Administrer bryllupsoplysninger og se RSVP'er
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="font-medium text-gray-900">{user.name}</p>
                <p className="text-sm text-gray-600">{user.email}</p>
                <span
                  className={`inline-block px-2 py-1 text-xs font-medium rounded-full mt-1 ${
                    user.role === "admin"
                      ? "bg-red-100 text-red-800"
                      : user.role === "editor"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {user.role}
                </span>
              </div>
              <button
                onClick={handleSignOut}
                className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
              >
                Log ud
              </button>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex space-x-4">
            <Link
              href="/"
              className="wedding-button px-6 py-3 rounded-full text-lg wedding-serif inline-block"
            >
              ← Tilbage til RSVP
            </Link>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          {/* Wedding Event Editor */}
          <WeddingEventEditor />

          {/* RSVP Overview */}
          <RSVPOverview />
        </div>
      </div>
    </div>
  );
}
