import type { Cow } from "@/types/herd/herd";
import { useHerdTable } from "./hooks/useHerdTable";
import CowAvatar from "./components/CowAvatar";
import HealthBadge from "./components/HealthBadge";
import TreatmentBadge from "./components/TreatmentBadge";
import EmptyState from "./components/EmptyState";
import CowMobileCard from "./components/CowMobileCard";
import {
  COLUMN_WIDTHS,
  herdTableConfig,
} from "@/data/constants/herdPage/herdTable.config";
import { herdTableColumns } from "@/data/constants/herdPage/herdTable";

interface HerdTableProps {
  cows: Cow[];
}

export default function HerdTable({ cows }: HerdTableProps) {
  const { rows, rowCountLabel, isEmpty } = useHerdTable(cows);

  if (isEmpty) {
    return (
      <div className="overflow-hidden rounded-[var(--radius-lg)] border border-[var(--panel-border)] bg-[var(--panel-bg)]">
        <EmptyState />
      </div>
    );
  }

  return (
    <div className="min-w-0">
      {/* Mobile & Tablet */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:hidden">
        {rows.map((row) => (
          <CowMobileCard
            key={row.cow.id}
            cow={row.cow}
            row={row}
          />
        ))}
      </div>

      {/* Desktop */}
      <div className="hidden overflow-hidden rounded-[var(--radius-lg)] border border-[var(--panel-border)] bg-[var(--panel-bg)] shadow-[var(--shadow-sm)] lg:block">
        <table className="w-full table-fixed text-center text-sm">
          <colgroup>
            {COLUMN_WIDTHS.map((width, i) => (
              <col key={i} className={width} />
            ))}
          </colgroup>

          <thead>
            <tr className="border-b border-[var(--border)] bg-[var(--bg-secondary)] text-[var(--text-muted)]">
              {herdTableColumns.map((column) => (
                <th
                  key={column.key}
                  scope="col"
                  className="truncate px-3 py-4 font-semibold first:ps-5 last:pe-5 first:text-start"
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-[var(--border)]">
            {rows.map((row) => {
              const { cow } = row;

              return (
                <tr
                  key={cow.id}
                  className="transition-colors duration-150 hover:bg-[var(--bg-secondary)]"
                >
                  <td className="px-3 py-4 first:ps-5 first:text-start">
                    <div className="flex items-center gap-3">
                      <div className="w-full max-w-10 shrink-0">
                        <CowAvatar cow={cow} />
                      </div>

                      <div className="min-w-0">
                        <p className="truncate font-bold text-[var(--text-main)]">
                          {cow.name}
                        </p>

                        <p className="mt-1 truncate text-[0.6875rem] text-[var(--text-light)]">
                          شناسه: {row.shortId}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="truncate whitespace-nowrap px-3 py-4 text-center font-semibold tabular-nums text-[var(--text-muted)]">
                    {row.earTagLabel}
                  </td>

                  <td className="truncate whitespace-nowrap px-3 py-4 text-center text-[var(--text-muted)]">
                    {row.genderLabel}
                    <span className="mx-1.5 text-[var(--text-light)]">/</span>
                    {row.ageLabel}
                  </td>

                  <td className="truncate whitespace-nowrap px-3 py-4 text-center tabular-nums text-[var(--text-muted)]">
                    {row.daysInMilkLabel}
                  </td>

                  <td className="truncate whitespace-nowrap px-3 py-4 text-center font-bold tabular-nums text-[var(--accent-green)]">
                    {row.dailyMilkLabel}
                  </td>

                  <td className="truncate whitespace-nowrap px-3 py-4 text-center tabular-nums text-[var(--text-muted)]">
                    {row.bodyConditionScoreLabel}
                  </td>

                  <td className="px-3 py-4 text-center">
                    <TreatmentBadge hasTreatment={cow.hasTreatment} />
                  </td>

                  <td className="px-3 py-4 text-center last:pe-5">
                    <HealthBadge status={cow.healthStatus} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <div className="flex items-center justify-between border-t border-[var(--border)] bg-[var(--surface-warm)] px-5 py-3">
          <span className="text-xs text-[var(--text-muted)]">
            {herdTableConfig.rowCountLabel}
          </span>

          <span className="rounded-[var(--radius-sm)] bg-[var(--green-soft)] px-2.5 py-1 text-xs font-bold text-[var(--accent-green)]">
            {rowCountLabel} {herdTableConfig.rowCountSuffix}
          </span>
        </div>
      </div>
    </div>
  );
}