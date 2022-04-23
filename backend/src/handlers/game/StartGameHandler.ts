import debug from "debug";
import { SocketHandler } from "../Handler";

const debugLog = debug("backend:socket:game");

const StartGameHandler: SocketHandler = (io, socket) => {
  const startGameHandler = () => {
    debugLog(
      `game ${socket.data.game?.id} started by ${socket.data.sessionID}`
    );
  };
  socket.on("game:start", startGameHandler);
};

export default StartGameHandler;
