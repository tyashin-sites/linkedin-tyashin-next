import type { ReactNode } from 'react';

/**
 * THE one Coming-soon treatment. Anything that is not live in the product is
 * shown with this badge or inside this panel — never as a present-tense
 * feature, never with a buy button. The full list lives on /roadmap.
 */
export function ComingSoonBadge({ className = '' }: { className?: string }) {
  return (
    <span className={`soon-badge ${className}`}>
      <span aria-hidden="true">◌</span> Coming soon
    </span>
  );
}

export function ComingSoonPanel({
  title,
  children,
  today,
  as: Tag = 'h3',
  showRoadmapLink = true,
}: {
  title: string;
  children: ReactNode;
  /** What you can do today instead, stated plainly. */
  today?: string;
  as?: 'h2' | 'h3' | 'h4';
  showRoadmapLink?: boolean;
}) {
  return (
    <div className="soon-panel flex h-full flex-col p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <Tag className="tt-h3">{title}</Tag>
        <ComingSoonBadge />
      </div>
      <div className="mt-2 text-[0.98rem] text-muted">{children}</div>
      {today ? (
        <p className="mt-4 border-t border-dashed border-border pt-3 text-[0.92rem]">
          <span className="font-semibold">Today:</span> <span className="text-muted">{today}</span>
        </p>
      ) : null}
      {showRoadmapLink ? (
        <p className="mt-auto pt-4 text-[0.9rem]">
          <a href="/roadmap" className="link-arrow">
            See the roadmap
          </a>
        </p>
      ) : null}
    </div>
  );
}
