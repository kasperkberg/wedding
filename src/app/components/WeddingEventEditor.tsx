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
      <div className="wedding-card-enhanced rounded-2xl p-8">
        <div className="animate-pulse">
          <div className="h-5 bg-wedding-sage rounded w-1/4 mb-6"></div>
          <div className="space-y-4">
            <div className="h-4 bg-wedding-sage rounded w-3/4"></div>
            <div className="h-4 bg-wedding-sage rounded w-1/2"></div>
            <div className="h-4 bg-wedding-sage rounded w-2/3"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="wedding-card-enhanced rounded-2xl p-6 sm:p-8">
      <h2 className="admin-section-title mb-8">
        {event ? "Rediger bryllupsoplysninger" : "Opret bryllupsoplysninger"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className="grid md:grid-cols-2 gap-5">
          <div>
            <label className="admin-label">Titel *</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleChange("title", e.target.value)}
              className="admin-input"
              placeholder="f.eks. Tirill og Christians bryllup"
              required
            />
          </div>
          <div>
            <label className="admin-label">Dato *</label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => handleChange("date", e.target.value)}
              className="admin-input"
              required
            />
          </div>
          <div>
            <label className="admin-label">Tidspunkt</label>
            <input
              type="time"
              value={formData.time}
              onChange={(e) => handleChange("time", e.target.value)}
              className="admin-input"
            />
          </div>
          <div>
            <label className="admin-label">Sted *</label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => handleChange("location", e.target.value)}
              className="admin-input"
              placeholder="f.eks. Rådhuset, København"
              required
            />
          </div>
        </div>

        {/* Location Details */}
        <div>
          <label className="admin-label">Detaljer om stedet</label>
          <textarea
            value={formData.locationDetails}
            onChange={(e) => handleChange("locationDetails", e.target.value)}
            rows={3}
            className="admin-input resize-y"
            placeholder="Adresse, hvordan man kommer derhen, parkeringsmuligheder, etc."
          />
        </div>

        {/* Program */}
        <div>
          <label className="admin-label">Program / Tidsplan</label>
          <textarea
            value={formData.program}
            onChange={(e) => handleChange("program", e.target.value)}
            rows={4}
            className="admin-input resize-y"
            placeholder="Skriv programmet/tidsplanen her..."
          />
        </div>

        {/* Timeline */}
        <div>
          <label className="admin-label">Tidslinje (program for flere dager)</label>
          <p className="text-sm text-wedding-stone mb-3 wedding-abramo">
            Tilf&oslash;j dager og for hver dag: fra/til klokkeslett og label.
          </p>

          <div className="space-y-5">
            {formData.timeline.days.map((day, dayI) => (
              <fieldset
                key={dayI}
                className="p-4 bg-wedding-ivory/60 border border-wedding-linen rounded-xl"
              >
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <input
                    type="text"
                    value={day.dayLabel}
                    onChange={(e) => setDayLabel(dayI, e.target.value)}
                    className="admin-input flex-1 min-w-[200px]"
                    placeholder="F.eks. Fredag 26. juni 2026"
                  />
                  <button
                    type="button"
                    onClick={() => deleteDay(dayI)}
                    className="wedding-abramo px-3 py-1.5 text-sm text-wedding-rose hover:bg-wedding-rose/10 rounded-lg transition-colors"
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
                        className="admin-input w-24 text-sm"
                        placeholder="12:45"
                      />
                      <span className="text-wedding-stone wedding-abramo">&ndash;</span>
                      <input
                        type="text"
                        value={item.timeTo}
                        onChange={(e) =>
                          setItem(dayI, itemI, "timeTo", e.target.value)
                        }
                        className="admin-input w-24 text-sm"
                        placeholder="13:00"
                      />
                      <input
                        type="text"
                        value={item.label}
                        onChange={(e) =>
                          setItem(dayI, itemI, "label", e.target.value)
                        }
                        className="admin-input flex-1 min-w-[180px] text-sm"
                        placeholder="Ankomst til kirken"
                      />
                      <button
                        type="button"
                        onClick={() => deleteItem(dayI, itemI)}
                        className="wedding-abramo px-2 py-1 text-sm text-wedding-rose hover:bg-wedding-rose/10 rounded-lg transition-colors"
                      >
                        Slet
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addItem(dayI)}
                    className="wedding-abramo text-sm text-wedding-bronze hover:text-wedding-charcoal transition-colors"
                  >
                    + Tilf&oslash;j punkt
                  </button>
                </div>
              </fieldset>
            ))}
          </div>

          <button
            type="button"
            onClick={addDay}
            className="wedding-abramo text-sm text-wedding-bronze hover:text-wedding-charcoal transition-colors mt-3"
          >
            + Tilf&oslash;j dag
          </button>
        </div>

        {/* Wishes */}
        <div>
          <label className="admin-label">&Oslash;nsker</label>
          <textarea
            value={formData.wishes}
            onChange={(e) => handleChange("wishes", e.target.value)}
            rows={3}
            className="admin-input resize-y"
            placeholder="Tekst (Inspo)[https://url]"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          <div>
            <label className="admin-label">Dresscode</label>
            <input
              type="text"
              value={formData.dresscode}
              onChange={(e) => handleChange("dresscode", e.target.value)}
              className="admin-input"
              placeholder="Tekst (Inspo)[https://url]"
            />
          </div>
          <div>
            <label className="admin-label">Toastmaster</label>
            <textarea
              value={formData.toastmaster}
              onChange={(e) => handleChange("toastmaster", e.target.value)}
              rows={4}
              className="admin-input resize-y"
              placeholder={
                "Navn, e-mail og telefon for begge toastmasters. Fx:\nOle: ole@mail.dk, +45 12 34 56 78\nKirsten: kirsten@mail.dk, 20 30 40 50"
              }
            />
          </div>
        </div>

        {/* Additional Information */}
        <div>
          <label className="admin-label">Yderligere information</label>
          <textarea
            value={formData.additionalInfo}
            onChange={(e) => handleChange("additionalInfo", e.target.value)}
            rows={4}
            className="admin-input resize-y"
            placeholder="Eventuelle særlige oplysninger, transport, etc."
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={saving}
            className="wedding-button wedding-abramo px-8 py-3 rounded-full text-base disabled:opacity-50 disabled:cursor-not-allowed"
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
        <div className="mt-6 pt-5 border-t border-wedding-linen">
          <p className="text-sm text-wedding-stone wedding-abramo">
            Sidst opdateret: {new Date(event.updatedAt).toLocaleString("da-DK")}
          </p>
        </div>
      )}
    </div>
  );
}
