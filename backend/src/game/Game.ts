import { v4 as uuidv4 } from "uuid";
import { faker } from "@faker-js/faker";
import Player from "./Player";
import GameState from "./GameState";
import GameSetting from "./GameSetting";
import User from "./User";

type UserWithConnectionCount = User & { num_connections: number };

export default class Game {
  id: string = uuidv4();
  players: Player[] = [];
  connectedUsers: Map<string, UserWithConnectionCount> = new Map<
    string,
    User & { num_connections: number }
  >();
  currentGameState: GameState = new GameState();
  gameSetting: GameSetting = new GameSetting();
  connectUser(userId: string): void {
    let user = this.connectedUsers.get(userId);
    if (!user) {
      this.connectedUsers.set(userId, {
        id: userId,
        username: faker.name.findName(),
        num_connections: 1,
      });
    } else {
      user.num_connections += 1;
    }
  }
  disconnectUser(userId: string): void {
    let user = this.connectedUsers.get(userId);
    if (user) {
      user.num_connections -= 1;
      if (user.num_connections <= 0) {
        this.connectedUsers.delete(userId);
      }
    }
  }
}
