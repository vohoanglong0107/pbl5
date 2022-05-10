import apiSlice from "../apiSlice";
import { socketClient } from "@/lib/SocketClient";
import Game from "./Game";

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

const gameApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createGame: builder.mutation<{ gameId: string }, void>({
      query: () => ({
        url: "/game/create",
        method: "POST",
      }),
    }),

    getGame: builder.query<Game, string>({
      query: (gameId) => `/game/${gameId}`,
      async onCacheEntryAdded(
        gameId,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) {
        const updateCachedDataWithGame = (game: Game) => {
          updateCachedData((draft) => game);
        };
        try {
          await cacheDataLoaded;
          socketClient.connect({ gameId });

          socketClient.on("room:state-changed", updateCachedDataWithGame);
        } catch {
          // no-op when cacheEntryRemoved resolve after cacheEntryRemoved
        }
        await cacheEntryRemoved;
        socketClient.off("room:state-changed", updateCachedDataWithGame);
      },
    }),
    startGame: builder.mutation<unknown, void>({
      queryFn: () => {
        return socketClient
          .emit("room:start-game")
          .then((data) => ({ data: data }))
          .catch((error) => ({ error: error }));
      },
    }),
    takeSeat: builder.mutation<unknown, number>({
      queryFn: (seatId) => {
        return socketClient
          .emit("room:take-seat", seatId)
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
    playCard: builder.mutation<Response, string[]>({
      queryFn: (cardIds) => {
        return socketClient
          .emit("game:play-card", cardIds)
          .then((data) => ({ data: data as Response }))
          .catch((error) => ({ error: error }));
      },
    }),
  }),
});

export const {
  useCreateGameMutation,
  useGetGameQuery,
  useStartGameMutation,
  useTakeSeatMutation,
  useDrawCardMutation,
  usePlayCardMutation,
} = gameApiSlice;
