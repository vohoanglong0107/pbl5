import cookie from "cookie";
import debug from "debug";
import { COOKIE_NAME } from "../contants";
import { IOHandler } from "./Handler";
import registerGameHandler from "./GameHandler";

const debugLog = debug("backend:socket");

const ConnectHandler: IOHandler = (io) => {
  io.on("connection", (socket) => {
    debugLog(`Client connected: ${socket.id}`);
    debugLog(`Client cookies: ${socket.client.request.headers.cookie}`);
    socket.data.sessionID = cookie.parse(socket.client.request.headers.cookie!)[
      COOKIE_NAME
    ];
    registerGameHandler(io, socket);
    // socket.on("disconnect", () => {
    //   debugLog(`Client disconnected: ${socket.id}`);
    // });
  });
};

export default ConnectHandler;
