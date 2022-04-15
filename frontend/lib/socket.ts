import { io, Socket } from "socket.io-client";
import store, {
  getUsers,
  userConnect,
  UserOnline,
  Users,
  Message,
  addMessage,
} from "./store";
import { ServerToClientEvents, ClientToServerEvents } from "./events";
const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
  "http://localhost:8000",
  {
    autoConnect: false,
    withCredentials: true,
  }
);

const { dispatch } = store;

socket.on("connect_error", (err) => {
  console.log(err);
});

socket.onAny((event, ...args) => {
  console.log(event, args);
});

export default socket;
