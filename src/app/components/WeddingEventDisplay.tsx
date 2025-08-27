"use client";

import { useEffect, useState } from "react";
import { User } from "../../../lib/auth-types";
import { authClient } from "../../../lib/auth-client";
import { canEditEvent } from "../../../lib/role-utils";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface WeddingEvent {
  id: number;
  title: string;
  date: string;
  time?: string;
  location: string;
  locationDetails?: string;
  program?: string;
  dresscode?: string;
  additionalInfo?: string;
  createdAt: string;
  updatedAt: string;
}

export function WeddingEventDisplay() {
  const [event, setEvent] = useState<WeddingEvent | null>(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    fetchEvent();
    fetchUser();
  }, []);

  const fetchEvent = async () => {
    try {
      const response = await fetch("/api/wedding");
      const result = await response.json();

      if (result.success) {
        setEvent(result.data);
      }
    } catch (error) {
      console.error("Error fetching event:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUser = async () => {
    try {
      const { data } = await authClient.getSession();
      setUser(data?.user as User | null);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  if (loading) {
    return (
      <Card className="mb-8">
        <CardContent className="p-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto mb-6"></div>
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 rounded w-2/3 mx-auto"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!event) {
    return (
      <Card className="mb-8">
        <CardContent className="p-8 text-center">
          <div className="text-6xl mb-6">📝</div>
          <CardTitle className="text-3xl mb-4">Bryllupsoplysninger</CardTitle>
          <p className="text-muted-foreground mb-6 text-lg">
            Bryllupsoplysningerne er endnu ikke oprettet.
          </p>
          {user && canEditEvent(user.role) && (
            <Button asChild size="lg">
              <Link href="/admin">Opret bryllupsoplysninger</Link>
            </Button>
          )}
        </CardContent>
      </Card>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("da-DK", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8 mb-12"
    >
      {/* Event Title and Date */}
      <motion.div variants={itemVariants}>
        <Card>
          <CardContent className="p-8 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              className="text-6xl mb-6 font-bold text-wedding-bronze"
            >
              ♣
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <CardTitle className="text-4xl mb-6 wedding-serif">
                {event.title}
              </CardTitle>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="text-2xl text-wedding-forest mb-4 font-medium"
            >
              {formatDate(event.date)}
              {event.time && <span className="ml-2">kl. {event.time}</span>}
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.4 }}
              className="flex items-center justify-center text-muted-foreground"
            >
              <span className="text-xl mr-2 font-bold text-wedding-bronze">
                •
              </span>
              <span className="text-lg wedding-serif">{event.location}</span>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Location Details */}
      {event.locationDetails && (
        <motion.div variants={itemVariants}>
          <Card>
            <CardContent className="p-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.4 }}
                className="flex items-center mb-6"
              >
                <span className="text-4xl mr-4 font-bold text-wedding-bronze">
                  •
                </span>
                <CardTitle className="text-2xl wedding-serif">
                  Sted og transport
                </CardTitle>
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.4 }}
                className="text-muted-foreground whitespace-pre-wrap leading-relaxed"
              >
                {event.locationDetails}
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Program */}
      {event.program && (
        <motion.div variants={itemVariants}>
          <Card>
            <CardContent className="p-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.4 }}
                className="flex items-center mb-6"
              >
                <span className="text-4xl mr-4 font-bold text-wedding-bronze">
                  •
                </span>
                <CardTitle className="text-2xl wedding-serif">Program</CardTitle>
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.4 }}
                className="text-muted-foreground whitespace-pre-wrap leading-relaxed"
              >
                {event.program}
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Dresscode */}
      {event.dresscode && (
        <motion.div variants={itemVariants}>
          <Card>
            <CardContent className="p-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.4 }}
                className="flex items-center mb-6"
              >
                <span className="text-4xl mr-4 font-bold text-wedding-bronze">
                  •
                </span>
                <CardTitle className="text-2xl wedding-serif">
                  Dresscode
                </CardTitle>
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.4 }}
                className="text-muted-foreground whitespace-pre-wrap leading-relaxed"
              >
                {event.dresscode}
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Additional Information */}
      {event.additionalInfo && (
        <motion.div variants={itemVariants}>
          <Card>
            <CardContent className="p-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.4 }}
                className="flex items-center mb-6"
              >
                <span className="text-4xl mr-4 font-bold text-wedding-bronze">
                  •
                </span>
                <CardTitle className="text-2xl wedding-serif">
                  Yderligere information
                </CardTitle>
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.4 }}
                className="text-muted-foreground whitespace-pre-wrap leading-relaxed"
              >
                {event.additionalInfo}
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Admin Link */}
      {user && canEditEvent(user.role) && (
        <motion.div
          variants={itemVariants}
          className="text-center"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Button asChild size="lg">
              <Link href="/admin">✏️ Rediger bryllupsoplysninger</Link>
            </Button>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
}
