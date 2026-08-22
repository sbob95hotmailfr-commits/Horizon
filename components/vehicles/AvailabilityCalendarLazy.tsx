"use client";

import dynamic from "next/dynamic";
import type { BookedRange } from "@/lib/vehicles";

const AvailabilityCalendar = dynamic(
  () => import("./AvailabilityCalendar").then((m) => m.AvailabilityCalendar),
  {
    ssr: false,
    loading: () => <div className="h-[21rem] animate-pulse rounded-xl bg-black/5" />,
  },
);

export function AvailabilityCalendarLazy(props: { bookedRanges: BookedRange[] }) {
  return <AvailabilityCalendar {...props} />;
}
