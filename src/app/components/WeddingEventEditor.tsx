"use client";

import { useEffect, useState } from "react";

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

export function WeddingEventEditor() {
  const [event, setEvent] = useState<WeddingEvent | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    time: "",
    location: "",
    locationDetails: "",
    program: "",
    dresscode: "",
    additionalInfo: "",
  });

  useEffect(() => {
    fetchEvent();
  }, []);

  const fetchEvent = async () => {
    try {
      const response = await fetch("/api/wedding");
      const result = await response.json();

      if (result.success && result.data) {
        setEvent(result.data);
        setFormData({
          title: result.data.title || "",
          date: result.data.date ? new Date(result.data.date).toISOString().split('T')[0] : "",
          time: result.data.time || "",
          location: result.data.location || "",
          locationDetails: result.data.locationDetails || "",
          program: result.data.program || "",
          dresscode: result.data.dresscode || "",
          additionalInfo: result.data.additionalInfo || "",
        });
      }
    } catch (error) {
      console.error("Error fetching event:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const response = await fetch("/api/wedding", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        alert("Bryllupsoplysninger er opdateret!");
        fetchEvent(); // Refresh the data
      } else {
        alert(`Fejl: ${result.error}`);
      }
    } catch (error) {
      console.error("Error saving event:", error);
      alert("Der skete en fejl ved opdatering");
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="wedding-card rounded-2xl p-8">
      <h2 className="text-3xl font-bold text-wedding-charcoal mb-8 wedding-serif text-center">
        {event ? "Rediger bryllupsoplysninger" : "Opret bryllupsoplysninger"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-wedding-charcoal mb-2 wedding-serif">
              Titel *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleChange("title", e.target.value)}
              className="w-full px-4 py-3 border border-wedding-sage-dark rounded-lg focus:outline-none focus:ring-2 focus:ring-wedding-bronze bg-wedding-ivory wedding-serif"
              placeholder="f.eks. Tirill og Christians bryllup"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Dato *
            </label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => handleChange("date", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tidspunkt
            </label>
            <input
              type="time"
              value={formData.time}
              onChange={(e) => handleChange("time", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sted *
            </label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => handleChange("location", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="f.eks. Rådhuset, København"
              required
            />
          </div>
        </div>

        {/* Location Details */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Detaljer om stedet
          </label>
          <textarea
            value={formData.locationDetails}
            onChange={(e) => handleChange("locationDetails", e.target.value)}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Adresse, hvordan man kommer derhen, parkeringsmuligheder, etc."
          />
        </div>

        {/* Program */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Program/Tidsplan
          </label>
          <textarea
            value={formData.program}
            onChange={(e) => handleChange("program", e.target.value)}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Skriv programmet/tidsplanen her..."
          />
        </div>

        {/* Dresscode */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Dresscode
          </label>
          <textarea
            value={formData.dresscode}
            onChange={(e) => handleChange("dresscode", e.target.value)}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Beskriv dresscoden (f.eks. festligt, mørkt tøj, etc.)"
          />
        </div>

        {/* Additional Information */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Yderligere information
          </label>
          <textarea
            value={formData.additionalInfo}
            onChange={(e) => handleChange("additionalInfo", e.target.value)}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Eventuelle særlige oplysninger, gaveønsker, transport, etc."
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {saving
              ? "Gemmer..."
              : event
              ? "Opdater oplysninger"
              : "Gem oplysninger"}
          </button>
        </div>
      </form>

      {event && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            Sidst opdateret: {new Date(event.updatedAt).toLocaleString("da-DK")}
          </p>
        </div>
      )}
    </div>
  );
}
