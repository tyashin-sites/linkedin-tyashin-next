'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { mainNav, productNav, siteConfig, type NavLink } from '@/config/site';
import { Logo } from '@/components/Logo';

/** /blog renders per request — full-document navigation keeps it a fresh SSR load. */
function NavA({ link, className, onClick, current }: { link: NavLink; className: string; onClick?: () => void; current: boolean }) {
  const props = { className, onClick, 'aria-current': current ? ('page' as const) : undefined };
  return link.href.startsWith('/blog') ? (
    <a href={link.href} {...props}>
      {link.label}
    </a>
  ) : (
    <Link href={link.href} {...props}>
      {link.label}
    </Link>
  );
}

export function Header() {
  const pathname = usePathname() || '/';
  const [productOpen, setProductOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const productRef = useRef<HTMLDivElement>(null);
  const isCurrent = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  // Close menus on navigation.
  useEffect(() => {
    setProductOpen(false);
    setMobileOpen(false);
  }, [pathname]);

  // Close on Escape and on a click outside the Product menu.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setProductOpen(false);
        setMobileOpen(false);
      }
    };
    const onDown = (e: MouseEvent) => {
      if (productRef.current && !productRef.current.contains(e.target as Node)) setProductOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onDown);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onDown);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const productActive = productNav.some((l) => isCurrent(l.href));

  return (
    <>
    <header className="site-header" data-header>
      <div className="container-y flex h-[4.5rem] items-center justify-between gap-4">
        <Link href="/" aria-label={`${siteConfig.name} home`} className="flex-none rounded-lg">
          <Logo />
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          <div className="relative" ref={productRef}>
            <button
              type="button"
              className="nav-link inline-flex items-center gap-1.5"
              aria-expanded={productOpen}
              aria-controls="product-menu"
              data-active={productActive || undefined}
              onClick={() => setProductOpen((v) => !v)}
            >
              Product
              <svg aria-hidden="true" width="10" height="6" viewBox="0 0 10 6" className={`transition-transform ${productOpen ? 'rotate-180' : ''}`}>
                <path d="M1 1l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <div
              id="product-menu"
              hidden={!productOpen}
              className="card absolute left-0 top-[calc(100%+0.5rem)] w-[21rem] p-2"
            >
              <ul>
                {productNav.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      aria-current={isCurrent(l.href) ? 'page' : undefined}
                      className="block rounded-lg px-3.5 py-3 hover:bg-surface"
                      onClick={() => setProductOpen(false)}
                    >
                      <span className="block font-semibold">{l.label}</span>
                      <span className="mt-0.5 block text-[0.88rem] text-muted">{l.note}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {mainNav.map((l) => (
            <NavA key={l.href} link={l} className="nav-link" current={isCurrent(l.href)} />
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a href={siteConfig.cta.signIn.href} className="nav-link hidden sm:inline-flex">
            {siteConfig.cta.signIn.label}
          </a>
          <a href={siteConfig.cta.primary.href} className="btn btn-primary btn-sm hidden min-[420px]:inline-flex">
            {siteConfig.cta.primary.label}
          </a>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-border lg:hidden"
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMobileOpen((v) => !v)}
          >
            <svg aria-hidden="true" width="20" height="14" viewBox="0 0 20 14">
              {mobileOpen ? (
                <path d="M3 1l14 12M17 1L3 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              ) : (
                <path d="M1 1h18M1 7h18M1 13h18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </div>
    </header>

      {/* Outside <header>: its backdrop-filter would become the containing block for position:fixed. */}
      <div
        id="mobile-menu"
        hidden={!mobileOpen}
        className="fixed inset-x-0 bottom-0 top-[4.5rem] z-40 overflow-y-auto border-t border-border bg-background lg:hidden"
      >
        <nav aria-label="Mobile" className="container-y flex flex-col gap-1 py-6">
          <p className="px-3 pb-1 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-muted">Product</p>
          {productNav.map((l) => (
            <NavA key={l.href} link={l} className="nav-link text-[1.05rem]" current={isCurrent(l.href)} onClick={() => setMobileOpen(false)} />
          ))}
          <div className="hairline my-3" />
          {mainNav.map((l) => (
            <NavA key={l.href} link={l} className="nav-link text-[1.05rem]" current={isCurrent(l.href)} onClick={() => setMobileOpen(false)} />
          ))}
          <div className="hairline my-3" />
          <a href={siteConfig.cta.signIn.href} className="nav-link text-[1.05rem]">
            {siteConfig.cta.signIn.label}
          </a>
          <a href={siteConfig.cta.primary.href} className="btn btn-primary mt-3">
            {siteConfig.cta.primary.label}
          </a>
          <p className="mt-3 px-1 text-[0.88rem] text-muted">{siteConfig.offerLine}</p>
        </nav>
      </div>
    </>
  );
}
