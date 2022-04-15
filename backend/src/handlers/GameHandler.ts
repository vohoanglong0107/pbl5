import debug from "debug";
import { Handler } from "./Handler";
import gameManager from "../game/GameManager";

const debugLog = debug("backend:socket");

const GameHandler: Handler = (io, socket) => {
  const startGameHandler = (gameId: string) => {
    debugLog(`game ${gameId} started by ${socket.data.sessionID}`);
  };
  const joinGameHandler = (gameId: string) => {
    debugLog(`${socket.data.sessionID} join game ${gameId}`);
    gameManager.getGame(gameId)?.connectUser(socket.data.sessionID!);
  };
  socket.on("game:start", startGameHandler);
  socket.on("game:join", joinGameHandler);
};

export default GameHandler;
