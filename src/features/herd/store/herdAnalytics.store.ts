import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import { mockHerd } from "@/data/fixtures/herd";
import type { Cow } from "../types";

interface HerdState {
  cows: Cow[];
  uploadedCowIds: string[];
  hasSuccessfulUpload: boolean;
}

const initialState: HerdState = {
  cows: mockHerd.map((cow) => ({ ...cow })),
  uploadedCowIds: [],
  hasSuccessfulUpload: false,
};

const herdSlice = createSlice({
  name: "herd",
  initialState,
  reducers: {
    herdUploadSucceeded(state, action: PayloadAction<Cow[]>) {
      state.hasSuccessfulUpload = true;

      for (const cow of action.payload) {
        const existingIndex = state.cows.findIndex(
          (item) => item.id === cow.id,
        );

        if (existingIndex >= 0) {
          state.cows[existingIndex] = cow;
        } else {
          state.cows.unshift(cow);
        }

        if (!state.uploadedCowIds.includes(cow.id)) {
          state.uploadedCowIds.push(cow.id);
        }
      }
    },

    manualCowAdded(state, action: PayloadAction<Cow>) {
      const exists = state.cows.some(
        (cow) => cow.id === action.payload.id,
      );

      if (!exists) {
        state.cows.unshift(action.payload);
      }
    },

    cowUpdated(state, action: PayloadAction<Cow>) {
      const index = state.cows.findIndex(
        (cow) => cow.id === action.payload.id,
      );

      if (index >= 0) {
        state.cows[index] = action.payload;
      }
    },

    cowRemoved(state, action: PayloadAction<string>) {
      state.cows = state.cows.filter(
        (cow) => cow.id !== action.payload,
      );

      state.uploadedCowIds = state.uploadedCowIds.filter(
        (id) => id !== action.payload,
      );
    },
  },
});

export const {
  herdUploadSucceeded,
  manualCowAdded,
  cowUpdated,
  cowRemoved,
} = herdSlice.actions;

export default herdSlice.reducer;