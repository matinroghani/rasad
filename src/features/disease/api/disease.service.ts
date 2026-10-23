
import { diseaseMockModules } from "@/data/constants/diseasPage/disease.mock";
import { parseDiseaseModulesApiResponse } from "../schemas/disease.schema";

import type {
  DiseaseModulesApiResponse,
} from "../types";

const MOCK_API_DELAY_MS = 600;

const DISEASE_MODULES_API_URL =
  process.env.NEXT_PUBLIC_RASAD_DISEASE_MODULES_URL;

function wait(
  ms: number,
  signal?: AbortSignal,
): Promise<void> {
  return new Promise((resolve, reject) => {
    if (signal?.aborted) {
      reject(
        new DOMException(
          "درخواست لغو شد.",
          "AbortError",
        ),
      );
      return;
    }

    const onAbort = () => {
      clearTimeout(timer);

      signal?.removeEventListener(
        "abort",
        onAbort,
      );

      reject(
        new DOMException(
          "درخواست لغو شد.",
          "AbortError",
        ),
      );
    };

    const timer = setTimeout(() => {
      signal?.removeEventListener(
        "abort",
        onAbort,
      );

      resolve();
    }, ms);

    signal?.addEventListener(
      "abort",
      onAbort,
      { once: true },
    );
  });
}

async function fetchDiseaseModules(
  signal?: AbortSignal,
): Promise<DiseaseModulesApiResponse> {
  if (!DISEASE_MODULES_API_URL) {
    throw new Error(
      "آدرس API ماژول‌های بیماری تنظیم نشده است.",
    );
  }

  const response = await fetch(
    DISEASE_MODULES_API_URL,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      signal,
      cache: "no-store",
    },
  );

  if (!response.ok) {
    throw new Error(
      `دریافت ماژول‌های بیماری ناموفق بود. کد پاسخ: ${response.status}`,
    );
  }

  const payload: unknown = await response.json();

  return parseDiseaseModulesApiResponse(payload);
}

export async function getDiseaseModules(
  signal?: AbortSignal,
): Promise<DiseaseModulesApiResponse> {
  if (DISEASE_MODULES_API_URL) {
    return fetchDiseaseModules(signal);
  }

  await wait(MOCK_API_DELAY_MS, signal);

  if (signal?.aborted) {
    throw new DOMException(
      "درخواست لغو شد.",
      "AbortError",
    );
  }

  const payload: unknown = {
    data: diseaseMockModules.map((module) => ({
      ...module,
      requirements: [...module.requirements],
    })),
    total: diseaseMockModules.length,
  };

  return parseDiseaseModulesApiResponse(payload);
}