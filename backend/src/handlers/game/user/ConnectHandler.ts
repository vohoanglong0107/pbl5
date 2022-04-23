import debug from "debug";
import { SocketHandler } from "@/handlers/Handler";
import { UserConnectEvent } from "@/events";

const debugLog = debug("backend:socket:user");

const ConnectHandler: SocketHandler = (io, socket) => {
  const connectGameHandler: UserConnectEvent = (populateConnectedUsersIds) => {
    const game = socket.data.game!;
    debugLog(`${socket.data.sessionID} connected to game ${game.id}`);
    game.connectUser(socket.data.sessionID!);
    socket.join(game.id);
    populateConnectedUsersIds([...game.connectedUsers.values()]);
    socket.to(game.id).emit("game:user:connected", {
      id: socket.data.sessionID!,
      username: socket.data.sessionID!,
    });
  };
  socket.on("game:user:connect", connectGameHandler);
};

export default ConnectHandler;
