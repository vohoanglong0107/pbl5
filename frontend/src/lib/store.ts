import { configureStore } from "@reduxjs/toolkit";
import apiSlice from "@/components/apiSlice";

import settingSlice from "@/components/setting/settingSlice";
import gameSlice from "@/components/game/gameSlice";
import roomSlice from "@/components/room/roomSlice";
import chatSlice from "@/components/chat/chatSlice";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    [gameSlice.name]: gameSlice.reducer,
    [settingSlice.name]: settingSlice.reducer,
    [roomSlice.name]: roomSlice.reducer,
    [chatSlice.name]: chatSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
