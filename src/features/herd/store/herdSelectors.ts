
import { createSelector } from "@reduxjs/toolkit";

import type { RootState } from "@/store/store";

export const selectHerdCows = (state: RootState) =>
  state.herd.cows;

export const selectUploadedCowIds = (state: RootState) =>
  state.herd.uploadedCowIds;

export const selectHasSuccessfulHerdUpload = (state: RootState) =>
  state.herd.hasSuccessfulUpload;

export const selectHerdActiveOperation = (state: RootState) =>
  state.herd.activeOperation;

export const selectHerdUploadStatus = (state: RootState) =>
  state.herd.operations.upload.status;

export const selectHerdUploadError = (state: RootState) =>
  state.herd.operations.upload.error;

export const selectHerdUploadProgress = (state: RootState) =>
  state.herd.operations.upload.progress;

export const selectManualCowStatus = (state: RootState) =>
  state.herd.operations.manual.status;

export const selectManualCowError = (state: RootState) =>
  state.herd.operations.manual.error;

export const selectHerdOperationStatus = createSelector(
  [
    (state: RootState) => state.herd.lastOperation,
    (state: RootState) => state.herd.operations,
  ],
  (lastOperation, operations) =>
    lastOperation ? operations[lastOperation].status : "idle",
);

export const selectHerdOperationError = createSelector(
  [
    (state: RootState) => state.herd.lastOperation,
    (state: RootState) => state.herd.operations,
  ],
  (lastOperation, operations) =>
    lastOperation ? operations[lastOperation].error : null,
);

// تمام دام‌های ثبت‌شده، چه دستی و چه آپلودی.
export const selectAnalyticsCows = selectHerdCows;

export const selectHerdCowCount = createSelector(
  [selectHerdCows],
  (cows) => cows.length,
);
