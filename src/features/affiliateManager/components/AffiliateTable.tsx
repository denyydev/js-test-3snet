import type { AffiliateDataResponse } from '../../../types/api'
import type { TabKey } from './Tabs'
import type { TableRow, MonthEntry } from '../../../types/api'
import { getMonthLabel } from '../../../utils/months'

type AffiliateTableProps = {
  data: AffiliateDataResponse['data'] | null
  visibleMonths: number[]
  tab: TabKey
  loading?: boolean
  error?: string | null
  onRetry?: () => void
}

function getTabValues(entry: MonthEntry, tab: TabKey): { income: number; activePartners: number } | null {
  if (entry === null || entry === undefined) {
    return null
  }

  switch (tab) {
    case 'scheme':
      return {
        income: entry.income,
        activePartners: entry.activePartners,
      }
    case 'plan':
      return {
        income: entry.plan.income,
        activePartners: entry.plan.activePartners,
      }
    case 'payment':
      return {
        income: entry.fact.income,
        activePartners: entry.fact.activePartners,
      }
  }
}

function renderMonthCell(row: TableRow, monthIndex: number, tab: TabKey) {
  const entry = row.months?.[monthIndex] ?? null
  const values = getTabValues(entry, tab)

  if (values === null) {
    return (
      <>
        <div>No data</div>
        <div></div>
      </>
    )
  }

  return (
    <>
      <div>{values.income}</div>
      <div>{values.activePartners}</div>
    </>
  )
}

function calculateRowTotal(row: TableRow, tab: TabKey) {
  const totals = row.months.reduce(
    (acc, entry) => {
      const values = getTabValues(entry, tab)
      if (values !== null) {
        acc.income += values.income
        acc.activePartners += values.activePartners
      }
      return acc
    },
    { income: 0, activePartners: 0 }
  )
  return totals
}

function AffiliateTable({
  data,
  visibleMonths,
  tab,
  loading = false,
  error = null,
  onRetry,
}: AffiliateTableProps) {
  const rows = data?.table || []

  const isValidMonthIndex = (index: number): boolean => {
    return Number.isInteger(index) && index >= 0 && index <= 11
  }

  const isValidVisibleMonths =
    visibleMonths.length === 6 &&
    visibleMonths.every(isValidMonthIndex)

  return (
    <div
      className="border rounded-lg overflow-hidden"
      style={{
        borderColor: 'var(--color-border)',
        display: 'grid',
        gridTemplateColumns: '200px 180px repeat(6, 1fr)',
      }}
    >
      <div
        className="p-4 font-medium"
        style={{
          backgroundColor: 'var(--color-background-light)',
          color: 'var(--color-text-primary)',
          fontSize: 'var(--font-size-base)',
          borderBottom: '1px solid var(--color-border)',
        }}
      >
        Manager
      </div>
      <div
        className="p-4 font-medium"
        style={{
          backgroundColor: 'var(--color-background-light)',
          color: 'var(--color-text-primary)',
          fontSize: 'var(--font-size-base)',
          borderBottom: '1px solid var(--color-border)',
          borderLeft: '1px solid var(--color-border)',
        }}
      >
        <div className="flex flex-col gap-2">
          <div style={{ fontSize: 'var(--font-size-small)' }}>Total income</div>
          <div
            style={{
              borderTop: '1px solid var(--color-border)',
              paddingTop: '4px',
            }}
          />
          <div style={{ fontSize: 'var(--font-size-small)' }}>
            Total active partners
          </div>
        </div>
      </div>
      {visibleMonths.map((monthIndex, i) => (
        <div
          key={i}
          className="p-4 font-medium"
          style={{
            backgroundColor: 'var(--color-background-light)',
            color: 'var(--color-text-primary)',
            fontSize: 'var(--font-size-base)',
            borderBottom: '1px solid var(--color-border)',
            borderLeft: '1px solid var(--color-border)',
          }}
        >
          {getMonthLabel(monthIndex)}
        </div>
      ))}

      {loading ? (
        <div
          className="p-8 col-span-8 flex items-center justify-center"
          style={{
            color: 'var(--color-text-secondary)',
            fontSize: 'var(--font-size-base)',
            borderTop: '1px solid var(--color-border)',
          }}
        >
          Loading...
        </div>
      ) : error ? (
        <div
          className="p-8 col-span-8 flex flex-col items-center justify-center gap-4"
          style={{
            color: 'var(--color-text-primary)',
            fontSize: 'var(--font-size-base)',
            borderTop: '1px solid var(--color-border)',
          }}
        >
          <div>Error: {error}</div>
          {onRetry && (
            <button
              type="button"
              onClick={onRetry}
              className="px-4 py-2 rounded-lg transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
              style={{
                backgroundColor: 'var(--color-primary)',
                color: 'var(--color-text-white)',
                borderRadius: 'var(--border-radius-large)',
                fontSize: 'var(--font-size-base)',
                lineHeight: 'var(--line-height-base)',
                fontWeight: 'var(--font-weight-medium)',
              }}
            >
              Retry
            </button>
          )}
        </div>
      ) : !isValidVisibleMonths ? (
        <div
          className="p-4 col-span-8"
          style={{
            color: 'var(--color-text-primary)',
            fontSize: 'var(--font-size-base)',
            borderTop: '1px solid var(--color-border)',
          }}
        >
          Invalid month window
        </div>
      ) : rows.length === 0 ? (
        <div
          className="p-8 col-span-8 flex items-center justify-center"
          style={{
            color: 'var(--color-text-secondary)',
            fontSize: 'var(--font-size-base)',
            borderTop: '1px solid var(--color-border)',
          }}
        >
          No rows
        </div>
      ) : (
        rows.map((row, rowIndex) => {
          const rowTotal = calculateRowTotal(row, tab)
          return (
            <div key={`row-${rowIndex}`} style={{ display: 'contents' }}>
              <div
                className="p-4 flex items-center"
                style={{
                  color: 'var(--color-text-primary)',
                  fontSize: 'var(--font-size-base)',
                  borderBottom:
                    rowIndex < rows.length - 1
                      ? '1px solid var(--color-border)'
                      : 'none',
                }}
              >
                {row.adminName}
              </div>
              <div
                className="p-4 flex flex-col justify-center gap-2"
                style={{
                  color: 'var(--color-text-primary)',
                  fontSize: 'var(--font-size-small)',
                  borderLeft: '1px solid var(--color-border)',
                  borderBottom:
                    rowIndex < rows.length - 1
                      ? '1px solid var(--color-border)'
                      : 'none',
                }}
              >
                <div>{rowTotal.income}</div>
                <div
                  style={{
                    borderTop: '1px solid var(--color-border)',
                    paddingTop: '4px',
                  }}
                />
                <div>{rowTotal.activePartners}</div>
              </div>
              {visibleMonths.map((monthIndex, colIndex) => (
                <div
                  key={`month-${rowIndex}-${colIndex}`}
                  className="p-4 flex flex-col justify-center gap-1"
                  style={{
                    color: 'var(--color-text-primary)',
                    fontSize: 'var(--font-size-small)',
                    borderLeft: '1px solid var(--color-border)',
                    borderBottom:
                      rowIndex < rows.length - 1
                        ? '1px solid var(--color-border)'
                        : 'none',
                  }}
                >
                  {renderMonthCell(row, monthIndex, tab)}
                </div>
              ))}
            </div>
          )
        })
      )}
    </div>
  )
}

export default AffiliateTable
