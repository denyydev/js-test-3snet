type MonthPagerProps = {
  onPrev: () => void
  onNext: () => void
  disabled?: boolean
}

function MonthPager({ onPrev, onNext, disabled = false }: MonthPagerProps) {
  return (
    <div className="flex justify-end gap-4">
      <button
        type="button"
        onClick={onPrev}
        disabled={disabled}
        aria-label="Previous month"
        className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#DDDEDF] bg-white text-[#202F55] transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <ChevronLeft />
      </button>

      <button
        type="button"
        onClick={onNext}
        disabled={disabled}
        aria-label="Next month"
        className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#DDDEDF] bg-white text-[#202F55] transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <ChevronRight />
      </button>
    </div>
  )
}

export default MonthPager

function ChevronLeft() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        d="M14 6L8 12L14 18"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function ChevronRight() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        d="M10 6L16 12L10 18"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
