import debug from "debug";
import { SocketHandler } from "@/handlers/Handler";
import GameModel from "@/model/Game";

const debugLog = debug("backend:socket:user");

const DisconnectHandler: SocketHandler = (io, socket) => {
  const disconnectGameHandler = () => {
    const game = socket.data.game!;
    debugLog(`${socket.data.sessionID} disconnected from game ${game.id}`);
    game.disconnectUser(socket.data.sessionID!);
    socket.to(game.id).emit("user:disconnected", new GameModel(game));
  };
  socket.on("disconnect", disconnectGameHandler);
};

export default DisconnectHandler;
