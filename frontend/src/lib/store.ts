import { configureStore } from "@reduxjs/toolkit";
import apiSlice from "@/components/apiSlice";

import settingSlice from "@/components/setting/settingSlice";
import gameSlice from "@/components/game/gameSlice";
const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    [gameSlice.name]: gameSlice.reducer,
    [settingSlice.name]: settingSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
