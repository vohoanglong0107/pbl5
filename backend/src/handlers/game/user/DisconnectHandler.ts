import debug from "debug";
import { SocketHandler } from "@/handlers/Handler";
import gameManager from "@/game/GameManager";

const debugLog = debug("backend:socket:user");

const DisconnectHandler: SocketHandler = (io, socket) => {
  const disconnectGameHandler = () => {
    const game = socket.data.game!;
    debugLog(`${socket.data.sessionID} disconnected from game ${game.id}`);
    socket.to(game.id).emit("game:user:disconnected", {
      id: socket.data.sessionID!,
      username: game.connectedUsers.get(socket.data.sessionID!)!.username,
    });
    game.disconnectUser(socket.data.sessionID!);
  };
  socket.on("disconnect", disconnectGameHandler);
};

export default DisconnectHandler;
