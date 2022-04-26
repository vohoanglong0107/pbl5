import { ServerType } from "@/events";
import Game from "./Game";

export class GameManager {
  private io: ServerType;

  games: Map<string, Game> = new Map();
  constructor(io: ServerType) {
    this.io = io;
  }
  createGame() {
    const game = new Game(this.io);
    this.games.set(game.id, game);
    return game.id;
  }
  getGame(id: string): Game | undefined {
    return this.games.get(id);
  }
}

export default GameManager;
