import type { FaqItem } from '@/data/faq';

/** Native <details> accordion: works without JS, keyboard-accessible by default. */
export function FaqList({ items }: { items: FaqItem[] }) {
  return (
    <div className="rule-top">
      {items.map((f) => (
        <details key={f.q} className="group border-b border-border">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 text-[1.08rem] font-semibold [&::-webkit-details-marker]:hidden">
            <span>{f.q}</span>
            <span
              aria-hidden="true"
              className="mt-0.5 flex h-7 w-7 flex-none items-center justify-center rounded-full border border-border text-primary transition-transform duration-200 group-open:rotate-45"
            >
              +
            </span>
          </summary>
          <p className="max-w-3xl pb-6 text-muted">{f.a}</p>
        </details>
      ))}
    </div>
  );
}
