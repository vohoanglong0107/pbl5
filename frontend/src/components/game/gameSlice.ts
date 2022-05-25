import apiSlice from "../apiSlice";
import { socketClient } from "@/lib/SocketClient";
import Game from "./Game";
import { IdleState } from "./GameState";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Response {
  type: number;
  data: unknown;
}

export enum CardCommands {
  DEFUSE,
  EXPLODE,
  SKIP,
  CAT,
  SEE_THE_FUTURE,
}

export const initialState: Game = {
  currentState: {
    type: "IdleState",
  } as IdleState,
  players: [],
};

const gameApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    startGame: builder.mutation<unknown, void>({
      queryFn: () => {
        return socketClient
          .emit("game:start")
          .then((data) => ({ data: data }))
          .catch((error) => ({ error: error }));
      },
    }),
    takeSeat: builder.mutation<unknown, number>({
      queryFn: (seatId) => {
        return socketClient
          .emit("game:take-seat", seatId)
          .then((data) => ({ data: data }))
          .catch((error) => ({ error: error }));
      },
    }),
    drawCard: builder.mutation<unknown, void>({
      queryFn: () => {
        return socketClient
          .emit("game:draw-card")
          .then((data) => ({ data: data }))
          .catch((error) => ({ error: error }));
      },
    }),
    playCard: builder.mutation<Response, number[]>({
      queryFn: (cardIds) => {
        return socketClient
          .emit("game:play-card", cardIds)
          .then((data) => ({ data: data as Response }))
          .catch((error) => ({ error: error }));
      },
    }),
    targetPlayer: builder.mutation<unknown, string>({
      queryFn: (playerId) => {
        return socketClient
          .emit("game:target-player", playerId)
          .then((data) => ({ data: data }))
          .catch((error) => ({ error: error }));
      },
    }),
  }),
});

export const {
  useStartGameMutation,
  useTakeSeatMutation,
  useDrawCardMutation,
  usePlayCardMutation,
  useTargetPlayerMutation,
} = gameApiSlice;

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    gameUpdated(state, action: PayloadAction<Game>) {
      return action.payload;
    },
  },
});

export default gameSlice;

export const { gameUpdated } = gameSlice.actions;
export const selectCurrentState = (state: Game) => state.currentState;
export const selectPlayers = (state: Game) => state.players;
