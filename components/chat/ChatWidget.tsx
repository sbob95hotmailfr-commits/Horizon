"use client";

import { useState, useRef, useEffect } from "react";
import { Monogram } from "@/components/brand/Monogram";
import { cn } from "@/lib/utils";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const INTRO: Message = {
  role: "assistant",
  content:
    "Bonjour, je suis le conseiller Horizon. Décrivez-moi votre besoin (trajet, nombre de passagers, budget...) et je vous recommande un véhicule.",
};

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([INTRO]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [messages, open]);

  async function sendMessage(event: React.FormEvent) {
    event.preventDefault();
    const text = input.trim();
    if (!text || loading) return;

    const nextMessages: Message[] = [...messages, { role: "user", content: text }];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages }),
      });
      const data = (await res.json()) as { message?: string; error?: string };
      setMessages([
        ...nextMessages,
        {
          role: "assistant",
          content: data.message || "Désolé, une erreur est survenue. Réessayez.",
        },
      ]);
    } catch {
      setMessages([
        ...nextMessages,
        { role: "assistant", content: "Désolé, une erreur est survenue. Réessayez." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {open && (
        <div className="mb-3 flex h-[28rem] w-[22rem] max-w-[90vw] flex-col overflow-hidden rounded-2xl border border-black/15 bg-white">
          <div className="flex items-center justify-between border-b border-black/10 px-4 py-3">
            <div className="flex items-center gap-2">
              <Monogram className="h-5 w-5" />
              <span className="text-sm font-semibold">Conseiller Horizon</span>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Fermer le chat"
              className="text-black/60 hover:text-accent"
            >
              ✕
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
            {messages.map((m, i) => (
              <div
                key={i}
                className={cn(
                  "max-w-[85%] rounded-xl px-3 py-2 text-sm",
                  m.role === "user"
                    ? "ml-auto bg-black text-ivory"
                    : "bg-black/5 text-black",
                )}
              >
                {m.content}
              </div>
            ))}
            {loading && (
              <div className="max-w-[85%] rounded-xl bg-black/5 px-3 py-2 text-sm text-black/65">
                …
              </div>
            )}
          </div>

          <form onSubmit={sendMessage} className="flex gap-2 border-t border-black/10 p-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Décrivez votre besoin…"
              className="flex-1 rounded-full border border-black/15 px-3 py-2 text-sm outline-none focus:border-black/40"
            />
            <button
              type="submit"
              disabled={loading}
              className="rounded-full bg-accent px-4 py-2 text-sm font-semibold text-black hover:bg-accent/90 disabled:opacity-50"
            >
              Envoyer
            </button>
          </form>
        </div>
      )}

      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Ouvrir le conseiller Horizon"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-black text-ivory transition-all hover:scale-105 hover:bg-accent hover:text-black"
      >
        <Monogram className="h-6 w-6" />
      </button>
    </div>
  );
}
