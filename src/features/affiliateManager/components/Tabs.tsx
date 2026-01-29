export type TabKey = 'scheme' | 'plan' | 'payment'

type TabsProps = {
  value: TabKey
  onChange: (value: TabKey) => void
  disabled?: boolean
}

function Tabs({ value, onChange, disabled = false }: TabsProps) {
  const tabs: { key: TabKey; label: string }[] = [
    { key: 'scheme', label: 'Scheme' },
    { key: 'plan', label: 'Plan' },
    { key: 'payment', label: 'Payment' },
  ]

  return (
    <div className="mb-6">
      <div className="flex gap-8">
        {tabs.map((tab) => {
          const isActive = value === tab.key
          return (
            <button
              key={tab.key}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-current={isActive ? 'page' : undefined}
              aria-disabled={disabled}
              onClick={() => !disabled && onChange(tab.key)}
              disabled={disabled}
              className="pb-3 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                color: isActive
                  ? 'var(--color-text-primary)'
                  : 'var(--color-text-muted)',
                fontSize: 'var(--font-size-base)',
                lineHeight: 'var(--line-height-base)',
                fontWeight: isActive
                  ? 'var(--font-weight-medium)'
                  : 'var(--font-weight-normal)',
                borderBottom: isActive ? '3px solid var(--color-primary)' : '3px solid transparent',
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.color = 'var(--color-text-primary)'
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.color = 'var(--color-text-muted)'
                }
              }}
            >
              {tab.label}
            </button>
          )
        })}
      </div>
      <div
        className="mt-3"
        style={{
          borderBottom: '1px solid var(--color-border)',
        }}
      />
    </div>
  )
}

export default Tabs
