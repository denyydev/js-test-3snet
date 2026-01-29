import HeaderTop from './components/HeaderTop'
import HeaderNav from './components/HeaderNav'
import Tabs from './components/Tabs'
import MonthPager from './components/MonthPager'
import AffiliateTable from './components/AffiliateTable'

function AffiliateManagerView() {
  return (
    <div>
      <HeaderTop />
      <HeaderNav />
      <Tabs />
      <MonthPager />
      <AffiliateTable />
    </div>
  )
}

export default AffiliateManagerView

