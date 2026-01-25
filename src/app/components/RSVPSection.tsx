"use client";

import { BetterAuthUser } from "../../../lib/auth-types";
import { RSVPForm } from "./RSVPForm";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface RSVPSectionProps {
  user: BetterAuthUser | null;
  onRSVPSubmitted?: () => void;
}

export function RSVPSection({ user, onRSVPSubmitted }: RSVPSectionProps) {
  const [expanded, setExpanded] = useState(false);
  const [summaryAttending, setSummaryAttending] = useState<boolean | null>(null);
  const [summaryLoading, setSummaryLoading] = useState(true);

  useEffect(() => {
    if (!user?.id) return;
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(`/api/rsvp?userId=${user.id}`);
        const json = await res.json();
        if (!cancelled && json.success && json.data)
          setSummaryAttending(json.data.attending);
      } catch {
        if (!cancelled) setSummaryAttending(null);
      } finally {
        if (!cancelled) setSummaryLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [user?.id]);

  const handleRSVPLoaded = (rsvp: { attending: boolean } | null) => {
    setSummaryAttending(rsvp?.attending ?? null);
  };

  if (!user) return null;

  const statusText = summaryLoading
    ? "Indlæser..."
    : summaryAttending === null
      ? "Klik for at tilmelde dig"
      : summaryAttending
        ? "Du deltager"
        : "Du kan desværre ikke deltage";

  const title = summaryAttending !== null ? "Din tilmelding" : "Svar venligst";

  return (
    <motion.div
      id="rsvp-section"
      className="space-y-6"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      {/* Collapsed bar — default view, hidden when expanded */}
      {!expanded && (
        <motion.button
          type="button"
          onClick={() => setExpanded(true)}
          className="w-full wedding-card-enhanced p-4 md:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-left transition hover:border-wedding-lemon/40"
          aria-expanded={false}
          aria-label={`${title}. ${statusText}. Klik for at ${summaryAttending !== null ? "redigere" : "tilmelde"}.`}
        >
          <div>
            <h2 className="wedding-abramo text-lg md:text-xl font-semibold text-wedding-charcoal">
              {title}
            </h2>
            <p className="wedding-abramo text-sm text-wedding-stone mt-0.5">
              {statusText}
            </p>
          </div>
          <div className="flex items-center gap-1.5 text-wedding-lemon shrink-0 sm:pl-4">
            <span className="wedding-abramo text-sm font-medium">
              {summaryAttending !== null ? "Rediger" : "Tilmeld"}
            </span>
            <ChevronDown className="w-5 h-5" />
          </div>
        </motion.button>
      )}

      {/* Expanded: minimize link + header + form */}
      {expanded && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.25 }}
        >
            <div className="flex justify-end mb-2">
              <button
                type="button"
                onClick={() => setExpanded(false)}
                className="wedding-abramo text-sm text-wedding-stone hover:text-wedding-charcoal flex items-center gap-1 transition"
              >
                <ChevronUp className="w-4 h-4" />
                Minimér
              </button>
            </div>

            <div className="text-center mb-8">
              <h2 className="wedding-abramo text-2xl md:text-3xl font-semibold text-wedding-charcoal mb-2">
                {summaryAttending !== null ? "Opdater tilmelding" : "Svar venligst"}
              </h2>
              <p className="wedding-abramo text-wedding-stone font-light">
                {summaryAttending !== null
                  ? `Hej ${user.name}! Hvis du har noget at ændre, kan du gøre det her`
                  : `Hej ${user.name}! Vi glæder os til at fejre dagen med dig.`}
              </p>
              <div className="wedding-divider mt-6" />
            </div>

            <RSVPForm
              user={user}
              onRSVPSubmitted={onRSVPSubmitted}
              onRSVPLoaded={handleRSVPLoaded}
            />
        </motion.div>
      )}
    </motion.div>
  );
}
