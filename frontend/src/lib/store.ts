import { configureStore } from "@reduxjs/toolkit";
import { gamesSlice } from "@/components/game";
import { gameUpdated, gameConnectedError } from "@/components/game/gamesSlice";
import socket from "./socket";
const store = configureStore({
  reducer: {
    game: gamesSlice,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

socket.on("game:started", (game) => {
  console.log("Game started");
  store.dispatch(gameUpdated(game));
});

socket.on("user:connected", (game) => {
  console.log("Socket connected");
  store.dispatch(gameUpdated(game));
});

socket.on("user:disconnected", (game) => {
  console.log("Socket disconnected");
  store.dispatch(gameUpdated(game));
});

socket.on("user:took-slot", (game) => {
  console.log("Socket disconnected");
  store.dispatch(gameUpdated(game));
});

socket.on("connect_error", (err) => {
  console.log("Socket connection error");
  console.log(err);
  if (socket.auth && "gameId" in socket.auth) {
    alert(`Could not connect to game ${socket.auth.gameId}`);
    store.dispatch(gameConnectedError(socket.auth.gameId));
  }
});
