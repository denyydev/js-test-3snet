import { useEffect, useState } from "react";
import { fetchAffiliateManagerData } from "../../api/affiliateManager";
import type { AffiliateDataResponse } from "../../types/api";
import {
  getCurrentMonthIndex,
  getMonthWindow,
  shiftMonthIndex,
} from "../../utils/months";
import AffiliateTable from "./components/AffiliateTable";
import HeaderNav from "./components/HeaderNav";
import HeaderTop from "./components/HeaderTop";
import MonthPager from "./components/MonthPager";
import Tabs, { type TabKey } from "./components/Tabs";

function AffiliateManagerView() {
  const [activeTab, setActiveTab] = useState<TabKey>("scheme");
  const [data, setData] = useState<AffiliateDataResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [startMonthIndex, setStartMonthIndex] = useState(getCurrentMonthIndex);

  const visibleMonths = getMonthWindow(startMonthIndex, 6);

  const loadData = () => {
    setLoading(true);
    setError(null);
    fetchAffiliateManagerData()
      .then((response) => {
        setData(response);
        setLoading(false);
      })
      .catch((err) => {
        setError(err instanceof Error ? err.message : "Failed to load data");
        setLoading(false);
      });
  };

  useEffect(() => {
    let cancelled = false;
    
    fetchAffiliateManagerData()
      .then((response) => {
        if (!cancelled) {
          setData(response);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Failed to load data");
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="flex flex-col">
      <HeaderTop />
      <HeaderNav />
      <main className="flex-1 py-6 max-w-6xl mx-auto w-full">
        <div className="flex items-center justify-between mb-6">
          <h1
            className="text-2xl font-medium"
            style={{
              color: "var(--color-text-primary)",
              fontSize: "var(--font-size-heading)",
              lineHeight: "var(--line-height-heading)",
              fontWeight: "var(--font-weight-medium)",
            }}
          >
            Affiliate manager
          </h1>
        </div>
        <Tabs value={activeTab} onChange={setActiveTab} />
        <div className="flex items-center justify-between pb-5">
          <button
            type="button"
            className="flex h-10 w-[130px] items-center justify-between rounded-md border border-[#D6E3EC] bg-white px-3 text-[16px] font-medium text-[#4F669D]"
          >
            Year 2025
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M4 6L8 10L12 6"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <div className="flex items-center gap-4">
            <MonthPager
              onPrev={() =>
                setStartMonthIndex((prev) => shiftMonthIndex(prev, -1))
              }
              onNext={() =>
                setStartMonthIndex((prev) => shiftMonthIndex(prev, 1))
              }
              disabled={loading || error !== null}
            />

            <button
              type="button"
              className="cursor-pointer flex h-10 items-center gap-2 rounded-md bg-[#202F55] px-4 text-[16px] font-medium text-white transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
            >
              <span className="text-[20px] leading-none text-[#D6E3EC]">+</span>
              Add plan
            </button>
          </div>
        </div>

        <AffiliateTable
          data={data?.data ?? null}
          visibleMonths={visibleMonths}
          tab={activeTab}
          loading={loading}
          error={error}
          onRetry={loadData}
        />
      </main>
    </div>
  );
}

export default AffiliateManagerView;
