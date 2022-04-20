import debug from "debug";
import GameModel from "@/game/GameModel";
import { SocketHandler } from "@/handlers/Handler";
import { UserConnectEvent } from "@/events";

const debugLog = debug("backend:socket:user");

const ConnectHandler: SocketHandler = (io, socket) => {
  const connectGameHandler: UserConnectEvent = (getGame) => {
    const game = socket.data.game!;
    debugLog(`${socket.data.sessionID} connected to game ${game.id}`);
    game.connectUser(socket.data.sessionID!);
    socket.join(game.id);
    socket.to(game.id).emit("game:user:connected", {
      id: socket.data.sessionID!,
      username: game.connectedUsers.get(socket.data.sessionID!)!.username,
    });
    getGame(new GameModel(game));
  };
  socket.on("game:user:connect", connectGameHandler);
};

export default ConnectHandler;
