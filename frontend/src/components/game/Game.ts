import { Player } from "../player";
import { User } from "../user";

export enum GameStarted {
  NOT_STARTED = 0,
  STARTED = 1,
  FINISHED = 2,
}
export default class Game {
  id: string;
  players: Player[] = [];
  connectedUsers: User[] = [];
  gameStarted: GameStarted = GameStarted.NOT_STARTED;
  constructor(id: string) {
    this.id = id;
  }
}
