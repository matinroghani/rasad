
"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  useAppDispatch,
  useAppSelector,
} from "@/store/hooks";

import {
  herdUploadSucceeded,
  uploadStarted,
  uploadProgressUpdated,
  uploadFailed,
  uploadCancelled,
  manualCowCreationStarted,
  manualCowAdded,
  manualCowCreationFailed,
} from "../store/herdSlice";

import {
  selectHerdCows,
  selectHerdActiveOperation,
  selectHerdOperationStatus,
  selectHerdOperationError,
  selectHerdUploadStatus,
  selectHerdUploadError,
  selectHerdUploadProgress,
  selectManualCowStatus,
  selectManualCowError,
} from "../store/herdSelectors";

import type {
  Cow,
  HerdFilter,
  ManualCowInput,
} from "../types";

import {
  calculateHerdStats,
  filterHerd,
} from "../selectors";


import {
  createManualCow,
  uploadHerdImages,
} from "../api/herd.service";
import { validateHerdImages } from "../utils";

function createId(): string {
  if (
    typeof crypto !== "undefined" &&
    "randomUUID" in crypto
  ) {
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
  const dispatch = useAppDispatch();

  const cows = useAppSelector(selectHerdCows);
  const activeOperation = useAppSelector(
    selectHerdActiveOperation,
  );

  const status = useAppSelector(selectHerdOperationStatus);
  const error = useAppSelector(selectHerdOperationError);

  const uploadStatus = useAppSelector(selectHerdUploadStatus);
  const uploadError = useAppSelector(selectHerdUploadError);
  const uploadProgress = useAppSelector(
    selectHerdUploadProgress,
  );

  const manualStatus = useAppSelector(selectManualCowStatus);
  const manualError = useAppSelector(selectManualCowError);

  const [filter, setFilter] = useState<HerdFilter>("all");

  const isUploadingRef = useRef(false);
  const isCreatingCowRef = useRef(false);
  const abortRef = useRef<AbortController | null>(null);

  const stats = useMemo(
    () => calculateHerdStats(cows),
    [cows],
  );

  const filteredCows = useMemo(
    () => filterHerd(cows, filter),
    [cows, filter],
  );

  useEffect(() => {
    return () => {
      abortRef.current?.abort();
    };
  }, []);

  const uploadImages = useCallback(
    async (
      files: File[],
      onProgress?: (progress: number) => void,
    ) => {
      if (
        isUploadingRef.current ||
        isCreatingCowRef.current ||
        activeOperation !== null
      ) {
        return;
      }

      const validationError = validateHerdImages(files);

      if (validationError) {
        dispatch(uploadFailed(validationError));
        return;
      }

      isUploadingRef.current = true;

      const controller = new AbortController();
      abortRef.current = controller;

      dispatch(uploadStarted());

      try {
        const result = await uploadHerdImages(files, {
          signal: controller.signal,
          onProgress: (progress) => {
            dispatch(uploadProgressUpdated(progress));
            onProgress?.(progress);
          },
        });

        dispatch(herdUploadSucceeded(result.cows));
      } catch (err) {
        if (
          err instanceof Error &&
          err.name === "AbortError"
        ) {
          dispatch(uploadCancelled());
          return;
        }

        dispatch(
          uploadFailed(
            "آپلود تصاویر ناموفق بود. دوباره تلاش کنید.",
          ),
        );
      } finally {
        isUploadingRef.current = false;
        abortRef.current = null;
      }
    },
    [activeOperation, dispatch],
  );

  const cancelUpload = useCallback(() => {
    abortRef.current?.abort();
  }, []);

  const addManualCow = useCallback(
    async (input: ManualCowInput): Promise<boolean> => {
      if (
        isUploadingRef.current ||
        isCreatingCowRef.current ||
        activeOperation !== null
      ) {
        return false;
      }

      const earTag = input.earTag.trim();

      if (!earTag) {
        dispatch(
          manualCowCreationFailed("شماره گوش الزامی است."),
        );

        return false;
      }

      isCreatingCowRef.current = true;
      dispatch(manualCowCreationStarted());

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

        dispatch(manualCowAdded(cow));
        setFilter("all");

        return true;
      } catch (err) {
        dispatch(
          manualCowCreationFailed(
            err instanceof Error
              ? err.message
              : "ثبت دام ناموفق بود. دوباره تلاش کنید.",
          ),
        );

        return false;
      } finally {
        isCreatingCowRef.current = false;
      }
    },
    [activeOperation, dispatch],
  );

  return {
    cows,
    filteredCows,
    stats,
    filter,
    setFilter,

    // سازگاری با کامپوننت‌هایی که قبلاً از این دو مقدار استفاده می‌کردند.
    status,
    error,

    // دسترسی مستقل به وضعیت هر عملیات
    uploadStatus,
    uploadError,
    uploadProgress,
    manualStatus,
    manualError,

    isUploading: activeOperation === "upload",
    isCreatingCow: activeOperation === "manual",

    uploadImages,
    cancelUpload,
    addManualCow,
  };
}
