import { v4 as uuidv4 } from "uuid";
import { faker } from "@faker-js/faker";
import debugModule from "debug";
import Player from "./Player";
import GameState from "./GameState";
import GameSetting from "./GameSetting";
import User from "./User";
import { ServerType } from "@/events";
import GameModel from "@/model/Game";
import CommandFactory from "./command/CommandFactory";
import { Commands } from "./command/Commands";

const debug = debugModule("backend:socket:game");

type UserWithConnectionCount = User & { num_connections: number };

export enum GameStarted {
  NOT_STARTED,
  STARTED,
  FINISHED,
}

export default class Game {
  private io: ServerType;
  id: string = uuidv4();
  players: Player[] = [];
  connectedUsers: Map<string, UserWithConnectionCount> = new Map<
    string,
    User & { num_connections: number }
  >();
  gameStarted: GameStarted = GameStarted.NOT_STARTED;
  currentGameState: GameState = new GameState(this.players);
  gameSetting: GameSetting = new GameSetting();
  private commandFactory = new CommandFactory(this.currentGameState);
  constructor(io: ServerType) {
    this.io = io;
  }
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
    debug(`Disconnecting user ${JSON.stringify(user)}`);
    if (user) {
      user.num_connections -= 1;
      if (user.num_connections <= 0) {
        this.connectedUsers.delete(userId);
        this.players = this.players.filter((player) => player.id !== userId);
      }
    }
  }
  reserveSlot(userId: string): void {
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
    this.commandFactory = new CommandFactory(this.currentGameState);
    debug(
      `peek top card ${JSON.stringify(this.currentGameState.deck.peek(1))}`
    );
  }
  handleUserEvent(clientId: string, event: string, ...data: any[]): void {
    // TODO: might move connect and disconnect to a separate handler
    if (event === "connected") {
      const callback = data[0];
      this.connectUser(clientId);
      callback(this.connectedUsers.get(clientId));
      this.broadcast("connected", new GameModel(this));
    } else if (event === "disconnect") {
      this.disconnectUser(clientId);
      this.broadcast("disconnected", new GameModel(this));
    } else if (event === "start") {
      this.startGame();
      this.broadcast("started", new GameModel(this));
    } else if (event === "take-slot") {
      this.reserveSlot(clientId);
      this.broadcast("took-slot", new GameModel(this));
    } else if (event === "draw-card") {
      const player = this.getPlayer(clientId);
      if (!player) {
        debug(`${clientId} tried to draw card but is not in game ${this.id}`);
      } else {
        this.handleUserDrawCard(player);
      }
    } else if (event === "play-card") {
      const player = this.getPlayer(clientId);
      const cardIds = data[0] as string[];
      if (!player) {
        debug(`${clientId} tried to play card but is not in game ${this.id}`);
      } else {
        this.handleUserPlayCard(player, cardIds);
      }
    } else {
      debug(`${clientId} tried to send unknown event ${event}`);
    }
  }
  handleUserDrawCard(player: Player): void {
    const card = this.currentGameState.deck.draw();
    debug(`${player.id} drew card ${JSON.stringify(card)}`);
    if (card.commandId === Commands.EXPLODE) {
      const command = this.commandFactory.create(player, [card]);
      command.execute();
      this.currentGameState.advanceTurn();
      this.broadcast("played-card", new GameModel(this));
    } else {
      player.draw(card);

      this.currentGameState.advanceTurn();
      this.broadcast("drew-card", new GameModel(this));
    }
    debug(
      `peek top card ${JSON.stringify(this.currentGameState.deck.peek(1))}`
    );
    this.checkGameOver();
  }
  handleUserPlayCard(player: Player, cardIds: string[]): void {
    debug(`${player.id} played those card: ${cardIds}`);
    try {
      const cards = cardIds.map((cardId) => player.hand.get(cardId)!);
      const command = this.commandFactory.create(player, cards);
      command.execute();
      player.hand.remove(cardIds);
      this.broadcast("played-card", new GameModel(this));
    } catch (error) {
      // TODO add to frontend events
      debug(`${player.id} tried to play invalid card ${error}`);
      if (error instanceof Error)
        this.sendTo(player.id, "cant-play-card", error.message);
      else this.sendTo(player.id, "cant-play-card", "Unknown error");
    }
  }
  checkGameOver(): void {
    if (this.currentGameState.isGameOver()) {
      this.gameStarted = GameStarted.FINISHED;
      this.broadcast("over", new GameModel(this));
    }
  }
  overGame(): void {
    this.gameStarted = GameStarted.FINISHED;
  }
  private broadcast(event: string, ...data: any[]): void {
    event = `game:${event}`;
    this.io.to(this.id).emit(event, ...data);
    // debug(
    //   `broadcasted ${event} to ${this.id} with data ${JSON.stringify(data)}`
    // );
  }
  private sendTo(clientId: string, event: string, ...data: any[]): void {
    event = `game:${event}`;
    this.io.to(clientId).emit(event, ...data);
  }
}
