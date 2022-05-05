import GameState from "./GameState";
import GameSetting from "@/game/GameSetting";
import User from "./User";
import { GameStarted } from "@/game/Game";

export default class Game {
  constructor(
    public id: string,
    public connectedUsers: User[],
    public gameStarted: GameStarted,
    public currentGameState: GameState | undefined,
    public gameSetting: GameSetting,
    public seats: Array<User | undefined>
  ) {}
}
