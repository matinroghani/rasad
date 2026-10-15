"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { mockHerd } from "@/data/fixtures/herd";
import { calculateHerdStats, filterHerd } from "./herd-selectors";
import { validateHerdImages } from "./herd-validation";
import { uploadHerdImages } from "@/services/herd/herd.service";
import { Cow, HerdFilter, HerdOperationStatus } from "@/types/herd/herd";


function createId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 11)}`;
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
  }>({ status: "idle", error: null });

  const isUploadingRef = useRef(false);
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
        if (cow.imageUrl) URL.revokeObjectURL(cow.imageUrl);
      }
    };
  }, []);


  const uploadImages = useCallback(async (files: File[]) => {
    if (isUploadingRef.current) return;

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
  }, []);

  const cancelUpload = useCallback(() => {
    abortRef.current?.abort();
  }, []);


  const addManualCow = useCallback(() => {
    const cow = createEmptyCow({ name: "دام جدید" });
    setCows((current) => [cow, ...current]);
  }, []);


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