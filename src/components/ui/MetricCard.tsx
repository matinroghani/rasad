import type { LucideIcon } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string;
  description: string;
  icon: LucideIcon;
  unit?: string;
  variant?: "default" | "accent";
}

export default function MetricCard({
  title,
  value,
  description,
  icon: Icon,
  unit,
  variant = "default",
}: MetricCardProps) {
  const isAccent = variant === "accent";

  return (
    <article
      className={[
        "flex min-w-0 items-center gap-3 rounded-[var(--radius-lg)]",
        "border border-[var(--panel-border)] bg-[var(--panel-bg)]",
        "p-4 shadow-[var(--shadow-sm)]",
        "transition-[border-color,box-shadow] duration-200",
        "hover:border-[var(--panel-border-hover)] hover:shadow-[var(--shadow-md)]",
        "sm:p-5",
      ].join(" ")}
    >
      <div
        className={[
          "flex size-11 shrink-0 items-center justify-center",
          "rounded-[var(--radius-md)]",
          isAccent
            ? "bg-[var(--green-soft)] text-[var(--accent-green)]"
            : "bg-[var(--surface-warm)] text-[var(--text-muted)]",
        ].join(" ")}
      >
        <Icon size={21} strokeWidth={1.8} />
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-xs leading-6 text-[var(--text-muted)]">
          {title}
        </p>

        <div className="mt-0.5 flex min-w-0 flex-wrap items-baseline gap-x-1.5">
          <p className="truncate text-xl font-bold tabular-nums text-[var(--text-main)]">
            {value}
          </p>

          {unit && (
            <span className="text-[var(--font-size-xs)] text-[var(--text-light)]">
              {unit}
            </span>
          )}
        </div>

        <p className="mt-1 text-[11px] leading-5 text-[var(--text-muted)]">
          {description}
        </p>
      </div>
    </article>
  );
}