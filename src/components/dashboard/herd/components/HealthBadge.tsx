import type { Cow } from "@/types/herd/herd";
import { herdHealthConfig } from "@/data/constants/herdPage/herdTable.config";

interface HealthBadgeProps {
  status: Cow["healthStatus"];
}

export default function HealthBadge({ status }: HealthBadgeProps) {
  const config = herdHealthConfig[status];

  return (
    <span
      className={`inline-flex items-center gap-[0.375em] whitespace-nowrap rounded-full border px-[0.6em] py-[0.35em] text-[var(--font-size-xs)] font-bold leading-none ${config.className}`}
    >
      <span
        className={`size-[0.375em] shrink-0 rounded-full ${config.dotClassName}`}
      />
      {config.label}
    </span>
  );
}