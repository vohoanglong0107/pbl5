import { v4 as uuidv4 } from "uuid";
import { faker } from "@faker-js/faker";
import Player from "./Player";
import GameState from "./GameState";
import GameSetting from "./GameSetting";
import User from "./User";

type UserWithConnectionCount = User & { num_connections: number };

export enum GameStarted {
  NOT_STARTED = 0,
  STARTED = 1,
  FINISHED = 2,
}

export default class Game {
  id: string = uuidv4();
  players: Player[] = [];
  connectedUsers: Map<string, UserWithConnectionCount> = new Map<
    string,
    User & { num_connections: number }
  >();
  gameStarted: GameStarted = GameStarted.NOT_STARTED;
  currentGameState: GameState = new GameState(this.players);
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
        this.players = this.players.filter((player) => player.id !== userId);
      }
    }
  }
  letUserTakeSlot(userId: string): void {
    let user = this.connectedUsers.get(userId);
    if (user) {
      if (
        !this.players.find((player) => player.id === userId) &&
        this.players.length < this.gameSetting.max_players
      ) {
        this.players.push(new Player(userId, user.username));
      }
    }
  }
  getPlayer(userId: string): Player | undefined {
    return this.players.find((player) => player.id === userId);
  }
  startGame() {
    this.gameStarted = GameStarted.STARTED;
    this.currentGameState = new GameState(this.players);
  }
}
