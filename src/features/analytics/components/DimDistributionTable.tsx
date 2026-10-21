import type { DimDistributionItem } from "../types";
import { formatNumber } from "../utils";
import AnalyticsPanel from "./AnalyticsPanel";

interface DimDistributionTableProps {
  data: DimDistributionItem[];
  formatMilk: (value: number | null) => string;
}

export default function DimDistributionTable({
  data,
  formatMilk,
}: DimDistributionTableProps) {
  return (
    <AnalyticsPanel
      title="گزارش توزیع بر اساس DIM"
      description="درصدها بر اساس دام‌هایی محاسبه می‌شوند که مقدار DIM معتبر دارند."
    >
      <div className="overflow-x-auto">
        <table className="w-full min-w-[540px] text-right text-xs">
          <thead>
            <tr className="border-b border-[var(--panel-border)] text-[var(--text-muted)]">
              <th className="px-3 py-3 font-semibold">بازه DIM</th>
              <th className="px-3 py-3 font-semibold">تعداد دام</th>
              <th className="px-3 py-3 font-semibold">درصد</th>
              <th className="px-3 py-3 font-semibold">میانگین شیر</th>
            </tr>
          </thead>

          <tbody>
            {data.map((item) => (
              <tr
                key={item.label}
                className="border-b border-[var(--panel-border)] last:border-0"
              >
                <td className="px-3 py-4 font-semibold text-[var(--text-main)]">
                  {item.label}
                </td>

                <td className="px-3 py-4 text-[var(--text-main)]">
                  {formatNumber(item.count)}
                </td>

                <td className="px-3 py-4">
                  <div className="flex min-w-24 items-center gap-2">
                    <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-[var(--bg-secondary)]">
                      <div
                        className="h-full rounded-full bg-[var(--accent-green)]"
                        style={{
                          width: `${Math.min(100, Math.max(0, item.percentage))}%`,
                        }}
                      />
                    </div>

                    <span className="tabular-nums text-[var(--text-muted)]">
                      {formatNumber(item.percentage)}٪
                    </span>
                  </div>
                </td>

                <td className="px-3 py-4 text-[var(--text-main)]">
                  {formatMilk(item.averageMilk)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {data.every((item) => item.count === 0) && (
        <p className="py-5 text-center text-xs text-[var(--text-muted)]">
          هنوز اطلاعات روزهای شیردهی ثبت نشده است.
        </p>
      )}
    </AnalyticsPanel>
  );
}