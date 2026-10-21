import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type { Cow, HerdOperationStatus } from "../types";

export type HerdOperationName = "upload" | "manual";

interface OperationState {
  status: HerdOperationStatus;
  error: string | null;
}

interface HerdState {
  cows: Cow[];

  // صرفاً برای تشخیص منشأ دام‌ها؛ نه فیلتر Analytics
  uploadedCowIds: string[];
  hasSuccessfulUpload: boolean;

  operations: {
    upload: OperationState & {
      progress: number;
    };
    manual: OperationState;
  };

  activeOperation: HerdOperationName | null;
  lastOperation: HerdOperationName | null;
}

const initialOperation: OperationState = {
  status: "idle",
  error: null,
};

const initialState: HerdState = {
  cows: [],
  uploadedCowIds: [],
  hasSuccessfulUpload: false,

  operations: {
    upload: {
      ...initialOperation,
      progress: 0,
    },
    manual: { ...initialOperation },
  },

  activeOperation: null,
  lastOperation: null,
};

function upsertCows(existing: Cow[], incoming: Cow[]): Cow[] {
  const byId = new Map(existing.map((cow) => [cow.id, cow]));

  for (const cow of incoming) {
    byId.set(cow.id, {
      ...byId.get(cow.id),
      ...cow,
    });
  }

  return Array.from(byId.values());
}

const herdSlice = createSlice({
  name: "herd",
  initialState,

  reducers: {
    uploadStarted(state) {
      if (state.activeOperation !== null) return;

      state.activeOperation = "upload";
      state.lastOperation = "upload";
      state.operations.upload.status = "loading";
      state.operations.upload.error = null;
      state.operations.upload.progress = 0;
    },

    uploadProgressUpdated(state, action: PayloadAction<number>) {
      if (state.activeOperation !== "upload") return;

      state.operations.upload.progress = Math.max(
        0,
        Math.min(100, action.payload),
      );
    },

    herdUploadSucceeded(state, action: PayloadAction<Cow[]>) {
      // دام‌های جدید اضافه می‌شوند و دام‌های موجود با ID یکسان
      // به‌روزرسانی می‌شوند؛ رکوردهای قبلی بی‌دلیل حذف نمی‌شوند.
      state.cows = upsertCows(state.cows, action.payload);

      const uploadedIds = new Set(state.uploadedCowIds);

      for (const cow of action.payload) {
        uploadedIds.add(cow.id);
      }

      state.uploadedCowIds = Array.from(uploadedIds);
      state.hasSuccessfulUpload = true;

      state.operations.upload.status = "success";
      state.operations.upload.error = null;
      state.operations.upload.progress = 100;

      if (state.activeOperation === "upload") {
        state.activeOperation = null;
      }
    },

    uploadFailed(state, action: PayloadAction<string>) {
      state.lastOperation = "upload";
      state.operations.upload.status = "error";
      state.operations.upload.error = action.payload;

      if (state.activeOperation === "upload") {
        state.activeOperation = null;
      }
    },

    uploadCancelled(state) {
      state.operations.upload.status = "idle";
      state.operations.upload.error = null;
      state.operations.upload.progress = 0;

      if (state.activeOperation === "upload") {
        state.activeOperation = null;
      }
    },

    manualCowCreationStarted(state) {
      if (state.activeOperation !== null) return;

      state.activeOperation = "manual";
      state.lastOperation = "manual";
      state.operations.manual.status = "loading";
      state.operations.manual.error = null;
    },

    manualCowAdded(state, action: PayloadAction<Cow>) {
      state.cows = upsertCows(state.cows, [action.payload]);

      state.operations.manual.status = "success";
      state.operations.manual.error = null;

      if (state.activeOperation === "manual") {
        state.activeOperation = null;
      }
    },

    manualCowCreationFailed(state, action: PayloadAction<string>) {
      state.operations.manual.status = "error";
      state.operations.manual.error = action.payload;

      if (state.activeOperation === "manual") {
        state.activeOperation = null;
      }
    },

    cowUpdated(state, action: PayloadAction<Cow>) {
      const index = state.cows.findIndex((cow) => cow.id === action.payload.id);

      if (index !== -1) {
        state.cows[index] = action.payload;
      }
    },

    cowRemoved(state, action: PayloadAction<string>) {
      state.cows = state.cows.filter((cow) => cow.id !== action.payload);

      state.uploadedCowIds = state.uploadedCowIds.filter(
        (id) => id !== action.payload,
      );
    },

    herdOperationReset(state) {
      if (state.activeOperation !== null) return;

      state.operations = {
        upload: {
          status: "idle",
          error: null,
          progress: 0,
        },
        manual: {
          status: "idle",
          error: null,
        },
      };

      state.lastOperation = null;
    },
  },
});

export const {
  uploadStarted,
  uploadProgressUpdated,
  herdUploadSucceeded,
  uploadFailed,
  uploadCancelled,
  manualCowCreationStarted,
  manualCowAdded,
  manualCowCreationFailed,
  cowUpdated,
  cowRemoved,
  herdOperationReset,
} = herdSlice.actions;

export default herdSlice.reducer;
