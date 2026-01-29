function HeaderTop() {
  return (
    <header 
      className="h-20 flex items-center justify-between px-6"
      style={{ 
        backgroundColor: 'var(--color-background-dark)',
        color: 'var(--color-text-white)'
      }}
    >
      <div className="flex items-center">
        <div 
          className="text-2xl font-medium"
          style={{ fontFamily: 'var(--font-family-display)' }}
        >
          Brand
        </div>
      </div>
      <nav className="flex items-center gap-6">
        <div className="text-base">Item 1</div>
        <div className="text-base">Item 2</div>
        <div className="text-base">Item 3</div>
      </nav>
      <div className="flex items-center gap-4">
        <div className="text-base">User</div>
        <div className="text-base">Status</div>
      </div>
    </header>
  )
}

export default HeaderTop

