import User from "./User";
import apiSlice from "../apiSlice";
import { socketClient } from "@/lib/SocketClient";

type StateType = User | null;

const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query<User, void>({
      queryFn: () => ({ data: { id: "0", username: "null" } }),
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
