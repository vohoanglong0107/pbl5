import debug from "debug";
import GameModel from "@/model/Game";
import DrawCardCommand from "@/game/commands/DrawCardCommand";
import { SocketHandler } from "@/handlers/Handler";

const debugLog = debug("backend:socket:game");

const DrawCardHandler: SocketHandler = (io, socket) => {
  const drawCardHandler = () => {
    const game = socket.data.game!;
    const userId = socket.data.sessionID!;
    const player = game.getPlayer(userId);
    if (!player) {
      debugLog(`${userId} tried to draw card but is not in game ${game.id}`);
      return;
    }
    const command = new DrawCardCommand(player, game.currentGameState);
    command.execute();
    debugLog(`${socket.data.sessionID} drew a card`);

    io.to(game.id).emit("user:drew-card", new GameModel(game));
  };
  socket.on("user:draw-card", drawCardHandler);
};
export default DrawCardHandler;
