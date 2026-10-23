import { analyticsMockCows } from "@/data/constants/analyticsPage/analytics.mock";
import { parseAnalyticsApiResponse } from "../schemas/analytics.schema";

const MOCK_API_DELAY_MS = 600;

export interface AnalyticsApiResponse {
  data: import("@/features/herd/types").Cow[];
  total: number;
}

function wait(
  ms: number,
  signal?: AbortSignal,
): Promise<void> {
  return new Promise((resolve, reject) => {
    if (signal?.aborted) {
      reject(new DOMException("درخواست لغو شد.", "AbortError"));
      return;
    }

    const timer = setTimeout(() => {
      signal?.removeEventListener("abort", onAbort);
      resolve();
    }, ms);

    function onAbort() {
      clearTimeout(timer);
      reject(new DOMException("درخواست لغو شد.", "AbortError"));
    }

    signal?.addEventListener("abort", onAbort, { once: true });
  });
}

export async function getAnalyticsCows(
  signal?: AbortSignal,
): Promise<AnalyticsApiResponse> {
  await wait(MOCK_API_DELAY_MS, signal);

  if (signal?.aborted) {
    throw new DOMException("درخواست لغو شد.", "AbortError");
  }

  const payload: unknown = {
    data: analyticsMockCows.map((cow) => ({ ...cow })),
    total: analyticsMockCows.length,
  };

  return parseAnalyticsApiResponse(payload);
}
