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
    gameUpdated(state, action: PayloadAction<Game>) {
      state.game = action.payload;
    },
    gameConnectedError(state, action) {
      state.hasError = true;
    },
  },
});

export default gamesSlice.reducer;

export const { gameUpdated, gameConnectedError } = gamesSlice.actions;
