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
      <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Bryllupsoplysninger
          </h2>
          <p className="text-gray-600 mb-4">
            Bryllupsoplysningerne er endnu ikke oprettet.
          </p>
          {user && canEditEvent(user.role) && (
            <Link
              href="/admin"
              className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Opret bryllupsoplysninger
            </Link>
          )}
        </div>
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
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {event.title}
          </h2>
          <div className="text-xl text-gray-700 mb-2">
            {formatDate(event.date)}
            {event.time && (
              <span className="ml-2">kl. {event.time}</span>
            )}
          </div>
          <p className="text-lg text-gray-600">
            {event.location}
          </p>
        </div>
      </div>

      {/* Location Details */}
      {event.locationDetails && (
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            📍 Sted og transport
          </h3>
          <div className="prose prose-gray max-w-none">
            <p className="text-gray-700 whitespace-pre-wrap">
              {event.locationDetails}
            </p>
          </div>
        </div>
      )}

      {/* Program */}
      {event.program && (
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            📅 Program
          </h3>
          <div className="prose prose-gray max-w-none">
            <div className="text-gray-700 whitespace-pre-wrap">
              {event.program}
            </div>
          </div>
        </div>
      )}

      {/* Dresscode */}
      {event.dresscode && (
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            👗 Dresscode
          </h3>
          <div className="prose prose-gray max-w-none">
            <p className="text-gray-700 whitespace-pre-wrap">
              {event.dresscode}
            </p>
          </div>
        </div>
      )}

      {/* Additional Information */}
      {event.additionalInfo && (
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            ℹ️ Yderligere information
          </h3>
          <div className="prose prose-gray max-w-none">
            <div className="text-gray-700 whitespace-pre-wrap">
              {event.additionalInfo}
            </div>
          </div>
        </div>
      )}

      {/* Admin Link */}
      {user && canEditEvent(user.role) && (
        <div className="text-center">
          <Link
            href="/admin"
            className="inline-block px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            ✏️ Rediger bryllupsoplysninger
          </Link>
        </div>
      )}
    </div>
  );
}
