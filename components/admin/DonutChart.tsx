const COLORS = [
  "#FF6A00",
  "#080B0D",
  "rgba(8,11,13,0.65)",
  "rgba(8,11,13,0.4)",
  "rgba(8,11,13,0.25)",
  "rgba(8,11,13,0.12)",
];

export function DonutChart({ data }: { data: { label: string; count: number }[] }) {
  const total = data.reduce((sum, d) => sum + d.count, 0);

  let cumulative = 0;
  const stops = data.map((d, i) => {
    const start = total > 0 ? (cumulative / total) * 100 : 0;
    cumulative += d.count;
    const end = total > 0 ? (cumulative / total) * 100 : 0;
    return `${COLORS[i % COLORS.length]} ${start}% ${end}%`;
  });
  const gradient = `conic-gradient(${stops.join(", ")})`;

  return (
    <div className="flex flex-wrap items-center gap-6">
      <div
        className="relative h-36 w-36 shrink-0 rounded-full"
        style={{ background: total > 0 ? gradient : "rgba(8,11,13,0.08)" }}
      >
        <div className="absolute inset-4 flex items-center justify-center rounded-full bg-ivory">
          <span className="text-lg font-semibold">{total}</span>
        </div>
      </div>

      <ul className="space-y-1.5 text-sm">
        {data.map((d, i) => (
          <li key={d.label} className="flex items-center gap-2">
            <span
              className="h-2.5 w-2.5 shrink-0 rounded-full"
              style={{ background: COLORS[i % COLORS.length] }}
            />
            <span className="text-black/70">{d.label}</span>
            <span className="font-medium">{d.count}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
