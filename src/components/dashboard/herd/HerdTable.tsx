import type { Cow } from "@/types/herd/herd";
import { useHerdTable } from "./hooks/useHerdTable";
import {
  Activity,
  CalendarDays,
  Camera,
  Droplets,
  HeartPulse,
  Image as ImageIcon,
  ScanSearch,
  Stethoscope,
  Tag,
} from "lucide-react";
import {
  COLUMN_WIDTHS,
  herdHealthConfig,
  herdTableConfig,
} from "@/data/constants/herdPage/herdTable.config";
import { herdTableColumns } from "@/data/constants/herdPage/herdTable";

interface HerdTableProps {
  cows: Cow[];
}

/* ------------------------------ Avatar ------------------------------ */

function CowAvatar({ cow }: { cow: Cow }) {
  return (
    <div className="aspect-square w-full max-w-11 shrink-0 overflow-hidden rounded-2xl">
      {cow.imageUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={cow.imageUrl}
          alt={`تصویر ${cow.name}`}
          loading="lazy"
          decoding="async"
          className="size-full object-cover"
        />
      ) : (
        <div
          className="grid size-full place-items-center border border-dashed border-[#d8e3d1] bg-[#f3f7ef] text-[#8da185]"
          aria-label={herdTableConfig.emptyImageLabel}
        >
          <ImageIcon className="size-[1.15em]" strokeWidth={1.6} />
        </div>
      )}
    </div>
  );
}

/* ---------------------------- Health Badge -------------------------- */

function HealthBadge({ status }: { status: Cow["healthStatus"] }) {
  const config = herdHealthConfig[status];

  return (
    <span
      className={`inline-flex items-center gap-[0.375em] whitespace-nowrap rounded-full border px-[0.6em] py-[0.35em] text-[0.6875rem] font-bold leading-none ${config.className}`}
    >
      <span
        className={`size-[0.375em] shrink-0 rounded-full ${config.dotClassName}`}
      />
      {config.label}
    </span>
  );
}

/* --------------------------- Treatment Badge ------------------------ */

