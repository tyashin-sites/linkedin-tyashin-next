/**
 * The hero's product picture: a hand-built HTML/CSS mock of the real flow —
 * your notes and voice → a draft with the reviewer's four checks → Approve →
 * Published on LinkedIn. It is an illustration with sample text (labelled as
 * such), not a screenshot. Decorative for assistive tech: the same flow is
 * described in the text next to it and in the list for screen readers below.
 */

function Check({ delay }: { delay: number }) {
  return (
    <span className="mock-check tick" style={{ animationDelay: `${delay}ms` }}>
      <svg width="9" height="9" viewBox="0 0 10 10" aria-hidden="true">
        <path d="M2 5.2l2 2L8 3" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

function Arrow({ className = '' }: { className?: string }) {
  return (
    <svg className={`flow-arrow ${className}`} width="34" height="14" viewBox="0 0 34 14" aria-hidden="true">
      <path d="M1 7h28M24 2l6 5-6 5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const CHECKS = ['Novelty', 'Groundedness', 'Human voice', 'Timeliness'];

export function HeroFlow() {
  return (
    <figure className="relative">
      <div aria-hidden="true" className="relative grid gap-3 xl:grid-cols-[0.95fr_auto_1.25fr] xl:items-center">
        {/* 1. Your voice */}
        <div className="mock-window p-4">
          <p className="mock-label">Your voice</p>
          <div className="mt-3 rounded-lg border border-border bg-background p-3">
            <p className="mock-label !tracking-normal !normal-case">Knowledge bank · note</p>
            <p className="mt-1.5 text-[0.82rem] leading-snug text-foreground">
              Raised prices in March. Two customers left. Should have told them a month earlier, on a call.
            </p>
          </div>
          <div className="mt-3 flex flex-wrap gap-1.5">
            <span className="mock-chip">Tone: Casual</span>
            <span className="mock-chip">Direct</span>
            <span className="mock-chip">Never say: “synergy”</span>
          </div>
        </div>

        <Arrow className="mx-auto rotate-90 xl:rotate-0" />

        {/* 2. Draft + review */}
        <div className="mock-window overflow-hidden">
          <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
            <p className="mock-label">Draft</p>
            <span className="mock-chip">Needs your approval</span>
          </div>
          <div className="p-4">
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-tint text-[0.8rem] font-semibold text-primary-deep">
                You
              </span>
              <div className="leading-tight">
                <p className="text-[0.86rem] font-semibold">Your name</p>
                <p className="text-[0.74rem] text-muted">Tue · 8:30 AM · your time zone</p>
              </div>
            </div>
            <p className="mt-3 text-[0.9rem] leading-relaxed text-foreground">
              We raised prices in March and lost two customers.
              <br />
              <br />
              The price was right. The way I announced it was wrong. Here is what I would do differently…
            </p>
            <div className="mt-4 rounded-lg bg-surface p-3">
              <p className="mock-label">Review by a second model</p>
              <ul className="mt-2 grid grid-cols-2 gap-x-3 gap-y-1.5">
                {CHECKS.map((c, i) => (
                  <li key={c} className="flex items-center gap-1.5 whitespace-nowrap text-[0.78rem]">
                    <Check delay={500 + i * 260} />
                    {c}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-4 flex items-center justify-end gap-2">
              <span className="rounded-full border border-border px-3.5 py-1.5 text-[0.8rem] font-semibold">Edit</span>
              <span className="pulse rounded-full bg-primary px-4 py-1.5 text-[0.8rem] font-semibold text-white">Approve</span>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2 border-t border-border bg-primary-tint px-4 py-2.5">
            <span className="live-dot" />
            <p className="text-[0.82rem] font-semibold text-primary-deep">Published on LinkedIn</p>
            <p className="text-[0.76rem] text-muted">through the official API</p>
          </div>
        </div>
      </div>

      <ol className="sr-only">
        <li>Your notes and tone settings describe your voice.</li>
        <li>Tyashin writes a draft post from them.</li>
        <li>A second model checks the draft for novelty, groundedness, human voice and timeliness.</li>
        <li>You edit or approve the draft.</li>
        <li>The approved post is published on LinkedIn through the official API.</li>
      </ol>
      <figcaption className="mt-3 text-center text-[0.78rem] text-muted">
        Illustration of the flow with sample text. Your drafts are written from your own notes.
      </figcaption>
    </figure>
  );
}
