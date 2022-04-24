import debug from "debug";
import { SocketHandler } from "../Handler";
import GameModel from "@/game/GameModel";

const debugLog = debug("backend:socket:game");

const StartGameHandler: SocketHandler = (io, socket) => {
  const startGameHandler = () => {
    const game = socket.data.game!;
    debugLog(`game ${game.id} started by ${socket.data.sessionID}`);
    game.startGame();
    io.to(game.id).emit("game:started", new GameModel(game));
  };
  socket.on("game:start", startGameHandler);
};

export default StartGameHandler;
