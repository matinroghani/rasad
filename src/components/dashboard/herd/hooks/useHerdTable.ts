
import { useMemo } from "react";

import type { Cow } from "@/types/herd/herd";
import { formatHerdCount, formatHerdValue } from "../herdTable.utils";


export function useHerdTable(cows: Cow[]) {
  const rows = useMemo(
    () =>
      cows.map((cow) => ({
        cow,
        shortId: cow.id.slice(0, 8),
        earTagLabel: cow.earTag ?? "—",
        genderLabel: cow.gender === "female" ? "ماده" : "نر",
        ageLabel: formatHerdValue(cow.ageMonths, "ماه"),
        daysInMilkLabel: formatHerdValue(cow.daysInMilk, "روز"),
        dailyMilkLabel: formatHerdValue(cow.dailyMilk, "لیتر"),
        bodyConditionScoreLabel: formatHerdValue(
          cow.bodyConditionScore,
        ),
      })),
    [cows],
  );

  const rowCountLabel = formatHerdCount(cows.length);

  return {
    rows,
    rowCountLabel,
    isEmpty: rows.length === 0,
  };
}
