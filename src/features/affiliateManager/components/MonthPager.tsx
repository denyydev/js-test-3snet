type MonthPagerProps = {
  onPrev: () => void
  onNext: () => void
  disabled?: boolean
}

function MonthPager({ onPrev, onNext, disabled = false }: MonthPagerProps) {
  return (
    <div className="flex justify-end gap-2 mb-4">
      <button
        type="button"
        onClick={onPrev}
        disabled={disabled}
        aria-label="Previous month"
        className="p-2 rounded transition-opacity hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        style={{
          color: 'var(--color-text-primary)',
          fontSize: 'var(--font-size-base)',
          borderRadius: 'var(--border-radius-small)',
        }}
      >
        ←
      </button>
      <button
        type="button"
        onClick={onNext}
        disabled={disabled}
        aria-label="Next month"
        className="p-2 rounded transition-opacity hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        style={{
          color: 'var(--color-text-primary)',
          fontSize: 'var(--font-size-base)',
          borderRadius: 'var(--border-radius-small)',
        }}
      >
        →
      </button>
    </div>
  )
}

export default MonthPager
