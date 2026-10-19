import { Stethoscope } from "lucide-react";
import { herdTableConfig } from "../config/herdTable.config";

interface TreatmentBadgeProps {
  hasTreatment: boolean;
}

export default function TreatmentBadge({
  hasTreatment,
}: TreatmentBadgeProps) {
  if (!hasTreatment) {
    return (
      <span className="text-xs text-[var(--text-light)]">
        {herdTableConfig.noTreatmentLabel}
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-[0.375em] whitespace-nowrap rounded-full border border-[var(--border)] bg-[var(--orange-soft)] px-[0.6em] py-[0.35em] text-[var(--font-size-xs)] font-semibold leading-none text-[var(--accent-orange)]">
      <Stethoscope className="size-[1.1em]" />
      سابقه درمان
    </span>
  );
}