import {
  Bug,
  Droplets,
  Fingerprint,
  Footprints,
  Scale,
} from "lucide-react";

import type {
  LucideIcon,
} from "lucide-react";

import type {
  DiseaseModuleId,
} from "@/features/disease/types";

export const DISEASE_MODULE_ICONS: Record<
  DiseaseModuleId,
  LucideIcon
> = {
  lumpy: Bug,
  lameness: Footprints,
  mastitis: Droplets,
  bcs: Scale,
  identity: Fingerprint,
};