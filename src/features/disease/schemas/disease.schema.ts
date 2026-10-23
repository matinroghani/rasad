import type {
  DiseaseIntegrationStatus,
  DiseaseModuleId,
  DiseaseModuleRecord,
  DiseaseModulesApiResponse,
} from "../types";

const VALID_MODULE_IDS: readonly DiseaseModuleId[] = [
  "lumpy",
  "lameness",
  "mastitis",
  "bcs",
  "identity",
];

const VALID_INTEGRATION_STATUSES: readonly DiseaseIntegrationStatus[] = [
  "ready",
  "connected",
  "unavailable",
];

function isObject(
  value: unknown,
): value is Record<string, unknown> {
  return (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value)
  );
}

function isDiseaseModuleRecord(
  value: unknown,
): value is DiseaseModuleRecord {
  if (!isObject(value)) {
    return false;
  }

  return (
    typeof value.id === "string" &&
    VALID_MODULE_IDS.includes(
      value.id as DiseaseModuleId,
    ) &&
    typeof value.title === "string" &&
    typeof value.subtitle === "string" &&
    typeof value.description === "string" &&
    typeof value.purpose === "string" &&
    Array.isArray(value.requirements) &&
    value.requirements.every(
      (item) => typeof item === "string",
    ) &&
    typeof value.integrationStatus === "string" &&
    VALID_INTEGRATION_STATUSES.includes(
      value.integrationStatus as DiseaseIntegrationStatus,
    )
  );
}

export function parseDiseaseModulesApiResponse(
  value: unknown,
): DiseaseModulesApiResponse {
  if (!isObject(value)) {
    throw new Error(
      "ساختار پاسخ API بیماری معتبر نیست.",
    );
  }

  if (
    !Array.isArray(value.data) ||
    !value.data.every(isDiseaseModuleRecord)
  ) {
    throw new Error(
      "فهرست ماژول‌های دریافتی از سرور معتبر نیست.",
    );
  }

  if (
    typeof value.total !== "number" ||
    !Number.isInteger(value.total) ||
    value.total < value.data.length ||
    value.total < 0
  ) {
    throw new Error(
      "تعداد ماژول‌های دریافتی از سرور معتبر نیست.",
    );
  }

  return value as unknown as DiseaseModulesApiResponse;
}