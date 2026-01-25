"use client";

import { WeddingEventDisplay } from "./WeddingEventDisplay";
import { RSVPSection } from "./RSVPSection";
import { WeddingNav } from "./WeddingNav";
import { motion } from "framer-motion";
import { BetterAuthUser } from "../../../lib/auth-types";
import { useState, useEffect } from "react";

type Timeline = {
  days: {
    dayLabel: string;
    items: { timeFrom: string; timeTo: string; label: string }[];
  }[];
};

interface WeddingEvent {
  id: number;
  title: string;
  date: string;
  time?: string;
  location: string;
  locationDetails?: string;
  program?: string;
  wishes?: string;
  additionalInfo?: string;
  dresscode?: string;
  toastmaster?: string;
  timeline?: Timeline | null;
  createdAt: string;
  updatedAt: string;
}

interface WeddingDashboardProps {
  user: BetterAuthUser;
  event: WeddingEvent | null;
}

function useCountdown(targetDate: string | null) {
  const [left, setLeft] = useState({ d: 0, h: 0, m: 0, s: 0 });

  useEffect(() => {
    if (!targetDate) return;
    const target = new Date(targetDate);
    const tick = () => {
      const now = new Date();
      const diff = target.getTime() - now.getTime();
      if (diff <= 0) {
        setLeft({ d: 0, h: 0, m: 0, s: 0 });
        return;
      }
      setLeft({
        d: Math.floor(diff / 864e5),
        h: Math.floor((diff % 864e5) / 36e5),
        m: Math.floor((diff % 36e5) / 6e4),
        s: Math.floor((diff % 6e4) / 1e3),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  return left;
}

function formatLocationDate(event: WeddingEvent | null): string {
  if (!event) return "—";
  const d = new Date(event.date);
  const dateStr = d.toLocaleDateString("da-DK", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Europe/Copenhagen",
  });
  return `${dateStr}\n${event.location}`;
}

export function WeddingDashboard({ user, event }: WeddingDashboardProps) {
  const [rsvpSubmitted, setRsvpSubmitted] = useState(false);
  const countdown = useCountdown(event?.date ?? null);

  useEffect(() => {
    const checkExistingRSVP = async () => {
      try {
        const res = await fetch(`/api/rsvp?userId=${user.id}`);
        const result = await res.json();
        if (result.success && result.data) setRsvpSubmitted(true);
      } catch (e) {
        console.error("Error checking RSVP:", e);
      }
    };
    checkExistingRSVP();
  }, [user.id]);

  return (
    <div className="min-h-screen bg-wedding-bg-page pt-14">
      <WeddingNav />
      {/* Hero — mariusogbea.no: stacked names, location | date */}
      <section className="relative pt-20 pb-16 md:pt-28 md:pb-24 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            className="space-y-1 md:space-y-2"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h1 className="wedding-abramo text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-[0.02em] text-wedding-charcoal">
              TIRILL
            </h1>
            <p className="wedding-abramo text-xl md:text-2xl font-light text-wedding-stone tracking-widest">
              OG
            </p>
            <h1 className="wedding-abramo text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-[0.02em] text-wedding-charcoal">
              CHRISTIAN
            </h1>
          </motion.div>
          <motion.p
            className="mt-6 md:mt-8 wedding-abramo text-base md:text-lg text-wedding-stone font-light whitespace-pre-line"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            {formatLocationDate(event)}
          </motion.p>
        </div>
      </section>

      {/* Countdown — "Nedtællingen er i gang" */}
      {event?.date && (
        <motion.section
          className="py-8 md:py-12"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <div className="max-w-3xl mx-auto px-6">
            <p className="text-center text-sm uppercase tracking-[0.2em] text-wedding-stone mb-6 wedding-abramo">
              Nedtællingen er i gang, og vi glæder os til at fejre med jer om:
            </p>
            <div className="grid grid-cols-4 gap-3 md:gap-4">
              {[
                { v: countdown.d, l: "Dage" },
                { v: countdown.h, l: "Timer" },
                { v: countdown.m, l: "Minutter" },
                { v: countdown.s, l: "Sekunder" },
              ].map(({ v, l }) => (
                <div
                  key={l}
                  className="wedding-card-enhanced py-5 md:py-6 text-center"
                >
                  <span className="wedding-abramo block text-2xl md:text-3xl lg:text-4xl font-semibold text-wedding-lemon tabular-nums">
                    {v}
                  </span>
                  <span className="text-xs md:text-sm uppercase tracking-wider text-wedding-stone mt-1">
                    {l}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.section>
      )}

      {/* Vi glæder os til at se jer */}
      <section className="py-12 md:py-16">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <motion.h2
            className="wedding-abramo text-2xl md:text-3xl font-semibold text-wedding-charcoal mb-6"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-50px" }}
          >
            Vi glæder os til at se jer
          </motion.h2>
          <motion.p
            className="wedding-abramo text-wedding-stone font-light leading-relaxed text-base md:text-lg"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true, margin: "-50px" }}
          >
            Kære familie og venner — Vi gifter os og byder jer velkommen. Vi
            sætter stor pris på, at I vil være med til at gøre vores dag
            speciel.
          </motion.p>
          <motion.div
            className="wedding-divider mt-8"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          />
        </div>
      </section>

      {/* Program på bryllupsdagen — tidslinje fra database */}
      {(() => {
        const days = event?.timeline?.days;
        if (!days?.length) return null;
        return (
          <section id="program" className="scroll-mt-14 py-12 md:py-16">
            <div className="max-w-3xl mx-auto px-6 space-y-16">
              {days.map((day, dayIdx) => (
                <div key={dayIdx}>
                  <motion.div
                    className="text-center mb-10"
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true, margin: "-50px" }}
                  >
                    <h2 className="wedding-abramo text-2xl md:text-3xl font-semibold text-wedding-charcoal mb-2">
                      {day.dayLabel || "Program"}
                    </h2>
                    <div className="wedding-divider mt-6" />
                  </motion.div>

                  <motion.ol
                    className="relative"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div
                      className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-wedding-lemon/40"
                      aria-hidden
                    />
                    {day.items.map((item, i) => {
                      const time =
                        [item.timeFrom, item.timeTo]
                          .filter(Boolean)
                          .join(" – ") || "—";
                      return (
                        <li key={i} className="relative flex pb-8 last:pb-0">
                          <div
                            className="absolute left-1/2 top-0 -translate-x-1/2 z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-wedding-lemon/25 ring-4 ring-wedding-bg-page"
                            aria-hidden
                          >
                            <div className="h-2 w-2 rounded-full bg-wedding-lemon" />
                          </div>
                          <div
                            className={`w-1/2 flex flex-col justify-center pt-0.5 ${i % 2 === 0 ? "pr-6 text-right" : ""}`}
                          >
                            {i % 2 === 0 && (
                              <>
                                <p className="wedding-abramo text-sm text-wedding-stone font-medium tabular-nums">
                                  {time}
                                </p>
                                <p className="wedding-abramo text-wedding-charcoal font-medium mt-0.5">
                                  {item.label}
                                </p>
                              </>
                            )}
                          </div>
                          <div
                            className={`w-1/2 flex flex-col justify-center pt-0.5 ${i % 2 === 1 ? "pl-6 text-left" : ""}`}
                          >
                            {i % 2 === 1 && (
                              <>
                                <p className="wedding-abramo text-sm text-wedding-stone font-medium tabular-nums">
                                  {time}
                                </p>
                                <p className="wedding-abramo text-wedding-charcoal font-medium mt-0.5">
                                  {item.label}
                                </p>
                              </>
                            )}
                          </div>
                        </li>
                      );
                    })}
                  </motion.ol>
                </div>
              ))}
            </div>
          </section>
        );
      })()}

      {/* Bryllupsdetaljer — above RSVP, shown after RSVP submission */}
      {rsvpSubmitted && (
        <motion.section
          id="bryllupsdetaljer"
          className="scroll-mt-14 py-12 md:py-20 border-t border-wedding-linen/80"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true, margin: "-80px" }}
        >
          <div className="max-w-5xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="wedding-abramo text-2xl md:text-3xl lg:text-4xl font-semibold text-wedding-charcoal mb-4">
                Bryllupsdetaljer
              </h2>
              <div className="wedding-divider" />
            </div>
            <WeddingEventDisplay user={user} event={event} />
          </div>
        </motion.section>
      )}

      {/* RSVP */}
      <section id="rsvp-section" className="scroll-mt-14 py-12 md:py-20">
        <div className="max-w-2xl mx-auto px-6">
          <RSVPSection
            user={user}
            onRSVPSubmitted={() => setRsvpSubmitted(true)}
          />
        </div>
      </section>
    </div>
  );
}
