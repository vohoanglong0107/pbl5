import User from "./User";
import apiSlice from "../apiSlice";
import { socketClient } from "@/lib/SocketClient";
import { createSelector } from "@reduxjs/toolkit";

const initialState: User = {
  id: "",
  username: "",
};

const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query<User, void>({
      queryFn: () => ({ data: initialState }),
      async onCacheEntryAdded(
        arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) {
        const updateCachedDataWithUser = (user: User) => {
          updateCachedData((draft) => user);
        };
        try {
          await cacheDataLoaded;
          socketClient.on("user:connect", updateCachedDataWithUser);
        } catch {}
        await cacheEntryRemoved;
        socketClient.off("user:connect", updateCachedDataWithUser);
      },
    }),
  }),
});

export const { useGetUserQuery } = userApiSlice;
export const selectUser = createSelector(
  userApiSlice.endpoints.getUser.select(),
  (userResult) => userResult.data ?? initialState
);
