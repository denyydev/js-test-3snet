import type { AffiliateDataResponse, MonthEntry } from "../../../types/api";
import { getMonthLabel } from "../../../utils/months";
import type { TabKey } from "./Tabs";

type AffiliateTableProps = {
  data: AffiliateDataResponse["data"] | null;
  visibleMonths: number[];
  tab: TabKey;
  loading?: boolean;
  error?: string | null;
  onRetry?: () => void;
};

type Pair = { income: number; activePartners: number };
type PlanFact = { plan: Pair; fact: Pair } | null;

const GRID_TEMPLATE = "180px 160px repeat(6, 160px) 68px";

const DIM_OPACITY = "opacity-[0.8]";
const FULL_OPACITY = "opacity-100";

const BORDER = "border border-[var(--color-border)]";
const B = "border-b border-b-[var(--color-border)]";
const L = "border-l border-l-[var(--color-border)]";

const BG_HEAD = "bg-[var(--color-background-light)]";
const TEXT = "text-[var(--color-text-primary)]";
const MUTED = "text-[var(--color-text-muted)]";
const SECONDARY = "text-[var(--color-text-secondary)]";

const TEXT_BASE = "text-[length:var(--font-size-base)]";
const TEXT_SMALL = "text-[length:var(--font-size-small)]";

const TOP_BORDER = "border-t border-t-[var(--color-border)]";
const DIVIDER_FULL = "-mx-4 border-t border-t-[var(--color-border)]";

const isValidMonthIndex = (index: number) =>
  Number.isInteger(index) && index >= 0 && index <= 11;

function getPlanFactValues(entry: MonthEntry | null | undefined): PlanFact {
  if (!entry) return null;

  return {
    plan: {
      income: entry.plan?.income ?? 0,
      activePartners: entry.plan?.activePartners ?? 0,
    },
    fact: {
      income: entry.fact?.income ?? 0,
      activePartners: entry.fact?.activePartners ?? 0,
    },
  };
}

function getTotalMonthPlanFact(
  data: AffiliateDataResponse["data"] | null,
  monthIndex: number,
): { plan: Pair; fact: Pair } {
  const t = data?.total?.[monthIndex];
  return {
    plan: {
      income: t?.plan?.income ?? 0,
      activePartners: t?.plan?.activePartners ?? 0,
    },
    fact: {
      income: t?.fact?.income ?? 0,
      activePartners: t?.fact?.activePartners ?? 0,
    },
  };
}

function MonthBody({ values }: { values: { plan: Pair; fact: Pair } }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span>$ {values.plan.income}</span>
        <span>$ {values.fact.income}</span>
      </div>
      <div className="flex items-center justify-between">
        <span>{values.plan.activePartners}</span>
        <span>{values.fact.activePartners}</span>
      </div>
    </div>
  );
}

