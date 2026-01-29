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

const cn = (...classes: Array<string | false | null | undefined>) =>
  classes.filter(Boolean).join(" ");

const GRID_TEMPLATE = "200px 180px repeat(6, 1fr) 48px";
const DIM_OPACITY = "opacity-[0.8]";
const FULL_OPACITY = "opacity-100";

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

function MonthBody({
  values,
  tab,
}: {
  values: { plan: Pair; fact: Pair };
  tab: TabKey;
}) {
  const showPlan = tab === "scheme" || tab === "plan";
  const showFact = tab === "scheme" || tab === "payment";

  const hasBoth = showPlan && showFact;
  const justifyClass = hasBoth ? "justify-between" : "justify-center";

  return (
    <>
      <div className={`flex items-center ${justifyClass} gap-2`}>
        {showPlan && <span>$ {values.plan.income}</span>}
        {showFact && <span>$ {values.fact.income}</span>}
        {!showPlan && !showFact && <span>-</span>}
      </div>
      <div className={`flex items-center ${justifyClass} gap-2`}>
        {showPlan && <span>{values.plan.activePartners}</span>}
        {showFact && <span>{values.fact.activePartners}</span>}
        {!showPlan && !showFact && <span>-</span>}
      </div>
    </>
  );
}

function AffiliateTable({
  data,
  visibleMonths,
  tab,
  loading = false,
  error = null,
  onRetry,
}: AffiliateTableProps) {
  const showPlan = tab === "scheme" || tab === "plan";
  const showFact = tab === "scheme" || tab === "payment";

  const rows = data?.table ?? [];

  const isValidVisibleMonths =
    visibleMonths.length === 6 && visibleMonths.every(isValidMonthIndex);

  const base = {
    border: "border border-[var(--color-border)]",
    b: "border-b border-b-[var(--color-border)]",
    l: "border-l border-l-[var(--color-border)]",
    bgHead: "bg-[var(--color-background-light)]",
    text: "text-[var(--color-text-primary)]",
    muted: "text-[var(--color-text-muted)]",
    secondary: "text-[var(--color-text-secondary)]",
  };

  const rowBorder = (rowIndex: number) =>
    rowIndex < rows.length - 1 ? base.b : "";

  const monthMeta = (colIndex: number, hasData: boolean) => {
    const dim = colIndex < 4 || !hasData;

    return {
      opacity: dim ? DIM_OPACITY : FULL_OPACITY,
      text: dim ? base.muted : base.text,
      weight: !dim && colIndex >= 4 ? "font-medium" : "",
    };
  };

  return (
    <div
      className={cn("overflow-hidden", base.border)}
      style={{ display: "grid", gridTemplateColumns: GRID_TEMPLATE }}
    >
      <div className={cn("p-4", base.bgHead, base.b)} />
      <div className={cn("p-4", base.bgHead, base.b, base.l)} />

      {visibleMonths.map((monthIndex, colIndex) => {
        const dim = colIndex < 4;
        return (
          <div
            key={`h-month-${colIndex}`}
            className={cn(
              "p-4 font-medium",
              base.bgHead,
              base.b,
              base.l,
              "text-[length:var(--font-size-base)]",
              dim ? base.muted : base.text,
              dim ? DIM_OPACITY : FULL_OPACITY,
            )}
          >
            <div className="flex flex-col gap-2">
              <div>{getMonthLabel(monthIndex)}</div>
              <div
                className={`flex items-center ${showPlan && showFact ? "justify-between" : "justify-center"
                  } text-[length:var(--font-size-small)]`}
              >
                {showPlan && <span>Plan</span>}
                {showFact && <span>Fact</span>}
                {!showPlan && !showFact && <span>-</span>}
              </div>
            </div>
          </div>
        );
      })}

      <div className={cn("p-4", base.bgHead, base.b, base.l)} />

      <div
        className={cn(
          "p-4 font-medium",
          base.bgHead,
          base.b,
          base.text,
          "text-[length:var(--font-size-base)]",
        )}
      >
        Manager
      </div>

      <div
        className={cn(
          "p-4 font-medium",
          base.bgHead,
          base.b,
          base.l,
          base.text,
          "text-[length:var(--font-size-base)]",
        )}
      >
        <div className="flex flex-col gap-2">
          <div className="text-[length:var(--font-size-small)]">
            Total income:
          </div>
          <div className="pt-1 border-t border-t-[var(--color-border)]" />
          <div className="text-[length:var(--font-size-small)]">
            Total active partners:
          </div>
        </div>
      </div>

      {visibleMonths.map((monthIndex, colIndex) => {
        const totals = getTotalMonthPlanFact(data, monthIndex);
        const dim = colIndex < 4;
        return (
          <div
            key={`totals-${colIndex}`}
            className={cn(
              "p-4 flex flex-col justify-center gap-2",
              base.bgHead,
              base.b,
              base.l,
              "text-[length:var(--font-size-small)]",
              dim ? base.muted : base.text,
              dim ? DIM_OPACITY : FULL_OPACITY,
              !dim && colIndex >= 4 && "font-medium",
            )}
          >
            <MonthBody values={totals} tab={tab} />
          </div>
        );
      })}

      <div className={cn("p-4", base.bgHead, base.b, base.l)} />

      {loading ? (
        <div
          className={cn(
            "p-8 col-span-9 flex items-center justify-center",
            base.secondary,
            "text-[length:var(--font-size-base)]",
            "border-t border-t-[var(--color-border)]",
          )}
        >
          Loading...
        </div>
      ) : error ? (
        <div
          className={cn(
            "p-8 col-span-9 flex flex-col items-center justify-center gap-4",
            base.text,
            "text-[length:var(--font-size-base)]",
            "border-t border-t-[var(--color-border)]",
          )}
        >
          <div>Error: {error}</div>
          {onRetry ? (
            <button
              type="button"
              onClick={onRetry}
              className={cn(
                "px-4 py-2 rounded-lg transition-opacity hover:opacity-90",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
                "bg-[var(--color-primary)] text-[var(--color-text-white)]",
                "text-[length:var(--font-size-base)] leading-[var(--line-height-base)] font-medium",
              )}
            >
              Retry
            </button>
          ) : null}
        </div>
      ) : !isValidVisibleMonths ? (
        <div
          className={cn(
            "p-4 col-span-9",
            base.text,
            "text-[length:var(--font-size-base)]",
            "border-t border-t-[var(--color-border)]",
          )}
        >
          Invalid month window
        </div>
      ) : rows.length === 0 ? (
        <div
          className={cn(
            "p-8 col-span-9 flex items-center justify-center",
            base.secondary,
            "text-[length:var(--font-size-base)]",
            "border-t border-t-[var(--color-border)]",
          )}
        >
          No rows
        </div>
      ) : (
        rows.map((row, rowIndex) => (
          <div key={`row-${rowIndex}`} style={{ display: "contents" }}>
            <div
              className={cn(
                "p-4 flex items-center",
                base.text,
                "text-[length:var(--font-size-base)]",
                rowBorder(rowIndex),
              )}
            >
              {row.adminName}
            </div>

            <div
              className={cn(
                "p-4 flex flex-col justify-center gap-2 opacity-50",
                base.text,
                "text-[length:var(--font-size-small)]",
                base.l,
                rowBorder(rowIndex),
              )}
            >
              <div>Income:</div>
              <div className="pt-1 border-t border-t-[var(--color-border)]" />
              <div>Active partners</div>
            </div>

            {visibleMonths.map((monthIndex, colIndex) => {
              const values = getPlanFactValues(row.months?.[monthIndex]);
              const m = monthMeta(colIndex, Boolean(values));

              return (
                <div
                  key={`month-${rowIndex}-${colIndex}`}
                  className={cn(
                    "p-4 flex flex-col justify-center gap-1",
                    "text-[length:var(--font-size-small)]",
                    base.l,
                    rowBorder(rowIndex),
                    m.text,
                    m.opacity,
                    m.weight,
                  )}
                >
                  {values ? (
                    <MonthBody values={values} tab={tab} />
                  ) : (
                    <div>No data</div>
                  )}
                </div>
              );
            })}

            <div
              className={cn(
                "p-4 flex items-center justify-center",
                base.l,
                rowBorder(rowIndex),
                base.secondary,
                "text-[length:var(--font-size-base)]",
              )}
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
