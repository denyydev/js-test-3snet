function HeaderNav() {
  return (
    <nav className="h-[67px] w-full border-b border-[var(--color-border)] bg-[var(--color-background-white)]">
      <div className="flex h-full items-center px-[43px]">
        <div className="flex items-center gap-[72px] text-[16px] font-medium uppercase tracking-[0.01em] text-[var(--color-text-primary)]">
          <a href="#" className="relative flex h-full items-center">
            dashboard
            <span className="absolute bottom-0 left-0 h-[3px] w-full bg-[var(--color-accent)]" />
          </a>

          <a href="#" className="flex h-full items-center hover:text-[var(--color-text-primary)] text-[var(--color-text-primary)]">
            statistics
          </a>

          <a href="#" className="flex h-full items-center hover:text-[var(--color-text-primary)] text-[var(--color-text-primary)]">
            offers
          </a>

          <a href="#" className="flex h-full items-center hover:text-[var(--color-text-primary)] text-[var(--color-text-primary)]">
            advertisers
          </a>

          <button
            type="button"
            className="flex h-full items-center gap-2 text-[var(--color-text-primary)] hover:text-[var(--color-text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-background-white)]"
            aria-label="Partners menu"
          >
            partners
            <CaretDownIcon className="h-4 w-4 text-[var(--color-accent)]" />
          </button>

          <a href="#" className="flex h-full items-center text-[var(--color-text-primary)] hover:text-[var(--color-text-primary)]">
            tickets
          </a>

          <a href="#" className="flex h-full items-center text-[var(--color-text-primary)] hover:text-[var(--color-text-primary)]">
            billing
          </a>

          <a href="#" className="flex h-full items-center text-[var(--color-text-primary)] hover:text-[var(--color-text-primary)]">
            tasks
          </a>

          <a href="#" className="flex h-full items-center text-[var(--color-text-primary)] hover:text-[var(--color-text-primary)]">
            news
          </a>

          <button
            type="button"
            className="uppercase ml-auto flex h-full items-center gap-2 text-[var(--color-text-primary)] hover:text-[var(--color-text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-background-white)]"
            aria-label="Settings menu"
          >
            settings
            <CaretDownIcon className="h-4 w-4 text-[var(--color-accent)]" />
          </button>
        </div>
      </div>
    </nav>
  )
}

export default HeaderNav

function CaretDownIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" className={className} aria-hidden="true">
      <path d="M4.2 6.2a.8.8 0 0 1 1.1 0L8 8.9l2.7-2.7a.8.8 0 1 1 1.1 1.1L8.6 10.5a.9.9 0 0 1-1.2 0L4.2 7.3a.8.8 0 0 1 0-1.1Z" />
    </svg>
  )
}
