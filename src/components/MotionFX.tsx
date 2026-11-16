'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

/**
 * Mounted once in the layout. Two jobs, both CSS-driven:
 *  - `.is-scrolled` on the header (shadow + hairline; the bar height never
 *    changes, so no layout shift);
 *  - below-the-fold `.rv` blocks settle into place once as they enter view.
 * Nothing is hidden for visitors without JS or with reduced motion: the
 * hiding rule only exists under `html.motion-ok`, which is set here.
 */
export function MotionFX() {
  const pathname = usePathname();

  useEffect(() => {
    const header = document.querySelector<HTMLElement>('[data-header]');
    const onScroll = () => header?.classList.toggle('is-scrolled', window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || !('IntersectionObserver' in window)) return;
    const els = Array.from(document.querySelectorAll<HTMLElement>('.rv:not(.in)'));
    // Anything already on screen is shown immediately (never hide painted content).
    const vh = window.innerHeight;
    for (const el of els) if (el.getBoundingClientRect().top < vh * 0.95) el.classList.add('in');
    document.documentElement.classList.add('motion-ok');
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.05 },
    );
    for (const el of els) if (!el.classList.contains('in')) io.observe(el);
    return () => io.disconnect();
  }, [pathname]);

  return null;
}
