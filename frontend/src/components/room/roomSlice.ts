import apiSlice from "../apiSlice";
import { socketClient } from "@/lib/SocketClient";
import Room from "./Room";
import { gameUpdated } from "../game/gameSlice";
import { User } from "../user";
import { Game } from "../game";
import RoomSetting from "../setting/RoomSetting";
import { settingUpdated } from "../setting/settingSlice";
import { chatUpdated } from "../chat/chatSlice";
import { createAction, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { Chat } from "./../chat/ChatHistory"

interface RoomApi {
  id: string;
  connectedUsers: User[];
  game: Game;
  roomSetting: RoomSetting;
  // chatHistory: ChatHistory;
  chatHistory: Chat[];
}

const RoomStateChanged = createAction<RoomApi>("room/stateChanged");

const roomApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createRoom: builder.mutation<{ gameId: string }, void>({
      query: () => ({
        url: "/game/create",
        method: "POST",
      }),
    }),

    getRoom: builder.query<RoomApi, string>({
      query: (gameId) => `/game/${gameId}`,
      async onCacheEntryAdded(
        arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved, dispatch }
      ) {
        const updateLocalData = (room: RoomApi) => {
          dispatch(RoomStateChanged(room));
          dispatch(gameUpdated(room.game));
          dispatch(settingUpdated(room.roomSetting));
          dispatch(chatUpdated(room.chatHistory));
        };
        const updateCachedDataWithRoom = (room: RoomApi) => {
          updateCachedData((draft) => room);
          updateLocalData(room);
        };
        try {
          const roomAPIResponse = await cacheDataLoaded;
          updateLocalData(roomAPIResponse.data);
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

const emptyUsers = [] as User[];

const initialState: Room = {
  id: "",
  connectedUsers: emptyUsers,
};

const matchRoomStateChanged = isAnyOf(
  RoomStateChanged,
  roomApiSlice.endpoints.getRoom.matchFulfilled
);

const roomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {
    setRoomId: (state, action) => {
      state.id = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      roomApiSlice.endpoints.createRoom.matchFulfilled,
      (state, action) => {
        state.id = action.payload.gameId;
      }
    );
    builder.addMatcher(matchRoomStateChanged, (state, action) => {
      state.connectedUsers = action.payload.connectedUsers;
    });
  },
});

export const selectConnectedUsers = (state: Room) => state.connectedUsers;
export default roomSlice;
