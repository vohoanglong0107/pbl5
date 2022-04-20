import { configureStore } from "@reduxjs/toolkit";
import { gamesSlice } from "@/components/game";
import {
  userConnected,
  userDisconnected,
  gameConnectedError,
} from "@/components/game/gamesSlice";
import socket from "./socket";
const store = configureStore({
  reducer: {
    game: gamesSlice,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

socket.on("game:user:connected", (user) => {
  console.log("Socket connected");
  store.dispatch(userConnected(user));
});

socket.on("game:user:disconnected", (user) => {
  console.log("Socket disconnected");
  store.dispatch(userDisconnected(user));
});

socket.on("connect_error", (err) => {
  console.log("Socket connection error");
  console.log(err);
  if (socket.auth && "gameId" in socket.auth) {
    alert(`Could not connect to game ${socket.auth.gameId}`);
    store.dispatch(gameConnectedError(socket.auth.gameId));
  }
});
