"use client";

import { useEffect, useState } from "react";

type TimelineDay = { dayLabel: string; items: { timeFrom: string; timeTo: string; label: string }[] };
type Timeline = { days: TimelineDay[] };

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

export function WeddingEventEditor() {
  const [event, setEvent] = useState<WeddingEvent | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState<{
    title: string;
    date: string;
    time: string;
    location: string;
    locationDetails: string;
    program: string;
    wishes: string;
    additionalInfo: string;
    dresscode: string;
    toastmaster: string;
    timeline: Timeline;
  }>({
    title: "",
    date: "",
    time: "",
    location: "",
    locationDetails: "",
    program: "",
    wishes: "",
    additionalInfo: "",
    dresscode: "",
    toastmaster: "",
    timeline: { days: [] },
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
        const t = result.data.timeline;
        const timeline: Timeline =
          t && Array.isArray(t.days) ? { days: t.days } : { days: [] };
        setFormData({
          title: result.data.title || "",
          date: result.data.date
            ? new Date(result.data.date).toISOString().split("T")[0]
            : "",
          time: result.data.time || "",
          location: result.data.location || "",
          locationDetails: result.data.locationDetails || "",
          program: result.data.program || "",
          wishes: result.data.wishes || result.data.wishlist || "",
          additionalInfo: result.data.additionalInfo || "",
          dresscode: result.data.dresscode || "",
          toastmaster: result.data.toastmaster || "",
          timeline,
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
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const setTimeline = (updater: (prev: Timeline) => Timeline) => {
    setFormData((prev) => ({ ...prev, timeline: updater(prev.timeline) }));
  };

  const addDay = () =>
    setTimeline((t) => ({ days: [...t.days, { dayLabel: "Ny dag", items: [] }] }));
  const deleteDay = (i: number) =>
    setTimeline((t) => ({ days: t.days.filter((_, j) => j !== i) }));
  const setDayLabel = (i: number, v: string) =>
    setTimeline((t) => ({
      days: t.days.map((d, j) => (j === i ? { ...d, dayLabel: v } : d)),
    }));
  const addItem = (dayI: number) =>
    setTimeline((t) => ({
      days: t.days.map((d, j) =>
        j === dayI
          ? { ...d, items: [...d.items, { timeFrom: "", timeTo: "", label: "" }] }
          : d
      ),
    }));
  const deleteItem = (dayI: number, itemI: number) =>
    setTimeline((t) => ({
      days: t.days.map((d, j) =>
        j === dayI ? { ...d, items: d.items.filter((_, k) => k !== itemI) } : d
      ),
    }));
  const setItem = (dayI: number, itemI: number, field: "timeFrom" | "timeTo" | "label", v: string) =>
    setTimeline((t) => ({
      days: t.days.map((d, j) =>
        j === dayI
          ? {
              ...d,
              items: d.items.map((it, k) =>
                k === itemI ? { ...it, [field]: v } : it
              ),
            }
          : d
      ),
    }));

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
      <h2 className="text-3xl font-bold text-wedding-charcoal mb-8 wedding-abramo text-center">
        {event ? "Rediger bryllupsoplysninger" : "Opret bryllupsoplysninger"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-wedding-charcoal mb-2 wedding-abramo">
              Titel *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleChange("title", e.target.value)}
              className="w-full px-4 py-3 border border-wedding-sage-dark rounded-lg focus:outline-none focus:ring-2 focus:ring-wedding-bronze bg-wedding-ivory wedding-abramo"
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

        {/* Tidslinje (program for flere dager) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tidslinje (program for flere dager)
          </label>
          <p className="text-sm text-gray-500 mb-3">
            Tilføj dager og for hver dag: fra/til klokkeslett og label.
          </p>
          {formData.timeline.days.map((day, dayI) => (
            <fieldset
              key={dayI}
              className="mb-6 p-4 border border-gray-200 rounded-lg"
            >
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <input
                  type="text"
                  value={day.dayLabel}
                  onChange={(e) => setDayLabel(dayI, e.target.value)}
                  className="flex-1 min-w-[200px] px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="F.eks. Fredag 26. juni 2026"
                />
                <button
                  type="button"
                  onClick={() => deleteDay(dayI)}
                  className="px-2 py-1 text-sm text-red-600 hover:bg-red-50 rounded"
                >
                  Slet dag
                </button>
              </div>
              <div className="space-y-2 ml-2">
                {day.items.map((item, itemI) => (
                  <div
                    key={itemI}
                    className="flex flex-wrap gap-2 items-center"
                  >
                    <input
                      type="text"
                      value={item.timeFrom}
                      onChange={(e) =>
                        setItem(dayI, itemI, "timeFrom", e.target.value)
                      }
                      className="w-24 px-2 py-1.5 border border-gray-300 rounded text-sm"
                      placeholder="12:45"
                    />
                    <span className="text-gray-400">–</span>
                    <input
                      type="text"
                      value={item.timeTo}
                      onChange={(e) =>
                        setItem(dayI, itemI, "timeTo", e.target.value)
                      }
                      className="w-24 px-2 py-1.5 border border-gray-300 rounded text-sm"
                      placeholder="13:00"
                    />
                    <input
                      type="text"
                      value={item.label}
                      onChange={(e) =>
                        setItem(dayI, itemI, "label", e.target.value)
                      }
                      className="flex-1 min-w-[180px] px-2 py-1.5 border border-gray-300 rounded text-sm"
                      placeholder="Ankomst til kirken"
                    />
                    <button
                      type="button"
                      onClick={() => deleteItem(dayI, itemI)}
                      className="px-2 py-1 text-sm text-red-600 hover:bg-red-50 rounded"
                    >
                      Slet
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addItem(dayI)}
                  className="text-sm text-blue-600 hover:underline"
                >
                  + Tilføj punkt
                </button>
              </div>
            </fieldset>
          ))}
          <button
            type="button"
            onClick={addDay}
            className="text-sm text-blue-600 hover:underline"
          >
            + Tilføj dag
          </button>
        </div>

        {/* Wishes */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Ønsker
          </label>
          <textarea
            value={formData.wishes}
            onChange={(e) => handleChange("wishes", e.target.value)}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Tekst (Inspo)[https://url]"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-black mb-2">
              Dresscode
            </label>
            <input
              type="text"
              value={formData.dresscode}
              onChange={(e) => handleChange("dresscode", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Tekst (Inspo)[https://url]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-black mb-2">
              Toastmaster
            </label>
            <textarea
              value={formData.toastmaster}
              onChange={(e) => handleChange("toastmaster", e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={
                "Navn, e-mail og telefon for begge toastmasters. Fx:\nOle: ole@mail.dk, +45 12 34 56 78\nKirsten: kirsten@mail.dk, 20 30 40 50"
              }
            />
          </div>
        </div>

        {/* Additional Information */}
        <div>
          <label className="block text-sm font-medium text-black mb-2">
            Yderligere information
          </label>
          <textarea
            value={formData.additionalInfo}
            onChange={(e) => handleChange("additionalInfo", e.target.value)}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Eventuelle særlige oplysninger, transport, etc."
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
