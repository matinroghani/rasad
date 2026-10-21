
import { configureStore } from "@reduxjs/toolkit";

import herdReducer from "@/features/herd/store/herdSlice";

export const makeStore = () =>
  configureStore({
    reducer: {
      herd: herdReducer,
    },
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
