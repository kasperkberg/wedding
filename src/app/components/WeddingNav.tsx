"use client";

import { ThemeToggle } from "./ThemeToggle";

const LINKS = [
  { href: "#program", label: "Program" },
  { href: "#bryllupsdetaljer", label: "Bryllupsdetaljer" },
  { href: "#rsvp-section", label: "Tilmelding" },
] as const;

export function WeddingNav() {
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-40 border-b border-wedding-linen/80 bg-wedding-bg-page/95 backdrop-blur-sm dark:bg-wedding-bg-page/95"
      aria-label="Hovedmenu"
    >
      <div className="mx-auto flex max-w-5xl items-center px-6 py-3">
        <div className="w-10 shrink-0 hidden md:block" aria-hidden />
        <div className="flex flex-1 justify-center gap-6 md:gap-10">
          {LINKS.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="wedding-abramo text-sm text-wedding-charcoal transition hover:text-wedding-lemon md:text-base"
            >
              {label}
            </a>
          ))}
        </div>
        <ThemeToggle />
      </div>
    </nav>
  );
}
