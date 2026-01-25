"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

const STORAGE_KEY = "wedding-theme";

export function ThemeToggle() {
  const [dark, setDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem(STORAGE_KEY) as "light" | "dark" | null;
    const isDark = stored === "dark";
    setDark(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem(STORAGE_KEY, next ? "dark" : "light");
  };

  if (!mounted) {
    return <div className="h-10 w-10 shrink-0 hidden md:block" aria-hidden />;
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? "Skift til lyst tema" : "Skift til mørkt tema"}
      className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-full border border-wedding-linen/80 bg-wedding-ivory/95 text-wedding-charcoal shadow-md transition hover:bg-wedding-linen/80 dark:border-white/10 dark:bg-wedding-bg-page dark:text-wedding-charcoal dark:hover:bg-white/10 md:flex"
    >
      {dark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </button>
  );
}
