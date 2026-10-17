import type { Cow } from "@/types/herd/herd";

export const herdTableColumns = [
  { key: "profile", label: "پروفایل دام" },
  { key: "earTag", label: "شماره گوش" },
  { key: "genderAge", label: "جنسیت / سن" },
  { key: "daysInMilk", label: "DIM" },
  { key: "dailyMilk", label: "شیر روزانه" },
  { key: "bodyConditionScore", label: "BCS" },
  { key: "treatment", label: "سابقه درمان" },
  { key: "health", label: "سلامت" },
] as const;

export const herdHealthConfig = {
  healthy: {
    label: "سالم",
    className:
      "border-[var(--health-healthy-border)] bg-[var(--health-healthy-bg)] text-[var(--health-healthy-fg)]",
    dotClassName: "bg-[var(--health-healthy-dot)]",
  },
  suspected: {
    label: "نیازمند بررسی",
    className:
      "border-[var(--health-suspected-border)] bg-[var(--health-suspected-bg)] text-[var(--health-suspected-fg)]",
    dotClassName: "bg-[var(--health-suspected-dot)]",
  },
  sick: {
    label: "بیمار",
    className:
      "border-[var(--health-sick-border)] bg-[var(--health-sick-bg)] text-[var(--health-sick-fg)]",
    dotClassName: "bg-[var(--health-sick-dot)]",
  },
} satisfies Record<
  Cow["healthStatus"],
  {
    label: string;
    className: string;
    dotClassName: string;
  }
>;

export const herdTableConfig = {
  emptyTitle: "هنوز دامی برای نمایش وجود ندارد",
  emptyDescription:
    "پس از آپلود تصویر یا ثبت دستی دام، اطلاعات گله در این بخش نمایش داده می‌شود.",
  emptyImageLabel: "بدون تصویر",
  noEarTagLabel: "ثبت نشده",
  noTreatmentLabel: "بدون سابقه",
  rowCountLabel: "تعداد دام‌های این فهرست",
  rowCountSuffix: "رأس",
  imageClassName:
    "size-12 rounded-2xl border border-[var(--table-image-border)] bg-[var(--table-image-bg)] object-cover",
} as const;

export const COLUMN_WIDTHS = [
  "w-[20%]",
  "w-[10%]",
  "w-[12%]",
  "w-[9%]",
  "w-[10%]",
  "w-[8%]",
  "w-[17%]",
  "w-[14%]",
] as const;