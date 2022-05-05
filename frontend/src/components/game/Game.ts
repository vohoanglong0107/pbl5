import { Player } from "../player";
import { User } from "../user";
import GameState from "./GameState";
import GameSetting from "./GameSetting";

export enum GameStarted {
  NOT_STARTED = 0,
  STARTED = 1,
  FINISHED = 2,
}
export default interface Game {
  id: string;
  connectedUsers: User[];
  gameStarted: GameStarted;
  currentGameState: GameState | undefined;
  gameSetting: GameSetting;
  seats: Array<User | undefined>;
}
