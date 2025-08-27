"use client";

import { useEffect, useState } from "react";
import { User } from "../../../lib/auth-types";
import { authClient } from "../../../lib/auth-client";
import { canEditEvent } from "../../../lib/role-utils";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

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

  return (
    <div className="space-y-8 mb-12">
      {/* Event Title and Date */}
      <Card>
        <CardContent className="p-8 text-center">
          <div className="text-6xl mb-6 font-bold text-wedding-bronze">
            ♣
          </div>
          <CardTitle className="text-4xl mb-6 wedding-serif">
            {event.title}
          </CardTitle>
          <div className="text-2xl text-wedding-forest mb-4 font-medium">
            {formatDate(event.date)}
            {event.time && <span className="ml-2">kl. {event.time}</span>}
          </div>
          <div className="flex items-center justify-center text-muted-foreground">
            <span className="text-xl mr-2 font-bold text-wedding-bronze">
              •
            </span>
            <span className="text-lg wedding-serif">{event.location}</span>
          </div>
        </CardContent>
      </Card>

      {/* Location Details */}
      {event.locationDetails && (
        <Card>
          <CardContent className="p-8">
            <div className="flex items-center mb-6">
              <span className="text-4xl mr-4 font-bold text-wedding-bronze">
                •
              </span>
              <CardTitle className="text-2xl wedding-serif">
                Sted og transport
              </CardTitle>
            </div>
            <div className="text-muted-foreground whitespace-pre-wrap leading-relaxed">
              {event.locationDetails}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Program */}
      {event.program && (
        <Card>
          <CardContent className="p-8">
            <div className="flex items-center mb-6">
              <span className="text-4xl mr-4 font-bold text-wedding-bronze">
                •
              </span>
              <CardTitle className="text-2xl wedding-serif">Program</CardTitle>
            </div>
            <div className="text-muted-foreground whitespace-pre-wrap leading-relaxed">
              {event.program}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Dresscode */}
      {event.dresscode && (
        <Card>
          <CardContent className="p-8">
            <div className="flex items-center mb-6">
              <span className="text-4xl mr-4 font-bold text-wedding-bronze">
                •
              </span>
              <CardTitle className="text-2xl wedding-serif">
                Dresscode
              </CardTitle>
            </div>
            <div className="text-muted-foreground whitespace-pre-wrap leading-relaxed">
              {event.dresscode}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Additional Information */}
      {event.additionalInfo && (
        <Card>
          <CardContent className="p-8">
            <div className="flex items-center mb-6">
              <span className="text-4xl mr-4 font-bold text-wedding-bronze">
                •
              </span>
              <CardTitle className="text-2xl wedding-serif">
                Yderligere information
              </CardTitle>
            </div>
            <div className="text-muted-foreground whitespace-pre-wrap leading-relaxed">
              {event.additionalInfo}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Admin Link */}
      {user && canEditEvent(user.role) && (
        <div className="text-center">
          <Button asChild size="lg">
            <Link href="/admin">✏️ Rediger bryllupsoplysninger</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
