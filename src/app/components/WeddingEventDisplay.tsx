"use client";

import { useEffect, useState } from "react";
import { User } from "../../../lib/auth-types";
import { authClient } from "../../../lib/auth-client";
import { canEditEvent } from "../../../lib/role-utils";
import Link from "next/link";

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
      <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto mb-6"></div>
          <div className="space-y-4">
            <div className="h-4 bg-gray-200 rounded w-2/3 mx-auto"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="wedding-card rounded-2xl p-8 mb-8 text-center">
        <div className="text-6xl mb-6">📝</div>
        <h2 className="text-3xl font-bold text-wedding-charcoal mb-4">
          Bryllupsoplysninger
        </h2>
        <p className="text-wedding-stone mb-6 text-lg">
          Bryllupsoplysningerne er endnu ikke oprettet.
        </p>
        {user && canEditEvent(user.role) && (
          <Link
            href="/admin"
            className="wedding-button px-8 py-4 rounded-full text-lg font-medium inline-block"
          >
            Opret bryllupsoplysninger
          </Link>
        )}
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('da-DK', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="space-y-8 mb-12">
      {/* Event Title and Date */}
      <div className="wedding-card rounded-2xl p-8 text-center">
        <div className="text-6xl mb-6">💒</div>
        <h2 className="text-4xl font-bold text-wedding-charcoal mb-6">
          {event.title}
        </h2>
        <div className="text-2xl text-wedding-forest mb-4 font-medium">
          {formatDate(event.date)}
          {event.time && (
            <span className="ml-2">kl. {event.time}</span>
          )}
        </div>
        <div className="flex items-center justify-center text-wedding-stone">
          <span className="text-xl mr-2">📍</span>
          <span className="text-lg">{event.location}</span>
        </div>
      </div>

      {/* Location Details */}
      {event.locationDetails && (
        <div className="wedding-card rounded-2xl p-8">
          <div className="flex items-center mb-6">
            <span className="text-4xl mr-4">📍</span>
            <h3 className="text-2xl font-bold text-wedding-charcoal">
              Sted og transport
            </h3>
          </div>
          <div className="text-wedding-stone whitespace-pre-wrap leading-relaxed">
            {event.locationDetails}
          </div>
        </div>
      )}

      {/* Program */}
      {event.program && (
        <div className="wedding-card rounded-2xl p-8">
          <div className="flex items-center mb-6">
            <span className="text-4xl mr-4">📅</span>
            <h3 className="text-2xl font-bold text-wedding-charcoal">
              Program
            </h3>
          </div>
          <div className="text-wedding-stone whitespace-pre-wrap leading-relaxed">
            {event.program}
          </div>
        </div>
      )}

      {/* Dresscode */}
      {event.dresscode && (
        <div className="wedding-card rounded-2xl p-8">
          <div className="flex items-center mb-6">
            <span className="text-4xl mr-4">👗</span>
            <h3 className="text-2xl font-bold text-wedding-charcoal">
              Dresscode
            </h3>
          </div>
          <div className="text-wedding-stone whitespace-pre-wrap leading-relaxed">
            {event.dresscode}
          </div>
        </div>
      )}

      {/* Additional Information */}
      {event.additionalInfo && (
        <div className="wedding-card rounded-2xl p-8">
          <div className="flex items-center mb-6">
            <span className="text-4xl mr-4">ℹ️</span>
            <h3 className="text-2xl font-bold text-wedding-charcoal">
              Yderligere information
            </h3>
          </div>
          <div className="text-wedding-stone whitespace-pre-wrap leading-relaxed">
            {event.additionalInfo}
          </div>
        </div>
      )}

      {/* Admin Link */}
      {user && canEditEvent(user.role) && (
        <div className="text-center">
          <Link
            href="/admin"
            className="wedding-button px-8 py-4 rounded-full text-lg font-medium inline-block"
          >
            ✏️ Rediger bryllupsoplysninger
          </Link>
        </div>
      )}
    </div>
  );
}
