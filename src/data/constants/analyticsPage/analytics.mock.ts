import type { Cow } from "@/features/herd/types";

const milkValues = [
  18.5, 24, 31.2, 27.5, 22, 35, 29.4, 16.8,
  33.1, 26.3, 21.7, 38, 30.5, 19.2, 28.8, 34.6,
  23.5, 32.4, 17.9, 25.6, 36.2, 20.4, 29.8, 31.7,
];

const dimValues = [
  12, 28, 35, 42, 58, 76, 89, 97,
  110, 128, 143, 165, 178, 190, 215, 232,
  248, 267, 289, 305, 327, 351, 380, 412,
];

export const analyticsMockCows: Cow[] = milkValues.map(
  (dailyMilk, index) => ({
    id: `mock-cow-${index + 1}`,
    earTag: `RAS-${String(index + 1).padStart(4, "0")}`,
    name: `دام نمونه ${index + 1}`,
    imageUrl: null,
    gender: "female",
    ageMonths: 24 + (index % 36),
    daysInMilk: dimValues[index],
    dailyMilk,
    bodyConditionScore: 2.5 + (index % 5) * 0.1,
    healthStatus: index % 7 === 0 ? "suspected" : "healthy",
    hasTreatment: index % 6 === 0,
    createdAt: new Date(
      Date.UTC(2026, 0, 1 + index),
    ).toISOString(),
  }),
);