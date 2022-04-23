import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Game from "./Game";

type StateType = Game | null;

const initialState: StateType = null as StateType;

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    gameUpdated(state, action: PayloadAction<Game>) {
      return action.payload;
    },
  },
});

export default gameSlice.reducer;

export const { gameUpdated } = gameSlice.actions;
