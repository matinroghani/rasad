
import type { Cow } from "@/types/herd/herd";
import {
  Activity,
  CalendarDays,
  Droplets,
  HeartPulse,
  Tag,
} from "lucide-react";
import { herdTableConfig } from "@/data/constants/herdPage/herdTable.config";
import CowAvatar from "./CowAvatar";
import HealthBadge from "./HealthBadge";
import TreatmentBadge from "./TreatmentBadge";
import MetricCell from "./MetricCell";

interface CowMobileRow {
  genderLabel: string;
  ageLabel: string;
  daysInMilkLabel: string;
  dailyMilkLabel: string;
  bodyConditionScoreLabel: string;
}

interface CowMobileCardProps {
  cow: Cow;
  row: CowMobileRow;
}

export default function CowMobileCard({
  cow,
  row,
}: CowMobileCardProps) {
  return (
    <article className="rounded-[var(--radius-lg)] border border-[var(--panel-border)] bg-[var(--panel-bg)] p-4 shadow-[var(--shadow-sm)]">
      <div className="flex items-start gap-3">
        <div className="w-1/6 max-w-11 shrink-0">
          <CowAvatar cow={cow} />
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="truncate text-sm font-extrabold text-[var(--text-main)]">
            {cow.name}
          </h3>

          <p className="mt-1 flex items-center gap-[0.375em] text-xs text-[var(--text-muted)]">
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
              <span className="mx-1 text-[var(--text-light)]">/</span>
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

      <div className="mt-3 border-t border-[var(--border)] pt-3">
        <TreatmentBadge hasTreatment={cow.hasTreatment} />
      </div>
    </article>
  );
}
