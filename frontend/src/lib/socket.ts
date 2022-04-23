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
  console.log("User took slot");
  store.dispatch(gameUpdated(game));
});

socket.on("user:drew-card", (game) => {
  console.log("User drew card");
  store.dispatch(gameUpdated(game));
});

// FIXME: Handle connection errors
socket.on("connect_error", (err) => {});

socket.onAny((event, ...args) => {
  console.log(event, args);
});

export default socket;
