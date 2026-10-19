export type CowHealthStatus = "healthy" | "suspected" | "sick";

export type CowGender = "female" | "male";

export interface Cow {
  id: string;
  earTag: string | null;
  name: string;
  imageUrl: string | null;
  gender: CowGender;
  ageMonths: number | null;
  daysInMilk: number | null;
  dailyMilk: number | null;
  bodyConditionScore: number | null;
  healthStatus: CowHealthStatus;
  hasTreatment: boolean;
  createdAt: string;
}

export interface ManualCowInput {
  earTag: string;
  gender: CowGender;
  ageMonths: number | null;
}

export type HerdFilter =
  | "all"
  | "has-photo"
  | "no-photo"
  | "has-treatment";

export type HerdOperationStatus =
  | "idle"
  | "loading"
  | "success"
  | "error";

export interface HerdOverviewStats {
  totalCows: number;
  totalMilk: number;
  treatedCows: number;
  imageCount: number;
  healthyCows: number;
  photographedCows: number;
  treatmentCoverage: number;
  healthRate: number;
  photoCoverage: number;
}

export interface HerdUploadResult {
  cows: Cow[];
  processedImages: number;
}