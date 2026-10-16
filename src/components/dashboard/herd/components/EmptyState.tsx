
import { Camera, ScanSearch } from "lucide-react";
import { herdTableConfig } from "@/data/constants/herdPage/herdTable.config";

export default function EmptyState() {
  return (
    <div className="flex flex-col items-center px-5 py-14 text-center sm:py-20">
      <div className="relative flex aspect-square w-full max-w-[4.75rem] items-center justify-center rounded-[var(--radius-xl)] border border-[var(--panel-border)] bg-[var(--green-soft)] text-[var(--accent-green)]">
        <ScanSearch className="size-[45%]" strokeWidth={1.5} />

        <span className="absolute -end-1 -top-1 flex aspect-square w-[30%] items-center justify-center rounded-full border-2 border-[var(--surface)] bg-[var(--green-soft)] text-[var(--accent-green)]">
          <Camera className="size-[55%]" />
        </span>
      </div>

      <h3 className="mt-5 text-base font-extrabold text-[var(--text-main)]">
        {herdTableConfig.emptyTitle}
      </h3>

      <p className="mt-2 max-w-sm text-sm leading-7 text-[var(--text-muted)]">
        {herdTableConfig.emptyDescription}
      </p>
    </div>
  );
}
