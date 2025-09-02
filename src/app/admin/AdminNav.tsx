"use client";

import { usePathname } from "next/navigation";
import { authClient } from "../../../lib/auth-client";
import Link from "next/link";
import { BetterAuthUser } from "../../../lib/auth-types";

interface AdminNavProps {
  user: BetterAuthUser;
}

export function AdminNav({ user }: AdminNavProps) {
  const pathname = usePathname();

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
          className="wedding-button px-6 py-3 rounded-full text-lg wedding-abramo inline-block"
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
  );
}
