function HeaderNav() {
  return (
    <nav
      className="h-[67px] flex items-center px-6 border-b"
      style={{
        backgroundColor: 'var(--color-background-white)',
        borderColor: 'var(--color-border)'
      }}
    >
      <div className="flex items-center gap-8">
        <div
          className="text-base font-medium pb-1 border-b-2"
          style={{
            color: 'var(--color-text-primary)',
            borderColor: 'var(--color-primary)'
          }}
        >
          Active Item
        </div>
        <div
          className="text-base pb-1"
          style={{ color: 'var(--color-text-secondary)' }}
        >
          Item 1
        </div>
        <div
          className="text-base pb-1"
          style={{ color: 'var(--color-text-secondary)' }}
        >
          Item 2
        </div>
        <div
          className="text-base pb-1"
          style={{ color: 'var(--color-text-secondary)' }}
        >
          Item 3
        </div>
      </div>
    </nav>
  )
}

export default HeaderNav

