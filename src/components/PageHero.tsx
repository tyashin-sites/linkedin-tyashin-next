import Link from 'next/link';
import type { ReactNode } from 'react';

export interface Crumb {
  name: string;
  path: string;
}

export function Breadcrumbs({ trail }: { trail: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-[0.86rem] text-muted">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        <li>
          <Link href="/" className="hover:text-foreground hover:underline">
            Home
          </Link>
        </li>
        {trail.map((c, i) => (
          <li key={c.path} className="flex items-center gap-2">
            <span aria-hidden="true">/</span>
            {i === trail.length - 1 ? (
              <span aria-current="page" className="text-foreground">
                {c.name}
              </span>
            ) : (
              <Link href={c.path} className="hover:text-foreground hover:underline">
                {c.name}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function PageHero({
  eyebrow,
  title,
  lead,
  trail,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  trail: Crumb[];
  children?: ReactNode;
}) {
  return (
    <header className="container-y pb-12 pt-10 sm:pt-14">
      <Breadcrumbs trail={trail} />
      <div className="mt-10 max-w-3xl">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="tt-h1 mt-5">{title}</h1>
        {lead ? <p className="tt-lead mt-6">{lead}</p> : null}
        {children ? <div className="mt-8">{children}</div> : null}
      </div>
    </header>
  );
}

export function SectionHead({
  eyebrow,
  title,
  lead,
  id,
  as: Tag = 'h2',
}: {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  id?: string;
  as?: 'h2' | 'h3';
}) {
  return (
    <div className="max-w-2xl">
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <Tag id={id} className={`tt-h2 ${eyebrow ? 'mt-5' : ''}`}>
        {title}
      </Tag>
      {lead ? <p className="tt-lead mt-5">{lead}</p> : null}
    </div>
  );
}
