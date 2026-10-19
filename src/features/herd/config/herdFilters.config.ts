import { HerdFilter } from "../types";

export const herdFilters: {
  label: string;
  value: HerdFilter;
}[] = [
  { label: "همه دام‌ها", value: "all" },
  { label: "دارای عکس", value: "has-photo" },
  { label: "بدون عکس", value: "no-photo" },
  { label: "دارای سابقه درمان", value: "has-treatment" },
];