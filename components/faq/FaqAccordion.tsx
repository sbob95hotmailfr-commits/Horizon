import type { FAQ_GROUPS } from "@/lib/faq";

export function FaqAccordion({ groups }: { groups: typeof FAQ_GROUPS }) {
  return (
    <div className="space-y-10">
      {groups.map((group) => (
        <div key={group.title} className="space-y-1">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-black/60">
            {group.title}
          </h3>
          <div className="divide-y divide-black/10 border-t border-black/10">
            {group.questions.map((item) => (
              <details
                key={item.question}
                className="group border-l-2 border-transparent py-5 pl-4 open:border-accent"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium hover:text-accent">
                  {item.question}
                  <span className="shrink-0 text-black/60 transition-transform group-open:rotate-45 group-hover:text-accent">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-sm text-black/60">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
