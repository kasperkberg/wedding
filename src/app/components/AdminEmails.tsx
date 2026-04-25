"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Recipient {
  email: string;
  name: string;
}

function textToHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/\n/g, "<br>");
}

export function AdminEmails() {
  const [recipients, setRecipients] = useState<Recipient[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [subject, setSubject] = useState("");
  const [text, setText] = useState("");
  const [toMode, setToMode] = useState<"all" | "select">("all");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [showPreview, setShowPreview] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendResult, setSendResult] = useState<"ok" | "err" | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/admin/recipients");
        const json = await res.json();
        if (json.success) setRecipients(json.data);
        else setError(json.error || "Kunne ikke hente modtagere");
      } catch (e) {
        setError("Kunne ikke hente modtagere");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const toggleSelect = (email: string) => {
    setSelected((s) => {
      const n = new Set(s);
      if (n.has(email)) n.delete(email);
      else n.add(email);
      return n;
    });
  };

  const selectAll = () => {
    if (selected.size === recipients.length) setSelected(new Set());
    else setSelected(new Set(recipients.map((r) => r.email)));
  };

  const toList: string[] =
    toMode === "all" ? recipients.map((r) => r.email) : Array.from(selected);

  const previewHtml = (
    <div
      className="max-w-[600px] mx-auto p-5 font-sans text-[15px] leading-relaxed text-wedding-charcoal"
      style={{ fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif" }}
    >
      <p className="whitespace-pre-line" dangerouslySetInnerHTML={{ __html: textToHtml(text) || "(ingen tekst)" }} />
      <hr className="my-6 border-wedding-linen" />
      <p className="text-center text-wedding-stone text-sm">Tirill & CC</p>
    </div>
  );

  const handleSend = async () => {
    if (!subject.trim() || !text.trim()) {
      setSendResult("err");
      setError("Emne og tekst skal udfyldes.");
      return;
    }
    if (toList.length === 0) {
      setSendResult("err");
      setError(toMode === "all" ? "Ingen modtagere i systemet." : "Vælg mindst én modtager.");
      return;
    }
    setSending(true);
    setError(null);
    setSendResult(null);
    try {
      const res = await fetch("/api/admin/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: toMode === "all" ? "all" : toList,
          subject: subject.trim(),
          text: text.trim(),
        }),
      });
      const json = await res.json();
      if (json.success) {
        setSendResult("ok");
        setSubject("");
        setText("");
      } else {
        setSendResult("err");
        setError(json.error || "Kunne ikke sende");
      }
    } catch (e) {
      setSendResult("err");
      setError("Kunne ikke sende");
    } finally {
      setSending(false);
    }
  };

  if (loading) {
    return (
      <div className="wedding-card-enhanced rounded-2xl p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-wedding-lemon mx-auto mb-4" />
          <p className="wedding-abramo text-wedding-stone">Indlæser modtagere...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="wedding-card-enhanced rounded-2xl p-6">
        <h3 className="admin-section-title mb-6">
          Send email til g&aelig;ster
        </h3>
        <div className="wedding-divider !my-4" />

        <div className="space-y-4">
          <div>
            <label className="admin-label">Emne</label>
            <input
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="admin-input"
              placeholder="Fx: Påmindelse om bryllup"
            />
          </div>

          <div>
            <label className="admin-label">Tekst</label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={8}
              className="admin-input resize-y"
              placeholder="Skriv din besked her..."
            />
          </div>

          <div>
            <label className="admin-label">Modtagere</label>
            <div className="flex gap-4 mb-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="toMode"
                  checked={toMode === "all"}
                  onChange={() => setToMode("all")}
                  className="text-wedding-lemon focus:ring-wedding-lemon"
                />
                <span className="wedding-abramo text-wedding-charcoal">Alle ({recipients.length})</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="toMode"
                  checked={toMode === "select"}
                  onChange={() => setToMode("select")}
                  className="text-wedding-lemon focus:ring-wedding-lemon"
                />
                <span className="wedding-abramo text-wedding-charcoal">Vælg modtagere</span>
              </label>
            </div>

            {toMode === "select" && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="border border-wedding-linen rounded-lg p-4 max-h-48 overflow-y-auto"
              >
                <button
                  type="button"
                  onClick={selectAll}
                  className="wedding-abramo text-sm text-wedding-stone hover:text-wedding-charcoal mb-2"
                >
                  {selected.size === recipients.length ? "Fravælg alle" : "Vælg alle"}
                </button>
                <div className="space-y-2">
                  {recipients.map((r) => (
                    <label
                      key={r.email}
                      className="flex items-center gap-2 cursor-pointer wedding-abramo text-wedding-charcoal text-sm"
                    >
                      <input
                        type="checkbox"
                        checked={selected.has(r.email)}
                        onChange={() => toggleSelect(r.email)}
                        className="rounded border-wedding-linen text-wedding-lemon focus:ring-wedding-lemon"
                      />
                      <span>{r.name || r.email}</span>
                      <span className="text-wedding-stone">({r.email})</span>
                    </label>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {error && (
            <p className="wedding-abramo text-sm text-red-600">{error}</p>
          )}
          {sendResult === "ok" && (
            <p className="wedding-abramo text-sm text-green-700">Email sendt til {toList.length} modtager(e).</p>
          )}

          <div className="flex flex-wrap gap-3 pt-2">
            <button
              type="button"
              onClick={() => setShowPreview((v) => !v)}
              className="wedding-button wedding-abramo px-4 py-2 rounded-full text-sm"
            >
              {showPreview ? "Skjul forhåndsvisning" : "Forhåndsvis"}
            </button>
            <button
              type="button"
              onClick={handleSend}
              disabled={sending}
              className="wedding-button wedding-abramo px-4 py-2 rounded-full text-sm disabled:opacity-60"
            >
              {sending ? "Sender…" : "Send"}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showPreview && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className="wedding-card-enhanced rounded-2xl p-6"
          >
            <h4 className="wedding-abramo text-lg font-semibold text-wedding-charcoal mb-2">
              Forhåndsvisning
            </h4>
            <p className="wedding-abramo text-sm text-wedding-stone mb-4">
              Emne: {subject || "(intet emne)"}
            </p>
            <div className="bg-white border border-wedding-linen rounded-lg p-4">
              {previewHtml}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
