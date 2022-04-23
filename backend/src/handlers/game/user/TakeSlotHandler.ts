import debug from "debug";
import { SocketHandler } from "@/handlers/Handler";
import GameModel from "@/game/GameModel";

const debugLog = debug("backend:socket:user");

const TakeSlotHandler: SocketHandler = (io, socket) => {
  const takeSlotHandler = () => {
    const game = socket.data.game!;
    const userId = socket.data.sessionID!;
    debugLog(`${userId} take a slot in game ${game.id}`);
    game.letUserTakeSlot(userId);
    io.to(game.id).emit("user:took-slot", new GameModel(game));
  };
  socket.on("user:take-slot", takeSlotHandler);
};

export default TakeSlotHandler;
