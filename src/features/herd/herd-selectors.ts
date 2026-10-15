

import type { Cow, HerdFilter, HerdOverviewStats } from "@/types/herd/herd";

export function calculateHerdStats(cows: Cow[]): HerdOverviewStats {
  const totalCows = cows.length;

  let totalMilk = 0;
  let treatedCows = 0;
  let healthyCows = 0;
  let photographedCows = 0;

  for (let i = 0; i < totalCows; i++) {
    const cow = cows[i];

    totalMilk += cow.dailyMilk ?? 0;

    if (cow.hasTreatment) treatedCows++;
    if (cow.healthStatus === "healthy") healthyCows++;
    if (cow.imageUrl !== null) photographedCows++;
  }

  const hasCows = totalCows > 0;
  const toPercent = (n: number) => (hasCows ? (n / totalCows) * 100 : 0);

  return {
    totalCows,
    totalMilk,
    treatedCows,
    imageCount: photographedCows,
    healthyCows,
    photographedCows,
    healthRate: toPercent(healthyCows),
    photoCoverage: toPercent(photographedCows),
    treatmentCoverage: toPercent(treatedCows),
  };
}

const FILTER_PREDICATES: Record<
  Exclude<HerdFilter, "all">,
  (cow: Cow) => boolean
> = {
  "has-photo": (cow) => cow.imageUrl !== null,
  "no-photo": (cow) => cow.imageUrl === null,
  "has-treatment": (cow) => cow.hasTreatment,
};

export function filterHerd(cows: Cow[], filter: HerdFilter): Cow[] {
  if (filter === "all") return cows;

  const predicate = FILTER_PREDICATES[filter];
  const result: Cow[] = [];

  for (let i = 0; i < cows.length; i++) {
    if (predicate(cows[i])) result.push(cows[i]);
  }
  return result;
}