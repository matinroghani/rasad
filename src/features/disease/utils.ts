import type {
  DiseaseIntegrationStatus,
} from "./types";

export function formatNumber(value: number): string {
  return new Intl.NumberFormat("fa-IR", {
    maximumFractionDigits: 1,
  }).format(value);
}

export function getIntegrationStatusPresentation(
  status: DiseaseIntegrationStatus,
) {
  switch (status) {
    case "connected":
      return {
        label: "متصل",
        className:
          "border-[var(--panel-border)] bg-[var(--green-soft)] text-[var(--accent-green)]",
        iconClassName: "text-[var(--accent-green)]",
      };

    case "unavailable":
      return {
        label: "غیرفعال",
        className:
          "border-[var(--panel-border)] bg-[var(--tone-treatment-bg)] text-[var(--tone-treatment-fg)]",
        iconClassName:
          "text-[var(--tone-treatment-fg)]",
      };

    case "ready":
    default:
      return {
        label: "آماده اتصال",
        className:
          "border-[var(--panel-border)] bg-[var(--surface-warm)] text-[var(--text-muted)]",
        iconClassName: "text-[var(--accent-green)]",
      };
  }
}