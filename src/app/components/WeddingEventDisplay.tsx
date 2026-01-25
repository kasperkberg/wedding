"use client";

import { BetterAuthUser } from "../../../lib/auth-types";
import { isAdmin } from "../../../lib/role-utils";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Calendar, Gift, Shirt, Mic2 } from "lucide-react";

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
  createdAt: string;
  updatedAt: string;
}

interface WeddingEventDisplayProps {
  user: BetterAuthUser | null;
  event: WeddingEvent | null;
}

export function WeddingEventDisplay({ user, event }: WeddingEventDisplayProps) {
  if (!event) {
    return (
      <motion.div
        className="text-center py-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <motion.div
          className="text-6xl mb-8 text-wedding-lemon flex justify-center"
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Calendar className="w-12 h-12" />
        </motion.div>
        <motion.h3
          className="text-3xl mb-6 wedding-abramo text-wedding-charcoal"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
        >
          Bryllupsoplysninger
        </motion.h3>
        <motion.p
          className="text-lg text-wedding-stone mb-8 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          viewport={{ once: true }}
        >
          Bryllupsoplysningerne er endnu ikke oprettet.
        </motion.p>
        {user && isAdmin(user.role) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            viewport={{ once: true }}
          >
            <Button asChild size="lg" className="wedding-button">
              <Link href="/admin">Opret bryllupsoplysninger</Link>
            </Button>
          </motion.div>
        )}
      </motion.div>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const osloDateString = date.toLocaleString("da-DK", {
      timeZone: "Europe/Oslo",
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    return osloDateString;
  };

  const linkifyBareUrls = (s: string, keyPrefix: string): React.ReactNode[] => {
    const out: React.ReactNode[] = [];
    const re = /https?:\/\/[^\s\]\)]+/g;
    let last = 0;
    let mm;
    while ((mm = re.exec(s)) !== null) {
      if (mm.index > last) out.push(s.slice(last, mm.index));
      out.push(
        <a
          key={`${keyPrefix}-${mm.index}`}
          href={mm[0]}
          className="text-wedding-lemon underline hover:no-underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          {mm[0]}
        </a>
      );
      last = re.lastIndex;
    }
    if (last < s.length) out.push(s.slice(last));
    return out;
  };

  const formatDresscode = (str: string): React.ReactNode[] => {
    const out: React.ReactNode[] = [];
    const re = /\(([^)]+)\)\[([^\]]+)\]/g;
    let last = 0;
    let m;
    while ((m = re.exec(str)) !== null) {
      const before = str.slice(last, m.index).trimEnd();
      if (before) out.push(...linkifyBareUrls(before, `pre-${m.index}`));
      out.push(<br key={`br-${m.index}`} />);
      out.push(
        <a
          key={`a-${m.index}`}
          href={m[2]}
          className="text-wedding-lemon underline hover:no-underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          {m[1]}
        </a>
      );
      last = re.lastIndex;
    }
    const after = str.slice(last);
    if (after) out.push(...linkifyBareUrls(after, `post-${last}`));
    return out;
  };

  const linkify = (str: string): React.ReactNode[] => {
    const re = /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})|(\+?[\d][\d\s\-\.()]{6,})/g;
    const out: React.ReactNode[] = [];
    let last = 0;
    let m;
    while ((m = re.exec(str)) !== null) {
      if (m.index > last) out.push(str.slice(last, m.index));
      if (m[1]) {
        out.push(
          <a key={`e-${m.index}`} href={`mailto:${m[1]}`} className="text-wedding-lemon underline hover:no-underline">
            {m[1]}
          </a>
        );
      } else if (m[2]) {
        out.push(
          <a key={`p-${m.index}`} href={`tel:${m[2].replace(/[^\d+]/g, "")}`} className="text-wedding-lemon underline hover:no-underline">
            {m[2]}
          </a>
        );
      }
      last = re.lastIndex;
    }
    if (last < str.length) out.push(str.slice(last));
    return out;
  };

  return (
    <motion.div
      className="space-y-8"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 max-w-7xl mx-auto px-4 md:px-0">
        {/* Tid og sted Card */}
        <motion.div
          className="wedding-card-enhanced p-6 md:p-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          viewport={{ once: true }}
        >
          <div className="text-center">
            <div className="text-5xl mb-2 text-wedding-lemon flex justify-center">
              <div className="w-8 h-8 md:w-16 md:h-16 bg-wedding-lemon/15 rounded-full flex items-center justify-center">
                <Calendar className="w-4 h-4 md:w-8 md:h-8" />
              </div>
            </div>
            <h4 className="text-xl md:text-xl lg:text-2xl font-bold text-wedding-stone mb-3 wedding-abramo">
              Tid og sted
            </h4>
            <div className="text-wedding-charcoal text-base md:text-base">
              <div className="font-medium mb-1">{formatDate(event.date)}</div>
              {event.time && (
                <div className="text-wedding-charcoal text-base">kl. {event.time}</div>
              )}
              <div className="font-medium mt-2">{event.location}</div>
              {event.locationDetails && (
                <div className="text-sm text-wedding-charcoal/90 mt-1">
                  {event.locationDetails.split("\n")[0]}
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Toastmaster Card */}
        {event.toastmaster?.trim() && (
          <motion.div
            className="wedding-card-enhanced p-6 md:p-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            viewport={{ once: true }}
          >
            <div className="text-center">
              <div className="text-5xl mb-2 text-wedding-lemon flex justify-center">
                <div className="w-8 h-8 md:w-16 md:h-16 bg-wedding-lemon/15 rounded-full flex items-center justify-center">
                  <Mic2 className="w-4 h-4 md:w-8 md:h-8" />
                </div>
              </div>
              <h4 className="text-xl md:text-xl lg:text-2xl font-bold text-wedding-stone mb-3 wedding-abramo">
                Toastmaster
              </h4>
              <p className="text-wedding-charcoal text-base md:text-base text-center whitespace-pre-wrap">
                {linkify(event.toastmaster.trim())}
              </p>
            </div>
          </motion.div>
        )}

        {/* Dresscode Card */}
        {event.dresscode?.trim() && (
          <motion.div
            className="wedding-card-enhanced p-6 md:p-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="text-center">
              <div className="text-5xl mb-2 text-wedding-lemon flex justify-center">
                <div className="w-8 h-8 md:w-16 md:h-16 bg-wedding-lemon/15 rounded-full flex items-center justify-center">
                  <Shirt className="w-4 h-4 md:w-8 md:h-8" />
                </div>
              </div>
              <h4 className="text-xl md:text-xl lg:text-2xl font-bold text-wedding-stone mb-3 wedding-abramo">
                Dresscode
              </h4>
              <p className="text-wedding-charcoal text-base md:text-base text-center whitespace-pre-wrap">
                {formatDresscode(event.dresscode.trim())}
              </p>
            </div>
          </motion.div>
        )}

        {/* Ønsker Card */}
        {event.wishes && (
          <motion.div
            className="wedding-card-enhanced p-6 md:p-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.25 }}
            viewport={{ once: true }}
          >
            <div className="text-center">
              <div className="text-5xl mb-2 text-wedding-lemon flex justify-center">
                <div className="w-8 h-8 md:w-16 md:h-16 bg-wedding-lemon/15 rounded-full flex items-center justify-center">
                  <Gift className="w-4 h-4 md:w-8 md:h-8" />
                </div>
              </div>
              <h4 className="text-xl md:text-xl lg:text-2xl font-bold text-wedding-stone mb-3 wedding-abramo">
                Ønsker
              </h4>
              <p className="text-wedding-charcoal text-base md:text-base text-center whitespace-pre-wrap">
                {formatDresscode(event.wishes)}
              </p>
            </div>
          </motion.div>
        )}
      </div>

      {/* Additional Information - Show as expanded card if needed */}
      {event.additionalInfo && (
        <motion.div
          className="mt-12 max-w-7xl mx-auto px-4 md:px-0"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="wedding-card-enhanced p-6 md:p-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <motion.h4
              className="text-2xl md:text-3xl wedding-abramo text-wedding-charcoal mb-6 font-light text-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.7 }}
              viewport={{ once: true }}
            >
              Yderligere information
            </motion.h4>
            <div className="text-lg md:text-xl text-wedding-stone leading-relaxed wedding-abramo font-light text-center space-y-4">
              {event.additionalInfo.split("\n").map((line, index) => (
                <div key={index} className="mb-1">
                  {line}
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
}
