import type { LucideIcon } from "lucide-react";

import type {
  HerdOverviewStats,
} from "@/features/herd/types";

export type DiseaseModuleId =
  | "lumpy"
  | "lameness"
  | "mastitis"
  | "bcs"
  | "identity";

export type DiseaseIntegrationStatus =
  | "ready"
  | "connected"
  | "unavailable";

export interface DiseaseModuleRecord {
  id: DiseaseModuleId;
  title: string;
  subtitle: string;
  description: string;
  purpose: string;
  requirements: string[];
  integrationStatus: DiseaseIntegrationStatus;
}

export interface DiseaseModule extends DiseaseModuleRecord {
  icon: LucideIcon;
}

export interface DiseaseModulesApiResponse {
  data: DiseaseModuleRecord[];
  total: number;
}

export type DiseaseOverviewStats = Pick<
  HerdOverviewStats,
  "treatedCows" | "photographedCows"
>;

export interface DiseaseModuleDialogProps {
  module: DiseaseModule | null;
  onClose: () => void;
}