function TreatmentBadge({ hasTreatment }: { hasTreatment: boolean }) {
  if (!hasTreatment) {
    return (
      <span className="text-xs text-[#9aa395]">
        {herdTableConfig.noTreatmentLabel}
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-[0.375em] whitespace-nowrap rounded-full border border-[#f0e2c8] bg-[#fff8ed] px-[0.6em] py-[0.35em] text-[0.6875rem] font-semibold leading-none text-[#a77834]">
      <Stethoscope className="size-[1.1em]" />
      سابقه درمان
    </span>
  );
}

/* ---------------------------- Empty State --------------------------- */

function EmptyState() {
  return (
    <div className="flex flex-col items-center px-5 py-14 text-center sm:py-20">
      <div className="relative flex aspect-square w-full max-w-[4.75rem] items-center justify-center rounded-3xl border border-[#e1eadb] bg-[#f2f7ed] text-[#659566]">
        <ScanSearch className="size-[45%]" strokeWidth={1.5} />

        <span className="absolute -end-1 -top-1 flex aspect-square w-[30%] items-center justify-center rounded-full border-2 border-white bg-[#dcebd4] text-[#5c8c5e]">
          <Camera className="size-[55%]" />
        </span>
      </div>

      <h3 className="mt-5 text-base font-extrabold text-[#354936]">
        {herdTableConfig.emptyTitle}
      </h3>

      <p className="mt-2 max-w-sm text-sm leading-7 text-[#899485]">
        {herdTableConfig.emptyDescription}
      </p>
    </div>
  );
}

/* --------------------------- Mobile Card ---------------------------- */

function CowMobileCard({ cow }: { cow: Cow }) {
  const { rows } = useHerdTable([cow]);
  const row = rows[0];

  return (
    <article className="rounded-2xl border border-[#e5eadf] bg-white p-4 shadow-xs">
      <div className="flex items-start gap-3">
        <div className="w-1/6 max-w-11 shrink-0">
          <CowAvatar cow={cow} />
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="truncate text-sm font-extrabold text-[#344735]">
            {cow.name}
          </h3>

          <p className="mt-1 flex items-center gap-[0.375em] text-xs text-[#899485]">
            <Tag className="size-[1.1em] shrink-0" />
            <span className="truncate">
              شماره گوش: {cow.earTag ?? herdTableConfig.noEarTagLabel}
            </span>
          </p>

          <div className="mt-2.5">
            <HealthBadge status={cow.healthStatus} />
          </div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2.5">
        <MetricCell
          icon={<Activity className="size-[1.15em]" />}
          label="جنسیت / سن"
          value={
            <>
              {row.genderLabel}
              <span className="mx-1 text-[#c0c8bb]">/</span>
              {row.ageLabel}
            </>
          }
        />

        <MetricCell
          icon={<CalendarDays className="size-[1.15em]" />}
          label="روزهای شیردهی (DIM)"
          value={row.daysInMilkLabel}
        />

        <MetricCell
          icon={<Droplets className="size-[1.15em]" />}
          label="شیر روزانه"
          value={row.dailyMilkLabel}
        />

        <MetricCell
          icon={<HeartPulse className="size-[1.15em]" />}
          label="امتیاز وضعیت بدنی"
          value={row.bodyConditionScoreLabel}
        />
      </div>

      <div className="mt-3 border-t border-[#edf0e9] pt-3">
        <TreatmentBadge hasTreatment={cow.hasTreatment} />
      </div>
    </article>
  );
}

function MetricCell({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="rounded-xl bg-[#f7f9f4] p-3">
      <p className="flex items-center gap-[0.375em] text-[0.6875rem] text-[#84907f]">
        {icon}
        <span className="truncate">{label}</span>
      </p>
      <p className="mt-2 text-xs font-bold text-[#425543]">{value}</p>
    </div>
  );
}

/* ------------------------------ Desktop ----------------------------- */

export default function HerdTable({ cows }: HerdTableProps) {
  const { rows, rowCountLabel, isEmpty } = useHerdTable(cows);

  if (isEmpty) {
    return (
      <div className="overflow-hidden rounded-2xl border border-[#e4e9df] bg-white">
        <EmptyState />
      </div>
    );
  }

  return (
    <div className="min-w-0">
      {/* -------------- Mobile & Tablet -------------- */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:hidden">
        {cows.map((cow) => (
          <CowMobileCard key={cow.id} cow={cow} />
        ))}
      </div>

      {/* ----------------- Desktop ------------------- */}
      <div className="hidden overflow-hidden rounded-2xl border border-[#e2e8dd] bg-white shadow-xs lg:block">
        <table className="w-full table-fixed text-start text-sm">
          <colgroup>
            {COLUMN_WIDTHS.map((width, i) => (
              <col key={i} className={width} />
            ))}
          </colgroup>

          <thead>
            <tr className="border-b border-[#e4eadd] bg-[#f5f8f1] text-[#788574]">
              {herdTableColumns.map((column) => (
                <th
                  key={column.key}
                  scope="col"
                  className="truncate px-3 py-4 font-semibold first:ps-5 last:pe-5"
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-[#edf0e9]">
            {rows.map((row) => {
              const { cow } = row;

              return (
                <tr
                  key={cow.id}
                  className="transition-colors duration-150 hover:bg-[#f8faf5]"
                >
                  <td className="px-3 py-4 first:ps-5">
                    <div className="flex items-center gap-3">
                      <div className="w-full max-w-10 shrink-0">
                        <CowAvatar cow={cow} />
                      </div>

                      <div className="min-w-0">
                        <p className="truncate font-bold text-[#354735]">
                          {cow.name}
                        </p>
                        <p className="mt-1 truncate text-[0.6875rem] text-[#98a193]">
                          شناسه: {row.shortId}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="truncate whitespace-nowrap px-3 py-4 font-semibold tabular-nums text-[#52634f]">
                    {row.earTagLabel}
                  </td>

                  <td className="truncate whitespace-nowrap px-3 py-4 text-[#596756]">
                    {row.genderLabel}
                    <span className="mx-1.5 text-[#c3cbbd]">/</span>
                    {row.ageLabel}
                  </td>

                  <td className="truncate whitespace-nowrap px-3 py-4 tabular-nums text-[#52634f]">
                    {row.daysInMilkLabel}
                  </td>

                  <td className="truncate whitespace-nowrap px-3 py-4 font-bold tabular-nums text-[#3d7547]">
                    {row.dailyMilkLabel}
                  </td>

                  <td className="truncate whitespace-nowrap px-3 py-4 tabular-nums text-[#52634f]">
                    {row.bodyConditionScoreLabel}
                  </td>

                  <td className="px-3 py-4">
                    <TreatmentBadge hasTreatment={cow.hasTreatment} />
                  </td>

                  <td className="px-3 py-4 last:pe-5">
                    <HealthBadge status={cow.healthStatus} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <div className="flex items-center justify-between border-t border-[#edf0e9] bg-[#fcfdfb] px-5 py-3">
          <span className="text-xs text-[#8a9585]">
            {herdTableConfig.rowCountLabel}
          </span>

          <span className="rounded-lg bg-[#edf5e9] px-2.5 py-1 text-xs font-bold text-[#4f8152]">
            {rowCountLabel} {herdTableConfig.rowCountSuffix}
          </span>
        </div>
      </div>
    </div>
  );
}

