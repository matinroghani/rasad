import type { Icon as PhosphorIcon } from "@phosphor-icons/react";

export type SidebarColor =
  | "green"
  | "blue"
  | "red"
  | "purple"
  | "teal"
  | "sky"
  | "orange";

export type SidebarActionKey =
  | "openMainView"
  | "openAnalyticsView"
  | "openDiseaseView"
  | "openSettingsView"
  | "openSubscriptionModal"
  | "openSupportModal"
  | "openFarmStatusModal";

export type SidebarStatValueKey = "totalCows" | "avgMilk" | "withPhoto";

export interface SidebarItem {
  id: string;
  color: SidebarColor;
  Icon: PhosphorIcon;
  title: string;
  description: string;
  action: SidebarActionKey;
  active?: boolean;
  href: string;
}

export interface SidebarStat {
  id: string;
  label: string;
  valueKey: SidebarStatValueKey;
  defaultValue: string | number;
}