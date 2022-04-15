import { v4 as uuidv4 } from "uuid";
import Player from "./Player";
import GameState from "./GameState";
import GameSetting from "./GameSetting";

export default class Game {
  id: string = uuidv4();
  players: Player[] = [];
  connectedUsers: Set<string> = new Set<string>();
  currentGameState: GameState = new GameState();
  gameSetting: GameSetting = new GameSetting();
  connectUser(userId: string): void {
    this.connectedUsers.add(userId);
  }
  disconnectUser(userId: string): void {
    this.connectedUsers.delete(userId);
  }
}
