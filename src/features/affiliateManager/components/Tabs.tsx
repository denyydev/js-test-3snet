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
      <div className="flex gap-10">
        {tabs.map((tab) => {
          const isActive = value === tab.key

          return (
            <button
              key={tab.key}
              type="button"
              role="tab"
              aria-selected={isActive}
              disabled={disabled}
              onClick={() => onChange(tab.key)}
              className={[
                'relative pb-2 text-[16px] font-medium tracking-[0.01em] transition-colors',
                'disabled:cursor-not-allowed disabled:opacity-50',
                isActive
                  ? 'text-[#202F55]'
                  : 'text-[#A6B1B9] hover:text-[#202F55]',
              ].join(' ')}
            >
              {tab.label}

              {isActive && (
                <span className="absolute left-0 -bottom-[3px] h-[3px] w-full bg-[#202F55]" />
              )}
            </button>
          )
        })}
      </div>

      <div className="mt-3 h-px w-full bg-[#D6E3EC]" />
    </div>
  )
}

export default Tabs
