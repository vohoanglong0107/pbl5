import PlayerModel from "./Player";
import GameState from "../game/GameState";
import GameSetting from "../game/GameSetting";
import User from "../game/User";
import Game from "../game/Game";
import { GameStarted } from "../game/Game";

export default class GameModel {
  id: string;
  players: PlayerModel[];
  connectedUsers: User[];
  gameStarted: GameStarted;
  currentGameState: GameState;
  gameSetting: GameSetting;
  constructor(game: Game) {
    this.id = game.id;
    this.players = game.players.map((player) => new PlayerModel(player));
    this.connectedUsers = Array.from(game.connectedUsers.values()).map(
      ({ num_connections, ...rest }) => rest
    );
    this.gameStarted = game.gameStarted;
    this.currentGameState = game.currentGameState;
    this.gameSetting = game.gameSetting;
  }
}
