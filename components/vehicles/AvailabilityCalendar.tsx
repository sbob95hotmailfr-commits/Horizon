"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import type { BookedRange } from "@/lib/vehicles";

function isDateBooked(date: Date, ranges: BookedRange[]) {
  const iso = date.toISOString().slice(0, 10);
  return ranges.some((r) => iso >= r.startDate && iso <= r.endDate);
}

function buildMonthGrid(year: number, month: number) {
  const firstDay = new Date(year, month, 1);
  const startOffset = (firstDay.getDay() + 6) % 7; // lundi = 0
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells: (Date | null)[] = Array(startOffset).fill(null);
  for (let day = 1; day <= daysInMonth; day++) {
    cells.push(new Date(year, month, day));
  }
  return cells;
}

const WEEKDAYS = ["L", "M", "M", "J", "V", "S", "D"];

export function AvailabilityCalendar({ bookedRanges }: { bookedRanges: BookedRange[] }) {
  const today = new Date();
  const [cursor, setCursor] = useState(new Date(today.getFullYear(), today.getMonth(), 1));

  const cells = buildMonthGrid(cursor.getFullYear(), cursor.getMonth());
  const label = new Intl.DateTimeFormat("fr-FR", { month: "long", year: "numeric" }).format(
    cursor,
  );

  return (
    <div className="rounded-xl border border-black/10 p-4">
      <div className="mb-3 flex items-center justify-between">
        <button
          type="button"
          onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() - 1, 1))}
          className="rounded-full px-2 py-1 text-black/50 hover:bg-black/5"
          aria-label="Mois précédent"
        >
          ‹
        </button>
        <span className="text-sm font-medium capitalize">{label}</span>
        <button
          type="button"
          onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1))}
          className="rounded-full px-2 py-1 text-black/50 hover:bg-black/5"
          aria-label="Mois suivant"
        >
          ›
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center text-xs">
        {WEEKDAYS.map((d, i) => (
          <span key={i} className="py-1 text-black/40">
            {d}
          </span>
        ))}
        {cells.map((date, i) => {
          if (!date) return <span key={i} />;
          const past = date < new Date(today.getFullYear(), today.getMonth(), today.getDate());
          const booked = isDateBooked(date, bookedRanges);
          return (
            <span
              key={i}
              className={cn(
                "flex h-8 items-center justify-center rounded-full",
                past && "text-black/20",
                booked && !past && "bg-black/10 text-black/40 line-through",
                !booked && !past && "text-black",
              )}
            >
              {date.getDate()}
            </span>
          );
        })}
      </div>

      <p className="mt-3 text-xs text-black/40">Jours barrés = déjà réservés</p>
    </div>
  );
}
