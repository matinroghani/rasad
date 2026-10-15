
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
    className: "border-[#d7ead5] bg-[#eff8ec] text-[#4d8952]",
    dotClassName: "bg-[#6eac6d]",
  },
  suspected: {
    label: "نیازمند بررسی",
    className: "border-[#f0e2bd] bg-[#fff8e8] text-[#a57b2e]",
    dotClassName: "bg-[#d9a441]",
  },
  sick: {
    label: "بیمار",
    className: "border-[#f0d5d2] bg-[#fff0ee] text-[#b45c53]",
    dotClassName: "bg-[#d36d63]",
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
    "size-12 rounded-2xl border border-[#e7ece2] bg-[#f4f6f1] object-cover",
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