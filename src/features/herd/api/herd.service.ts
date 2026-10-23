import type {
  Cow,
  HerdUploadResult,
  ManualCowInput,
} from "../types";
import { parseCreateManualCowResponse } from "../schemas/herd.schema";

const DEFAULT_UPLOAD_DELAY_MS = 1000;

export interface UploadHerdImagesOptions {
  delayMs?: number;
  signal?: AbortSignal;
  onProgress?: (progress: number) => void;
  namePrefix?: string;
}

interface CreateManualCowResponse {
  id: string | number;
  tag: string;
}

function createId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `${Date.now().toString(36)}-${Math.random()
    .toString(36)
    .slice(2, 11)}`;
}

function delay(ms: number, signal?: AbortSignal): Promise<void> {
  return new Promise((resolve, reject) => {
    if (signal?.aborted) {
      reject(new DOMException("Aborted", "AbortError"));
      return;
    }

    const timer = setTimeout(() => {
      signal?.removeEventListener("abort", onAbort);
      resolve();
    }, ms);

    function onAbort() {
      clearTimeout(timer);
      reject(new DOMException("Aborted", "AbortError"));
    }

    signal?.addEventListener("abort", onAbort, { once: true });
  });
}

export async function uploadHerdImages(
  files: File[],
  options: UploadHerdImagesOptions = {},
): Promise<HerdUploadResult> {
  const {
    delayMs = DEFAULT_UPLOAD_DELAY_MS,
    signal,
    onProgress,
    namePrefix = "دام آزمایشی",
  } = options;

  if (files.length === 0) {
    return {
      cows: [],
      processedImages: 0,
    };
  }

  const createdUrls: string[] = [];
  const cows: Cow[] = [];
  const now = new Date().toISOString();

  try {
    for (let i = 0; i < files.length; i++) {
      if (signal?.aborted) {
        throw new DOMException("Aborted", "AbortError");
      }

      await delay(delayMs, signal);

      if (signal?.aborted) {
        throw new DOMException("Aborted", "AbortError");
      }

      const file = files[i];
      const imageUrl = URL.createObjectURL(file);

      createdUrls.push(imageUrl);

      cows.push({
        id: createId(),
        earTag: null,
        name: `${namePrefix} ${i + 1}`,
        imageUrl,
        gender: "female",
        ageMonths: null,
        daysInMilk: null,
        dailyMilk: null,
        bodyConditionScore: null,
        healthStatus: "suspected",
        hasTreatment: false,
        createdAt: now,
      });

      onProgress?.((i + 1) / files.length);
    }

    return {
      cows,
      processedImages: files.length,
    };
  } catch (error) {
    for (const url of createdUrls) {
      URL.revokeObjectURL(url);
    }

    throw error;
  }
}

function getApiBaseUrl(): string {
  const baseUrl = process.env.NEXT_PUBLIC_RASAD_API_URL?.replace(
    /\/+$/,
    "",
  );

  if (!baseUrl) {
    throw new Error(
      "آدرس API تنظیم نشده است. متغیر NEXT_PUBLIC_RASAD_API_URL را در فایل .env.local تعریف کنید.",
    );
  }

  return baseUrl;
}

export async function createManualCow(
  input: ManualCowInput,
): Promise<CreateManualCowResponse> {
  const tag = input.earTag.trim();

  if (!tag) {
    throw new Error("شماره گوش الزامی است.");
  }

  const formData = new FormData();
  formData.append("tag", tag);

  let response: Response;

  try {
    response = await fetch(`${getApiBaseUrl()}/api/v1/cows`, {
      method: "POST",
      body: formData,
    });
  } catch {
    throw new Error(
      "ارتباط با سرور برقرار نشد. اتصال شبکه و وضعیت API را بررسی کنید.",
    );
  }

  if (response.status === 409) {
    throw new Error("این شماره گوش قبلاً در سامانه ثبت شده است.");
  }

  if (!response.ok) {
    if (response.status === 422) {
      throw new Error("اطلاعات ارسالی توسط سرور پذیرفته نشد.");
    }

    if (response.status >= 500) {
      throw new Error(
        "خطایی در سرور رخ داده است. کمی بعد دوباره تلاش کنید.",
      );
    }

    throw new Error(`ثبت دام ناموفق بود. کد خطا: ${response.status}`);
  }

  let payload: unknown;

  try {
    payload = await response.json();
  } catch {
    throw new Error("پاسخ دریافتی از سرور معتبر نیست.");
  }

  return parseCreateManualCowResponse(payload);
}