function AffiliateTable({
  data,
  visibleMonths,
  loading = false,
  error = null,
  onRetry,
}: AffiliateTableProps) {
  const rows = data?.table ?? [];

  const isValidVisibleMonths =
    visibleMonths.length === 6 && visibleMonths.every(isValidMonthIndex);

  const rowBorder = (rowIndex: number) => (rowIndex < rows.length - 1 ? B : "");

  const monthMeta = (colIndex: number, hasData: boolean) => {
    const dim = colIndex < 4 || !hasData;

    return {
      opacity: dim ? DIM_OPACITY : FULL_OPACITY,
      text: dim ? MUTED : TEXT,
      weight: !dim && colIndex >= 4 ? "font-medium" : "",
    };
  };

  return (
    <div
      className={`overflow-hidden ${BORDER}`}
      style={{ display: "grid", gridTemplateColumns: GRID_TEMPLATE }}
    >
      <div className={`p-4 ${BG_HEAD} ${B}`} />
      <div className={`p-4 ${BG_HEAD} ${B} ${L}`} />

      {visibleMonths.map((monthIndex, colIndex) => {
        const dim = colIndex < 4;

        return (
          <div
            key={`h-month-${colIndex}`}
            className={`p-4 font-medium ${BG_HEAD} ${B} ${L} ${TEXT_BASE} ${
              dim ? MUTED : TEXT
            } ${dim ? DIM_OPACITY : FULL_OPACITY}`}
          >
            <div className="flex flex-col gap-2">
              <div>{getMonthLabel(monthIndex)}</div>
              <div
                className={`flex items-center justify-between ${TEXT_SMALL}`}
              >
                <span>Plan</span>
                <span>Fact</span>
              </div>
            </div>
          </div>
        );
      })}

      <div className={`p-4 ${BG_HEAD} ${B} ${L}`} />

      <div className={`p-8 flex items-center text-sm ${BG_HEAD} ${B} ${TEXT}`}>
        Manager
      </div>

      <div
        className={`p-4 font-medium ${BG_HEAD} ${B} ${L} ${TEXT} ${TEXT_BASE}`}
      >
        <div className="flex flex-col gap-2">
          <div className={TEXT_SMALL}>Total income:</div>
          <div className={DIVIDER_FULL} />
          <div className={TEXT_SMALL}>Total active partners:</div>
        </div>
      </div>

      {visibleMonths.map((monthIndex, colIndex) => {
        const totals = getTotalMonthPlanFact(data, monthIndex);
        const dim = colIndex < 4;

        return (
          <div
            key={`totals-${colIndex}`}
            className={`p-4 flex flex-col justify-center ${BG_HEAD} ${B} ${L} ${TEXT_SMALL} ${
              dim ? MUTED : TEXT
            } ${dim ? DIM_OPACITY : FULL_OPACITY} ${
              !dim && colIndex >= 4 ? "font-medium" : ""
            }`}
          >
            <MonthBody values={totals} />
          </div>
        );
      })}

      <div className={`p-4 ${BG_HEAD} ${B} ${L}`} />

      {loading ? (
        <div
          className={`p-8 col-span-9 flex items-center justify-center ${SECONDARY} ${TEXT_BASE} ${TOP_BORDER}`}
        >
          Loading...
        </div>
      ) : error ? (
        <div
          className={`p-8 col-span-9 flex flex-col items-center justify-center gap-4 ${TEXT} ${TEXT_BASE} ${TOP_BORDER}`}
        >
          <div>Error: {error}</div>
          {onRetry ? (
            <button
              type="button"
              onClick={onRetry}
              className={`px-4 py-2 rounded-lg transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 bg-[var(--color-primary)] text-[var(--color-text-white)] ${TEXT_BASE} leading-[var(--line-height-base)] font-medium`}
            >
              Retry
            </button>
          ) : null}
        </div>
      ) : !isValidVisibleMonths ? (
        <div className={`p-4 col-span-9 ${TEXT} ${TEXT_BASE} ${TOP_BORDER}`}>
          Invalid month window
        </div>
      ) : rows.length === 0 ? (
        <div
          className={`p-8 col-span-9 flex items-center justify-center ${SECONDARY} ${TEXT_BASE} ${TOP_BORDER}`}
        >
          No rows
        </div>
      ) : (
        rows.map((row, rowIndex) => (
          <div key={`row-${rowIndex}`} style={{ display: "contents" }}>
            <div
              className={`p-8 flex font-medium items-center  ${TEXT} ${TEXT_BASE} ${rowBorder(
                rowIndex,
              )}`}
            >
              {row.adminName}
            </div>

            <div
              className={`p-4 flex flex-col justify-center gap-2 opacity-50 ${TEXT} ${TEXT_SMALL} ${L} ${rowBorder(
                rowIndex,
              )}`}
            >
              <div>Income:</div>
              <div className={DIVIDER_FULL} />
              <div>Active partners:</div>
            </div>

            {visibleMonths.map((monthIndex, colIndex) => {
              const values = getPlanFactValues(row.months?.[monthIndex]);
              const m = monthMeta(colIndex, Boolean(values));

              return (
                <div
                  key={`month-${rowIndex}-${colIndex}`}
                  className={`p-4 flex flex-col justify-center ${TEXT_SMALL} ${L} ${rowBorder(
                    rowIndex,
                  )} ${m.text} ${m.opacity} ${m.weight}`}
                >
                  {values ? (
                    <MonthBody values={values} />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      No data
                    </div>
                  )}
                </div>
              );
            })}

            <div
              className={`p-4 flex items-center justify-center ${L} ${rowBorder(
                rowIndex,
              )} ${SECONDARY} ${TEXT_BASE}`}
            >
              ...
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default AffiliateTable;
