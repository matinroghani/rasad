"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";


import { useAppSelector } from "@/store/hooks";

import { calculateHerdStats } from "@/features/herd/selectors";

import { getDiseaseModules } from "../api/disease.service";

import type {
  DiseaseModule,
  DiseaseModuleRecord,
} from "../types";
import { DISEASE_MODULE_ICONS } from "@/data/constants/diseasPage/disease";

export function useDisease() {
  const cows = useAppSelector(
    (state) => state.herd.cows,
  );

  const [moduleRecords, setModuleRecords] =
    useState<DiseaseModuleRecord[]>([]);

  const [isLoading, setIsLoading] = useState(true);

  const [error, setError] = useState<string | null>(
    null,
  );

  const [retryKey, setRetryKey] = useState(0);

  const stats = useMemo(
    () => calculateHerdStats(cows),
    [cows],
  );

  const modules = useMemo<DiseaseModule[]>(
    () =>
      moduleRecords.map((module) => ({
        ...module,
        icon: DISEASE_MODULE_ICONS[module.id],
      })),
    [moduleRecords],
  );

  useEffect(() => {
    const controller = new AbortController();

    async function loadModules() {
      try {
        setIsLoading(true);
        setError(null);

        const response = await getDiseaseModules(
          controller.signal,
        );

        if (controller.signal.aborted) {
          return;
        }

        setModuleRecords(response.data);
      } catch (cause) {
        if (
          cause instanceof Error &&
          cause.name === "AbortError"
        ) {
          return;
        }

        setError(
          cause instanceof Error
            ? cause.message
            : "دریافت اطلاعات بیماری ناموفق بود.",
        );
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    void loadModules();

    return () => {
      controller.abort();
    };
  }, [retryKey]);

  const retry = useCallback(() => {
    setRetryKey((current) => current + 1);
  }, []);

  return {
    stats: {
      treatedCows: stats.treatedCows,
      photographedCows: stats.photographedCows,
    },
    modules,
    isLoading,
    error,
    retry,
  };
}