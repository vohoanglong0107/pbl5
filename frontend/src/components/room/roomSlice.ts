import apiSlice from "../apiSlice";
import { socketClient } from "@/lib/SocketClient";
import Room from "./Room";
import {
  gameUpdated,
  initialState as gameInitialState,
} from "../game/gameSlice";
import { User } from "../user";
import { Game } from "../game";
import RoomSetting from "../setting/RoomSetting";
import {
  initialState as roomSettingInitialState,
  settingUpdated,
} from "../setting/settingSlice";
import { createSelector } from "@reduxjs/toolkit";

interface RoomApi {
  id: string;
  connectedUsers: User[];
  game: Game;
  roomSetting: RoomSetting;
}

const emptyUsers = [] as User[];

const initialState: RoomApi = {
  id: "",
  connectedUsers: emptyUsers,
  game: gameInitialState,
  roomSetting: roomSettingInitialState,
};

const roomApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createRoom: builder.mutation<{ gameId: string }, void>({
      query: () => ({
        url: "/game/create",
        method: "POST",
      }),
    }),

    getRoom: builder.query<RoomApi, void>({
      queryFn: () => ({ data: initialState }),
      async onCacheEntryAdded(
        arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved, dispatch }
      ) {
        const updateCachedDataWithRoom = (room: RoomApi) => {
          updateCachedData((draft) => room);
          dispatch(gameUpdated(room.game));
          dispatch(settingUpdated(room.roomSetting));
        };
        try {
          await cacheDataLoaded;
          socketClient.on("room:state-changed", updateCachedDataWithRoom);
        } catch {
          // no-op when cacheEntryRemoved resolve after cacheEntryRemoved
        }
        await cacheEntryRemoved;
        socketClient.off("room:state-changed", updateCachedDataWithRoom);
      },
    }),
  }),
});

export const { useCreateRoomMutation, useGetRoomQuery } = roomApiSlice;

export const selectRoomAPIResult = roomApiSlice.endpoints.getRoom.select();
export const selectConnectedUsers = createSelector(
  selectRoomAPIResult,
  (roomAPIResult) => roomAPIResult.data?.connectedUsers ?? emptyUsers
);
