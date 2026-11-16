/** Brand mark (the existing Tyashin icon) + wordmark. */
export function Logo({ onInk = false }: { onInk?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2.5">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/brand/logo-icon.svg" alt="" width={34} height={34} className="h-[34px] w-[34px] rounded-[9px]" />
      <span className="flex flex-col leading-none">
        <span className={`text-[1.12rem] font-semibold tracking-tight ${onInk ? 'text-white' : 'text-foreground'}`}>Tyashin</span>
        <span className={`mt-[3px] text-[0.66rem] font-medium uppercase tracking-[0.16em] ${onInk ? 'text-on-ink-muted' : 'text-muted'}`}>
          for LinkedIn
        </span>
      </span>
    </span>
  );
}
