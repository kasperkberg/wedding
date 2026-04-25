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
    { id: "emails", label: "Emails", href: "/admin/emails" },
  ];

  const getCurrentTab = () => {
    if (pathname === "/admin") return "event-info";
    if (pathname === "/admin/participants") return "participants";
    if (pathname === "/admin/numbers") return "numbers";
    if (pathname === "/admin/dietary") return "dietary";
    if (pathname === "/admin/emails") return "emails";
    return "event-info";
  };

  const currentTab = getCurrentTab();

  return (
    <div className="wedding-card-enhanced rounded-2xl p-6 sm:p-8 mb-8">
      {/* Top row: title + user */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <p className="wedding-script text-wedding-bronze text-sm tracking-wide mb-1">
            Administration
          </p>
          <h1 className="wedding-abramo text-2xl sm:text-3xl text-wedding-charcoal">
            Bryllups&shy;administration
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
            <p className="wedding-abramo text-wedding-charcoal text-sm">
              {user.name}
            </p>
            <span className="admin-badge admin-badge-admin mt-0.5 inline-block">
              {user.role}
            </span>
          </div>
          <button
            onClick={handleSignOut}
            className="wedding-button px-4 py-2 rounded-full wedding-abramo text-sm"
          >
            Log ud
          </button>
        </div>
      </div>

      {/* Divider */}
      <div className="wedding-divider !my-4" />

      {/* Navigation row */}
      <div className="flex items-center justify-between gap-4">
        <nav
          className="flex gap-6 sm:gap-8 overflow-x-auto pb-1 -mb-1 border-b border-wedding-linen flex-1"
          aria-label="Admin navigation"
        >
          {tabs.map((tab) => (
            <Link
              key={tab.id}
              href={tab.href}
              className={`admin-tab ${currentTab === tab.id ? "admin-tab-active" : ""}`}
            >
              {tab.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/"
          className="wedding-abramo text-sm text-wedding-stone hover:text-wedding-charcoal transition-colors whitespace-nowrap shrink-0"
        >
          &larr; RSVP
        </Link>
      </div>
    </div>
  );
}
