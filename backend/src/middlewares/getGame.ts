import { ExtendedError } from "socket.io/dist/namespace";
import gameManager from "@/game/GameManager";
import { SocketType } from "@/events";

const getGame = (
  socket: SocketType,
  next: (err?: ExtendedError | undefined) => void
) => {
  const gameId = socket.handshake.auth.gameId;
  const game = gameManager.getGame(gameId);
  if (game) {
    socket.data.game = game;
    next();
  } else {
    next(new Error("Game not found"));
  }
};

export default getGame;
