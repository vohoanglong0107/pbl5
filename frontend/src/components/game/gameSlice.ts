import apiSlice from "../apiSlice";
import { socketClient } from "@/lib/SocketClient";
import Game from "./Game";

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

          for (const event of [
            "game:started",
            "game:connected",
            "game:disconnected",
            "game:took-seat",
            "game:played-card",
            "game:drew-card",
            "game:over",
          ]) {
            console.log(`patch data in in event ${event}`);
            socketClient.on(event, updateCachedDataWithGame);
          }
        } catch {
          // no-op when cacheEntryRemoved resolve after cacheEntryRemoved
        }
        await cacheEntryRemoved;
        for (const event in [
          "game:started",
          "game:connected",
          "game:disconnected",
        ]) {
          socketClient.off(event, updateCachedDataWithGame);
        }
      },
    }),
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
    playCard: builder.mutation<unknown, string[]>({
      queryFn: (cardIds) => {
        return socketClient
          .emit("game:play-card", cardIds)
          .then((data) => ({ data: data }))
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
