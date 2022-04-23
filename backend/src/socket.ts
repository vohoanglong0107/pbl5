import http from "http";
import { Server } from "socket.io";
import { FRONTEND_DOMAIN, COOKIE_NAME } from "./constants";
import {
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData,
} from "./events";

export default function createIO(server: http.Server) {
  const io = new Server<
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents,
    SocketData
  >(server, {
    cors: {
      origin: `http://${FRONTEND_DOMAIN}:3000`,
      credentials: true,
    },
    cookie: {
      name: COOKIE_NAME,
      path: "/",
      httpOnly: true,
      sameSite: "none",
      secure: true,
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365 * 1),
    },
  });
  return io;
}
