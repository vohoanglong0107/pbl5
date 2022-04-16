import cookie from "cookie";
import { COOKIE_NAME } from "../constants";
import { IOHandler } from "./Handler";
import registerGameHandler from "./game";

const ConnectHandler: IOHandler = (io) => {
  io.on("connection", (socket) => {
    socket.data.sessionID = cookie.parse(socket.client.request.headers.cookie!)[
      COOKIE_NAME
    ];
    registerGameHandler(io, socket);
  });
};

export default ConnectHandler;
