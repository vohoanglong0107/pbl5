import { gameUpdated } from "@/components/game/gameSlice";
import { io, Socket } from "socket.io-client";
import { ClientToServerEvents, ServerToClientEvents } from "./events";
import store from "./store";
const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
  "http://localhost:8000",
  {
    autoConnect: false,
    withCredentials: true,
  }
);

socket.on("game:started", (game) => {
  store.dispatch(gameUpdated(game));
});

socket.on("game:connected", (game) => {
  store.dispatch(gameUpdated(game));
});

socket.on("game:disconnected", (game) => {
  store.dispatch(gameUpdated(game));
});

socket.on("game:took-slot", (game) => {
  store.dispatch(gameUpdated(game));
});

socket.on("game:drew-card", (game) => {
  store.dispatch(gameUpdated(game));
});

// FIXME: Handle connection errors
socket.on("connect_error", (err) => {});

socket.onAny((event, ...args) => {
  console.log(event, args);
});

export default socket;
