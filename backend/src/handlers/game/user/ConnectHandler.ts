import debug from "debug";
import GameModel from "@/model/Game";
import User from "@/game/User";
import { SocketHandler } from "@/handlers/Handler";

const debugLog = debug("backend:socket:user");

const ConnectHandler: SocketHandler = (io, socket) => {
  const connectGameHandler = (getUser: (user: User) => void) => {
    const game = socket.data.game!;
    debugLog(`${socket.data.sessionID} connected to game ${game.id}`);
    game.connectUser(socket.data.sessionID!);
    socket.join(game.id);

    getUser(game.connectedUsers.get(socket.data.sessionID!)!);
    io.to(game.id).emit("user:connected", new GameModel(game));
  };
  socket.on("user:connect", connectGameHandler);
};

export default ConnectHandler;
