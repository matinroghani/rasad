import {
  herdGaugeConfig,
  herdMetricsConfig,
} from "@/data/constants/herdPage/herdStats.config";
import type { HerdOverviewStats } from "@/types/herd/herd";

interface HerdStatsProps {
  stats: HerdOverviewStats;
}

function formatNumber(value: number) {
  return value.toLocaleString("fa-IR", {
    maximumFractionDigits: 1,
  });
}

function Gauge({
  value,
  color,
}: {
  value: number;
  color: string;
}) {
  const normalizedValue = Math.max(0, Math.min(value, 100));
  const circumference = 2 * Math.PI * 23;

  return (
    <div className="relative aspect-square w-full max-w-19 shrink-0">
      <svg
        viewBox="0 0 56 56"
        className="size-full -rotate-90"
        aria-hidden="true"
      >
        <circle
          cx="28"
          cy="28"
          r="23"
          fill="none"
          stroke="var(--border)"
          strokeWidth="4.5"
        />

        <circle
          cx="28"
          cy="28"
          r="23"
          fill="none"
          stroke={color}
          strokeWidth="4.5"
          strokeLinecap="round"
          strokeDasharray={`${(normalizedValue / 100) * circumference} ${circumference}`}
          className="transition-[stroke-dasharray] duration-700"
        />
      </svg>

      <span className="absolute inset-0 flex items-center justify-center text-[var(--font-size-md)] font-extrabold tabular-nums text-[var(--text-main)]">
        {Math.round(normalizedValue).toLocaleString("fa-IR")}٪
      </span>
    </div>
  );
}

export default function HerdStats({ stats }: HerdStatsProps) {
  const hasCows = stats.totalCows > 0;
  const gauges = herdGaugeConfig(stats);
  const metrics = herdMetricsConfig(stats, formatNumber);

  return (
    <section
      aria-label="آمار گله"
      className="space-y-[var(--section-gap)]"
    >
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {gauges.map((item) => {
          const Icon = item.icon;

          return (
            <article
              key={item.label}
              className={[
                "group relative flex min-w-0 items-center justify-between gap-3 overflow-hidden",
                "rounded-[var(--radius-lg)] border border-[var(--panel-border)]",
                "bg-[var(--panel-bg)] p-4 shadow-[var(--shadow-sm)]",
                "transition-[transform,border-color,box-shadow] duration-200",
                "hover:-translate-y-0.5 hover:border-[var(--panel-border-hover)] hover:shadow-[var(--shadow-md)]",
                "sm:p-5",
              ].join(" ")}
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span
                    className={`flex aspect-square w-full max-w-9 shrink-0 items-center justify-center rounded-[var(--radius-sm)] ${item.tone}`}
                  >
                    <Icon className="size-[55%]" strokeWidth={1.8} />
                  </span>

                  <h3 className="truncate text-sm font-bold text-[var(--text-main)]">
                    {item.label}
                  </h3>
                </div>

                <p className="mt-4 text-xs leading-[var(--line-height-normal)] text-[var(--text-muted)]">
                  {item.detail}
                </p>

                {!hasCows && (
                  <span className="mt-1 block text-[var(--font-size-xs)] text-[var(--text-light)]">
                    پس از ثبت دام محاسبه می‌شود
                  </span>
                )}
              </div>

              <div className="w-1/4 max-w-19 shrink-0">
                <Gauge value={item.value} color={item.color} />
              </div>
            </article>
          );
        })}
      </div>

      <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
        {metrics.map((item) => {
          const Icon = item.icon;

          return (
            <article
              key={item.label}
              className={[
                "relative min-w-0 overflow-hidden",
                "rounded-[var(--radius-lg)] border border-[var(--panel-border)]",
                "bg-[var(--panel-bg)] p-4 shadow-[var(--shadow-sm)]",
                "transition-[border-color,box-shadow] duration-200",
                "hover:border-[var(--panel-border-hover)] hover:shadow-[var(--shadow-md)]",
                "sm:p-5",
              ].join(" ")}
            >
              <div className="flex items-start justify-between gap-2">
                <div
                  className={`flex aspect-square w-full max-w-10 shrink-0 items-center justify-center rounded-[var(--radius-md)] ${item.tone}`}
                >
                  <Icon className="size-[55%]" strokeWidth={1.8} />
                </div>

                <span className="mt-1 size-1.5 shrink-0 rounded-full bg-[var(--accent-green-light)]" />
              </div>

              <p className="mt-5 text-xs leading-[var(--line-height-normal)] text-[var(--text-muted)] sm:text-[var(--font-size-md)]">
                {item.label}
              </p>

              <div className="mt-2 flex flex-wrap items-baseline gap-x-1.5 gap-y-1">
                <span className="text-xl font-extrabold tracking-tight text-[var(--text-main)] sm:text-2xl">
                  {item.value}
                </span>

                <span className="text-[var(--font-size-xs)] font-medium text-[var(--text-light)]">
                  {item.unit}
                </span>
              </div>

              <div
                className={`absolute inset-x-0 bottom-0 h-0.75 ${item.accent}`}
              />
            </article>
          );
        })}
      </div>
    </section>
  );
}