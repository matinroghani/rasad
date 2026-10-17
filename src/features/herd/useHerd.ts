"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { mockHerd } from "@/data/fixtures/herd";
import {
  createManualCow,
  uploadHerdImages,
} from "@/services/herd/herd.service";
import {
  calculateHerdStats,
  filterHerd,
} from "./herd-selectors";
import { validateHerdImages } from "./herd-validation";
import type {
  Cow,
  HerdFilter,
  HerdOperationStatus,
  ManualCowInput,
} from "@/types/herd/herd";

function createId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `${Date.now().toString(36)}-${Math.random()
    .toString(36)
    .slice(2, 11)}`;
}

function createEmptyCow(overrides: Partial<Cow> = {}): Cow {
  return {
    id: createId(),
    earTag: null,
    name: "دام جدید",
    imageUrl: null,
    gender: "female",
    ageMonths: null,
    daysInMilk: null,
    dailyMilk: null,
    bodyConditionScore: null,
    healthStatus: "suspected",
    hasTreatment: false,
    createdAt: new Date().toISOString(),
    ...overrides,
  };
}

export function useHerd() {
  const [cows, setCows] = useState<Cow[]>(() => [...mockHerd]);
  const [filter, setFilter] = useState<HerdFilter>("all");

  const [op, setOp] = useState<{
    status: HerdOperationStatus;
    error: string | null;
  }>({
    status: "idle",
    error: null,
  });

  const isUploadingRef = useRef(false);
  const isCreatingCowRef = useRef(false);
  const abortRef = useRef<AbortController | null>(null);

  const stats = useMemo(() => calculateHerdStats(cows), [cows]);

  const filteredCows = useMemo(
    () => filterHerd(cows, filter),
    [cows, filter],
  );

  useEffect(() => {
    return () => {
      abortRef.current?.abort();

      for (const cow of cows) {
        if (cow.imageUrl?.startsWith("blob:")) {
          URL.revokeObjectURL(cow.imageUrl);
        }
      }
    };
    // این cleanup فقط هنگام unmount اجرا می‌شود.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const uploadImages = useCallback(
    async (files: File[], onProgress?: (progress: number) => void) => {
      if (isUploadingRef.current || isCreatingCowRef.current) return;

      const validationError = validateHerdImages(files);

      if (validationError) {
        setOp({ status: "error", error: validationError });
        return;
      }

      isUploadingRef.current = true;
      setOp({ status: "loading", error: null });

      const controller = new AbortController();
      abortRef.current = controller;

      try {
        const result = await uploadHerdImages(files, {
          signal: controller.signal,
          onProgress,
        });

        setCows((current) => [...result.cows, ...current]);
        setOp({ status: "success", error: null });
      } catch (err) {
        if ((err as Error)?.name === "AbortError") {
          setOp({ status: "idle", error: null });
          return;
        }

        setOp({
          status: "error",
          error: "آپلود تصاویر ناموفق بود. دوباره تلاش کنید.",
        });
      } finally {
        isUploadingRef.current = false;
        abortRef.current = null;
      }
    },
    [],
  );

  const cancelUpload = useCallback(() => {
    abortRef.current?.abort();
  }, []);

  const addManualCow = useCallback(
    async (input: ManualCowInput): Promise<boolean> => {
      if (isUploadingRef.current || isCreatingCowRef.current) {
        return false;
      }

      const earTag = input.earTag.trim();

      if (!earTag) {
        setOp({
          status: "error",
          error: "شماره گوش الزامی است.",
        });

        return false;
      }

      isCreatingCowRef.current = true;
      setOp({ status: "loading", error: null });

      try {
        const result = await createManualCow({
          ...input,
          earTag,
        });

        const cow = createEmptyCow({
          id: String(result.id),
          earTag: result.tag,
          name: result.tag,
          gender: input.gender,
          ageMonths: input.ageMonths,
          imageUrl: null,
          healthStatus: "suspected",
          hasTreatment: false,
          createdAt: new Date().toISOString(),
        });

        setCows((current) => {
          // جلوگیری از اضافه‌شدن تکراری یک پاسخ به state
          if (current.some((item) => item.id === cow.id)) {
            return current;
          }

          return [cow, ...current];
        });

        setFilter("all");
        setOp({ status: "success", error: null });

        return true;
      } catch (err) {
        setOp({
          status: "error",
          error:
            err instanceof Error
              ? err.message
              : "ثبت دام ناموفق بود. دوباره تلاش کنید.",
        });

        return false;
      } finally {
        isCreatingCowRef.current = false;
      }
    },
    [],
  );

  return {
    cows,
    filteredCows,
    stats,
    filter,
    setFilter,
    status: op.status,
    error: op.error,
    uploadImages,
    cancelUpload,
    addManualCow,
  };
}