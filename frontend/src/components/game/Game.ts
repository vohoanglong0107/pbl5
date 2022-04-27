import { Player } from "../player";
import { User } from "../user";
import GameState from "./GameState";

export enum GameStarted {
  NOT_STARTED = 0,
  STARTED = 1,
  FINISHED = 2,
}
export default class Game {
  id: string;
  players: Player[];
  connectedUsers: User[];
  gameStarted: GameStarted;
  currentGameState: GameState;
  constructor(
    id: string,
    players: Player[],
    connectedUsers: User[],
    gameStarted: GameStarted,
    currentGameState: GameState
  ) {
    this.id = id;
    this.players = players;
    this.connectedUsers = connectedUsers;
    this.gameStarted = gameStarted;
    this.currentGameState = currentGameState;
  }
}
