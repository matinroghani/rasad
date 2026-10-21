import { Milk } from "lucide-react";
import type { Cow } from "@/features/herd/types";
import { formatNumber } from "../utils";
import AnalyticsPanel from "./AnalyticsPanel";

interface MilkRankingTableProps {
  data: Cow[];
}

export default function MilkRankingTable({
  data,
}: MilkRankingTableProps) {
  return (
    <AnalyticsPanel
      title="۱۰ دام برتر تولید شیر"
      description="رتبه‌بندی بر اساس مقدار شیر روزانه ثبت‌شده؛ دام‌های بدون اطلاعات شیر در رتبه‌بندی قرار نمی‌گیرند."
    >
      {data.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[480px] text-right text-xs">
            <thead>
              <tr className="border-b border-[var(--panel-border)] text-[var(--text-muted)]">
                <th className="px-3 py-3 font-semibold">رتبه</th>
                <th className="px-3 py-3 font-semibold">شماره گوش</th>
                <th className="px-3 py-3 font-semibold">شیر روزانه</th>
                <th className="px-3 py-3 font-semibold">DIM</th>
              </tr>
            </thead>

            <tbody>
              {data.map((cow, index) => (
                <tr
                  key={cow.id}
                  className="border-b border-[var(--panel-border)] last:border-0"
                >
                  <td className="px-3 py-4">
                    <span className="flex size-7 items-center justify-center rounded-lg bg-[var(--green-soft)] font-bold text-[var(--accent-green)]">
                      {formatNumber(index + 1)}
                    </span>
                  </td>

                  <td className="px-3 py-4 font-semibold text-[var(--text-main)]">
                    {cow.earTag ?? "ثبت نشده"}
                  </td>

                  <td className="px-3 py-4 font-semibold tabular-nums text-[var(--text-main)]">
                    {formatNumber(cow.dailyMilk!)}
                  </td>

                  <td className="px-3 py-4 text-[var(--text-muted)]">
                    {cow.daysInMilk === null
                      ? "—"
                      : formatNumber(cow.daysInMilk)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="flex min-h-36 flex-col items-center justify-center gap-2 rounded-xl bg-[var(--surface-warm)] px-4 text-center">
          <Milk size={26} className="text-[var(--text-muted)]" />

          <p className="text-sm font-semibold text-[var(--text-main)]">
            اطلاعات تولید شیر موجود نیست
          </p>

          <p className="text-xs leading-6 text-[var(--text-muted)]">
            پس از ثبت مقادیر تولید شیر، رتبه‌بندی به‌صورت خودکار محاسبه می‌شود.
          </p>
        </div>
      )}
    </AnalyticsPanel>
  );
}