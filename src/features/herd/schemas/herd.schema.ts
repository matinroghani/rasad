import type {
  Cow,
  CowGender,
  CowHealthStatus,
  HerdUploadResult,
  ManualCowInput,
} from "../types";

export interface CreateManualCowResponse {
  id: string | number;
  tag: string;
}

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

function isCowGender(
  value: unknown,
): value is CowGender {
  return value === "female" || value === "male";
}

function isCowHealthStatus(
  value: unknown,
): value is CowHealthStatus {
  return (
    value === "healthy" ||
    value === "suspected" ||
    value === "sick"
  );
}

export function parseCow(
  value: unknown,
): Cow {
  if (!isRecord(value)) {
    throw new Error("ساختار اطلاعات دام معتبر نیست.");
  }

  const valid =
    typeof value.id === "string" &&
    isNullableString(value.earTag) &&
    typeof value.name === "string" &&
    isNullableString(value.imageUrl) &&
    isCowGender(value.gender) &&
    isNullableNumber(value.ageMonths) &&
    isNullableNumber(value.daysInMilk) &&
    isNullableNumber(value.dailyMilk) &&
    isNullableNumber(value.bodyConditionScore) &&
    isCowHealthStatus(value.healthStatus) &&
    typeof value.hasTreatment === "boolean" &&
    typeof value.createdAt === "string";

  if (!valid) {
    throw new Error("ساختار اطلاعات دام معتبر نیست.");
  }

  return value as unknown as Cow;
}

export function parseManualCowInput(
  value: unknown,
): ManualCowInput {
  if (!isRecord(value)) {
    throw new Error(
      "ساختار اطلاعات ثبت دستی دام معتبر نیست.",
    );
  }

  if (
    typeof value.earTag !== "string" ||
    value.earTag.trim().length === 0
  ) {
    throw new Error("شماره گوش الزامی است.");
  }

  if (!isCowGender(value.gender)) {
    throw new Error("جنسیت دام معتبر نیست.");
  }

  if (
    value.ageMonths !== null &&
    (typeof value.ageMonths !== "number" ||
      !Number.isFinite(value.ageMonths))
  ) {
    throw new Error("سن دام معتبر نیست.");
  }

  return {
    earTag: value.earTag.trim(),
    gender: value.gender,
    ageMonths: value.ageMonths,
  };
}

export function parseHerdUploadResult(
  value: unknown,
): HerdUploadResult {
  if (!isRecord(value)) {
    throw new Error(
      "ساختار نتیجه آپلود گله معتبر نیست.",
    );
  }

  if (!Array.isArray(value.cows)) {
    throw new Error(
      "فهرست دام‌های پردازش‌شده معتبر نیست.",
    );
  }

  const cows = value.cows.map(
    (cow, index) => {
      try {
        return parseCow(cow);
      } catch {
        throw new Error(
          `اطلاعات دام شماره ${index + 1} معتبر نیست.`,
        );
      }
    },
  );

  if (
    typeof value.processedImages !== "number" ||
    !Number.isSafeInteger(value.processedImages) ||
    value.processedImages < 0
  ) {
    throw new Error(
      "تعداد تصاویر پردازش‌شده معتبر نیست.",
    );
  }

  return {
    cows,
    processedImages: value.processedImages,
  };
}

export function parseCreateManualCowResponse(
  value: unknown,
): CreateManualCowResponse {
  if (!isRecord(value)) {
    throw new Error(
      "پاسخ ثبت دستی دام معتبر نیست.",
    );
  }

  const validId =
    (typeof value.id === "string" &&
      value.id.length > 0) ||
    (typeof value.id === "number" &&
      Number.isFinite(value.id));

  if (!validId || typeof value.tag !== "string" || !value.tag) {
    throw new Error(
      "شناسه یا شماره گوش در پاسخ سرور معتبر نیست.",
    );
  }

  return {
    id: value.id as string | number,
    tag: value.tag,
  };
}