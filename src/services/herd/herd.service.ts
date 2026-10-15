import { Cow, HerdUploadResult } from "@/types/herd/herd";

const DEFAULT_UPLOAD_DELAY_MS = 1000;

export interface UploadHerdImagesOptions {
  delayMs?: number;
  signal?: AbortSignal;
  onProgress?: (progress: number) => void;
  namePrefix?: string;
}

function createId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 11)}`;
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
    return { cows: [], processedImages: 0 };
  }

  await delay(delayMs, signal);

  const createdUrls: string[] = [];
  const cows: Cow[] = [];
  const now = new Date().toISOString();

  try {
    for (let i = 0; i < files.length; i++) {
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
  } catch (err) {
    for (let i = 0; i < createdUrls.length; i++) {
      URL.revokeObjectURL(createdUrls[i]);
    }
    throw err;
  }
}