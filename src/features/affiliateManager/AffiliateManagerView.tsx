import { useState } from 'react'
import HeaderTop from './components/HeaderTop'
import HeaderNav from './components/HeaderNav'
import Tabs, { type TabKey } from './components/Tabs'
import MonthPager from './components/MonthPager'
import AffiliateTable from './components/AffiliateTable'

function AffiliateManagerView() {
  const [activeTab, setActiveTab] = useState<TabKey>('scheme')

  return (
    <div className="flex flex-col min-h-screen">
      <HeaderTop />
      <HeaderNav />
      <main className="flex-1 p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 
            className="text-2xl font-medium"
            style={{ 
              color: 'var(--color-text-primary)',
              fontSize: 'var(--font-size-heading)',
              lineHeight: 'var(--line-height-heading)',
              fontWeight: 'var(--font-weight-medium)'
            }}
          >
            Affiliate manager
          </h1>
          <button
            type="button"
            className="px-6 py-2 rounded-lg transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
            style={{
              backgroundColor: 'var(--color-primary)',
              color: 'var(--color-text-white)',
              borderRadius: 'var(--border-radius-large)',
              fontSize: 'var(--font-size-base)',
              lineHeight: 'var(--line-height-base)',
              fontWeight: 'var(--font-weight-medium)'
            }}
          >
            Add plan
          </button>
        </div>
        <Tabs value={activeTab} onChange={setActiveTab} />
        <MonthPager />
        <AffiliateTable />
      </main>
    </div>
  )
}

export default AffiliateManagerView

