import type { AffiliateDataResponse } from '../../../types/api'
import { getMonthLabel } from '../../../utils/months'

type AffiliateTableProps = {
  data: AffiliateDataResponse | null
  visibleMonths: number[]
}

function AffiliateTable({ data, visibleMonths }: AffiliateTableProps) {
  const managers = data?.data.table.map((row) => row.manager) || [
    'Manager 1',
    'Manager 2',
    'Manager 3',
    'Manager 4',
  ]

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

      {managers.map((manager, rowIndex) => (
        <div key={`row-${rowIndex}`} style={{ display: 'contents' }}>
          <div
            className="p-4 flex items-center"
            style={{
              color: 'var(--color-text-primary)',
              fontSize: 'var(--font-size-base)',
              borderBottom:
                rowIndex < managers.length - 1
                  ? '1px solid var(--color-border)'
                  : 'none',
            }}
          >
            {manager}
          </div>
          <div
            className="p-4 flex flex-col justify-center gap-2"
            style={{
              color: 'var(--color-text-primary)',
              fontSize: 'var(--font-size-small)',
              borderLeft: '1px solid var(--color-border)',
              borderBottom:
                rowIndex < managers.length - 1
                  ? '1px solid var(--color-border)'
                  : 'none',
            }}
          >
            <div>Value 1</div>
            <div
              style={{
                borderTop: '1px solid var(--color-border)',
                paddingTop: '4px',
              }}
            />
            <div>Value 2</div>
          </div>
          {Array.from({ length: 6 }, (_, colIndex) => (
            <div
              key={`month-${rowIndex}-${colIndex}`}
              className="p-4 flex flex-col justify-center gap-1"
              style={{
                color: 'var(--color-text-primary)',
                fontSize: 'var(--font-size-small)',
                borderLeft: '1px solid var(--color-border)',
                borderBottom:
                  rowIndex < managers.length - 1
                    ? '1px solid var(--color-border)'
                    : 'none',
              }}
            >
              <div>Top</div>
              <div>Bottom</div>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

export default AffiliateTable
