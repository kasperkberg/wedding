"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { User } from "../../../lib/auth-types";
import { authClient } from "../../../lib/auth-client";
import { canEditEvent } from "../../../lib/role-utils";
import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data } = await authClient.getSession();
        const currentUser = data?.user as User | null;

        if (!currentUser || !canEditEvent(currentUser.role)) {
          router.push("/login");
          return;
        }

        setUser(currentUser);
      } catch (error) {
        console.error("Error checking auth:", error);
        router.push("/login");
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

  const tabs = [
    { id: "event-info", label: "Begivenhedsinformation", href: "/admin" },
    { id: "participants", label: "Deltagere", href: "/admin/participants" },
    { id: "numbers", label: "Deltagerantal", href: "/admin/numbers" },
    { id: "dietary", label: "Allergier & Madpræferencer", href: "/admin/dietary" },
  ];

  const getCurrentTab = () => {
    if (pathname === "/admin") return "event-info";
    if (pathname === "/admin/participants") return "participants";
    if (pathname === "/admin/numbers") return "numbers";
    if (pathname === "/admin/dietary") return "dietary";
    return "event-info";
  };

  const currentTab = getCurrentTab();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-6xl mx-auto py-8">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Bryllups Administration
              </h1>
              <p className="text-gray-600">
                Administrer bryllupsoplysninger og se RSVP&apos;er
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
          <div className="flex space-x-4 mb-4">
            <Link
              href="/"
              className="wedding-button px-6 py-3 rounded-full text-lg wedding-serif inline-block"
            >
              ← Tilbage til RSVP
            </Link>
          </div>

          {/* Tab Navigation */}
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8" aria-label="Tabs">
              {tabs.map((tab) => (
                <Link
                  key={tab.id}
                  href={tab.href}
                  className={`whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm ${
                    currentTab === tab.id
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  {tab.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        {/* Page Content */}
        <div className="space-y-8">
          {children}
        </div>
      </div>
    </div>
  );
}
