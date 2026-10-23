import type { Cow } from "@/features/herd/types";

import type { AnalyticsApiResponse } from "../types";

function isRecord(
  value: unknown,
): value is Record<string, unknown> {
  return (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value)
  );
}

function isNullableString(
  value: unknown,
): value is string | null {
  return value === null || typeof value === "string";
}

function isNullableNumber(
  value: unknown,
): value is number | null {
  return (
    value === null ||
    (typeof value === "number" &&
      Number.isFinite(value))
  );
}

function isCow(value: unknown): value is Cow {
  if (!isRecord(value)) {
    return false;
  }

  return (
    typeof value.id === "string" &&
    isNullableString(value.earTag) &&
    typeof value.name === "string" &&
    isNullableString(value.imageUrl) &&
    (value.gender === "female" ||
      value.gender === "male") &&
    isNullableNumber(value.ageMonths) &&
    isNullableNumber(value.daysInMilk) &&
    isNullableNumber(value.dailyMilk) &&
    isNullableNumber(value.bodyConditionScore) &&
    (value.healthStatus === "healthy" ||
      value.healthStatus === "suspected" ||
      value.healthStatus === "sick") &&
    typeof value.hasTreatment === "boolean" &&
    typeof value.createdAt === "string"
  );
}

export function parseAnalyticsApiResponse(
  value: unknown,
): AnalyticsApiResponse {
  if (!isRecord(value)) {
    throw new Error(
      "ساختار پاسخ API تحلیل معتبر نیست.",
    );
  }

  if (!Array.isArray(value.data)) {
    throw new Error(
      "فهرست دام‌های تحلیل معتبر نیست.",
    );
  }

  const data: Cow[] = value.data.map(
    (cow, index) => {
      if (!isCow(cow)) {
        throw new Error(
          `اطلاعات دام در ردیف ${index + 1} معتبر نیست.`,
        );
      }

      return cow;
    },
  );

  if (
    typeof value.total !== "number" ||
    !Number.isSafeInteger(value.total) ||
    value.total < 0
  ) {
    throw new Error(
      "تعداد دام‌های پاسخ تحلیل معتبر نیست.",
    );
  }

  return {
    data,
    total: value.total,
  };
}