import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Game from "./Game";
import { User } from "../user";
import socket from "@/lib/socket";

type StateType = {
  game?: Game;
  hasError: boolean;
};

const initialState: StateType = {
  hasError: false,
};

const gamesSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    gameConnected(state, action: PayloadAction<Game>) {
      state.game = action.payload;
    },
    gameConnectedError(state, action: PayloadAction<string>) {
      state.hasError = true;
    },
    userConnected(state, action: PayloadAction<User>) {
      console.log(`user connected ${JSON.stringify(action.payload)}`);
      state.game!.connectedUsers.push(action.payload);
    },
    userDisconnected(state, action: PayloadAction<User>) {
      console.log(`user disconnected ${JSON.stringify(action.payload)}`);
      state.game!.connectedUsers = state.game!.connectedUsers.filter(
        (user) => user.id !== action.payload.id
      );
    },
  },
});

export default gamesSlice.reducer;
export const selectError = (state: StateType) => state.hasError;

export const {
  gameConnected,
  gameConnectedError,
  userConnected,
  userDisconnected,
} = gamesSlice.actions;
