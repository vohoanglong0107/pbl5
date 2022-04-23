import debug from "debug";
import GameModel from "@/game/GameModel";
import { SocketHandler } from "@/handlers/Handler";

const debugLog = debug("backend:socket:user");

const ConnectHandler: SocketHandler = (io, socket) => {
  const connectGameHandler = () => {
    const game = socket.data.game!;
    debugLog(`${socket.data.sessionID} connected to game ${game.id}`);
    game.connectUser(socket.data.sessionID!);
    socket.join(game.id);
    io.to(game.id).emit("user:connected", new GameModel(game));
  };
  socket.on("user:connect", connectGameHandler);
};

export default ConnectHandler;
