import Game from "./Game";

export class GameManager {
  games: Map<string, Game> = new Map();
  constructor() {}
  createGame() {
    const game = new Game();
    this.games.set(game.id, game);
    return game.id;
  }
  getGame(id: string): Game | undefined {
    return this.games.get(id);
  }
}

const gameManager = new GameManager();

export default gameManager;
