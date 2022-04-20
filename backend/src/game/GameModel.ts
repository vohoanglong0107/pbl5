import Player from "./Player";
import GameState from "./GameState";
import GameSetting from "./GameSetting";
import User from "./User";
import Game from "./Game";

export default class GameModel {
  id: string;
  players: Player[];
  connectedUsers: User[];
  currentGameState: GameState;
  gameSetting: GameSetting;
  constructor(game: Game) {
    this.id = game.id;
    this.players = game.players;
    this.connectedUsers = Array.from(game.connectedUsers.values()).map(
      ({ num_connections, ...rest }) => rest
    );
    this.currentGameState = game.currentGameState;
    this.gameSetting = game.gameSetting;
  }
}