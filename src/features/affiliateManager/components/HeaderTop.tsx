function HeaderTop() {
  return (
    <header className="h-20 bg-[var(--color-background-dark)] text-[var(--color-text-white)]">
      <div className="mx-auto flex h-full max-w-6xl items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="text-[32px] font-semibold leading-none text-[var(--color-accent)]">
            3S
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-[12px] font-semibold tracking-[0.12em] text-[var(--color-text-muted-on-dark)]">
              CPA
            </span>
            <span className="mt-1 text-[12px] font-semibold tracking-[0.12em] text-[var(--color-text-muted-on-dark)]">
              NETWORK
            </span>
          </div>
        </div>
        <nav className="flex items-center gap-10 text-[14px] font-medium tracking-[0.08em] text-[var(--color-text-white)]">
          <a href="#" className="hover:text-[var(--color-accent)]">
            PAYMENT SYSTEMS
          </a>
          <a href="#" className="hover:text-[var(--color-accent)]">
            REFERRALS
          </a>
        </nav>
        <div className="flex items-center gap-6 text-[14px]">
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-md px-2 py-1 text-[var(--color-text-white)] hover:bg-[rgba(255,255,255,0.06)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-background-dark)]"
            aria-label="Balance menu"
          >
            <span className="font-medium">$ 500</span>
            <CaretDownIcon className="h-4 w-4 text-[var(--color-text-white)]" />
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-md px-2 py-1 hover:bg-[rgba(255,255,255,0.06)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-background-dark)]"
            aria-label="Notifications"
          >
            <BellIcon className="h-4 w-4 text-[var(--color-accent)]" />
            <span className="text-[14px] font-medium text-[var(--color-text-white)]">
              8
            </span>
          </button>
          <a
            href="#"
            className="rounded-md px-2 py-1 text-[var(--color-text-white)] hover:bg-[rgba(255,255,255,0.06)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-background-dark)]"
          >
            profile@mail.ru
          </a>
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-md px-2 py-1 hover:bg-[rgba(255,255,255,0.06)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-background-dark)]"
            aria-label="Language menu"
          >
            <FlagUk className="h-4 w-5 rounded-[2px]" />
            <span className="font-medium">ENG</span>
            <CaretDownIcon className="h-4 w-4 text-[var(--color-text-white)]" />
          </button>
        </div>
      </div>
    </header>
  );
}

export default HeaderTop;

function CaretDownIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M4.2 6.2a.8.8 0 0 1 1.1 0L8 8.9l2.7-2.7a.8.8 0 1 1 1.1 1.1L8.6 10.5a.9.9 0 0 1-1.2 0L4.2 7.3a.8.8 0 0 1 0-1.1Z" />
    </svg>
  );
}

function BellIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M12 22a2.5 2.5 0 0 0 2.45-2h-4.9A2.5 2.5 0 0 0 12 22Z"
        fill="currentColor"
        opacity="0.95"
      />
      <path
        d="M18 16.5H6c.9-1 .9-2.4.9-4V10a5.1 5.1 0 0 1 10.2 0v2.5c0 1.6 0 3 .9 4Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M9.2 6.6a3.4 3.4 0 0 1 5.6 0"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        opacity="0.8"
      />
    </svg>
  );
}

function FlagUk({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 40" className={className} aria-hidden="true">
      <defs>
        <clipPath id="uk-clip">
          <rect width="60" height="40" rx="2" />
        </clipPath>
      </defs>
      <g clipPath="url(#uk-clip)">
        <rect width="60" height="40" fill="#012169" />
        <path d="M0 0l60 40M60 0L0 40" stroke="#FFF" strokeWidth="10" />
        <path d="M0 0l60 40M60 0L0 40" stroke="#C8102E" strokeWidth="6" />
        <path d="M30 0v40M0 20h60" stroke="#FFF" strokeWidth="16" />
        <path d="M30 0v40M0 20h60" stroke="#C8102E" strokeWidth="10" />
      </g>
    </svg>
  );
}
