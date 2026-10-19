
import { SidebarItem, SidebarStat } from "@/components/layout/sidebar/types";
import {
  BarnIcon,
  ChartLineUpIcon,
  CowIcon,
  FirstAidKitIcon,
  GearSixIcon,
  HeadsetIcon,
  IdentificationCardIcon,
} from "@phosphor-icons/react";

export const sidebarItems: SidebarItem[] = [
  {
    id: "nav-herd",
    color: "green",
    Icon: CowIcon,
    title: "پایش گله",
    description: "مدیریت دام‌ها و سوابق",
    action: "openMainView",
    href: "/herd",
  },
  {
    id: "nav-analytics",
    color: "blue",
    Icon: ChartLineUpIcon,
    title: "تحلیل و آمار",
    description: "مقایسه تولید • دارو • هزینه",
    action: "openAnalyticsView",
    href: "/analytics",
  },
  {
    id: "nav-disease",
    color: "red",
    Icon: FirstAidKitIcon,
    title: "بیماری‌یابی",
    description: "لمپی اسکین • لنگش • ...",
    action: "openDiseaseView",
    href: "/disease",
  },
  {
    id: "nav-settings",
    color: "purple",
    Icon: GearSixIcon,
    title: "تنظیمات",
    description: "پیکربندی و توسعه",
    action: "openSettingsView",
    href: "/settings",
  },
  {
    id: "nav-subscription",
    color: "teal",
    Icon: IdentificationCardIcon,
    title: "وضعیت اشتراک",
    description: "سطح دسترسی",
    action: "openSubscriptionModal",
    href: "/subscription",
  },
  {
    id: "nav-support",
    color: "sky",
    Icon: HeadsetIcon,
    title: "پشتیبانی",
    description: "چت‌بات و کارشناس",
    action: "openSupportModal",
    href: "/support",
  },
  {
    id: "nav-farm-status",
    color: "orange",
    Icon: BarnIcon,
    title: "وضعیت دامداری",
    description: "ظرفیت و مقایسه",
    action: "openFarmStatusModal",
    href: "/farm-status",
  },
];

export const sidebarStats: SidebarStat[] = [
  {
    id: "totalCows",
    label: "تعداد دام",
    valueKey: "totalCows",
    defaultValue: 0,
  },
  {
    id: "avgMilk",
    label: "میانگین شیر",
    valueKey: "avgMilk",
    defaultValue: "—",
  },
  {
    id: "withPhoto",
    label: "دام‌های دارای عکس",
    valueKey: "withPhoto",
    defaultValue: 0,
  },
];

export const SidebarStatsIcon = ChartLineUpIcon;
