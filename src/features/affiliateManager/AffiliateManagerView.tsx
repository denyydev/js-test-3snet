import HeaderTop from './components/HeaderTop'
import HeaderNav from './components/HeaderNav'
import Tabs from './components/Tabs'
import MonthPager from './components/MonthPager'
import AffiliateTable from './components/AffiliateTable'

function AffiliateManagerView() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeaderTop />
      <HeaderNav />
      <main className="flex-1 p-6">
        <Tabs />
        <MonthPager />
        <AffiliateTable />
      </main>
    </div>
  )
}

export default AffiliateManagerView

