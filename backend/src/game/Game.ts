import { v4 as uuidv4 } from "uuid";
import debugModule from "debug";
import Player from "./Player";
import GameState from "./GameState";
import GameSetting from "./GameSetting";
import User from "./User";
import GameModel from "@/model/Game";
import CommandFactory from "./command/CommandFactory";
import { Commands } from "./command/Commands";
import { Acknowledgement } from "./UserEvent";
import Card from "./Card";

const debug = debugModule("backend:socket:game");

export enum GameStarted {
  NOT_STARTED,
  STARTED,
  FINISHED,
}

export default class Game {
  id: string = uuidv4();
  connectedUsers: Map<string, User> = new Map<string, User>();
  gameStarted: GameStarted = GameStarted.NOT_STARTED;
  currentGameState: GameState | undefined = undefined;
  gameSetting: GameSetting = new GameSetting();
  private commandFactory: CommandFactory | undefined = undefined;
  seats = Array<User | undefined>(this.gameSetting.max_players).fill(undefined);
  constructor() {}
  getUser(userId: string): User | undefined {
    return this.connectedUsers.get(userId);
  }
  onConnect(user: User) {
    this.connectedUsers.set(user.id, user);
    this.broadcast("connected");
  }
  // TODO: add graceful disconnection
  onDisconnect(user: User) {
    this.connectedUsers.delete(user.id);
    this.currentGameState?.removePlayer(user.id);
    this.removeUserFromSeat(user);
    this.broadcast("disconnected");

    this.checkGameOver();
  }

  handleUserEvent(user: User, event: string, ...args: any[]): void {
    const data = args.slice(0, -1);
    const ack = args[args.length - 1] as Acknowledgement;
    try {
      let res: unknown;
      switch (event) {
        case "start":
          res = this.startGame();
          break;
        case "take-seat":
          const seatId = data[0] as number;
          res = this.reserveSeat(user, seatId);
          break;
        case "draw-card": {
          res = this.handleUserDrawCard(user);
          break;
        }
        case "play-card": {
          const cardIds = data[0] as string[];
          res = this.handleUserPlayCard(user, cardIds);
          break;
        }
        default:
          debug(`${user.id} tried to send unknown event ${event}`);
          throw new Error(`Unknown event ${event}`);
      }
      if (!res) res = null;
      ack({
        data: res,
      });
    } catch (error) {
      let errorMessage: string;
      if (error instanceof Error) {
        errorMessage = error.message;
      } else {
        debug(`Unrecognized error type ${error}`);
        errorMessage = error as string;
      }
      ack({
        error: errorMessage,
      });
    }
  }
  reserveSeat(user: User, seatId: number): void {
    if (seatId >= this.gameSetting.max_players) {
      throw new Error(`Seat ${seatId} is out of range`);
    }
    this.removeUserFromSeat(user);
    this.seats[seatId] = user;
    this.broadcast("took-seat");
  }
  // TODO: refactor this and remove Player
  removeUserFromSeat(user: User) {
    let userIndex = this.seats.findIndex((seat) => seat?.id === user.id);
    if (userIndex === -1) {
      return;
    }
    this.seats[userIndex] = undefined;
  }
  startGame() {
    const numActivePlayers = this.seats.filter((seat) => seat).length;
    if (numActivePlayers <= 1) {
      throw new Error("Not enough player to start game");
    }
    this.gameStarted = GameStarted.STARTED;
    const players = this.seats.map((user) => {
      if (user) {
        const player = new Player(user.id, user.username);
        user.player = player;
        return player;
      } else {
        return user;
      }
    });
    this.currentGameState = new GameState(players);
    this.commandFactory = new CommandFactory(this.currentGameState);
    this.broadcast("started");
  }
  handleUserDrawCard(user: User): void {
    const player = user.player;
    if (!player) {
      debug(
        `${user.id} tried to draw card but is not playing in game ${this.id}`
      );
      throw new Error(`User not in play`);
    }
    const card = this.currentGameState!.deck.draw();
    debug(`${player.id} drew card ${JSON.stringify(card)}`);
    if (card.commandId === Commands.EXPLODE) {
      this.handlePlayerPlayCard(player, [card]);
      this.currentGameState!.advanceTurn();
      this.broadcast("played-card");
    } else {
      player.draw(card);

      this.currentGameState!.advanceTurn();
      this.broadcast("drew-card");
    }
    this.checkGameOver();
  }
  handleUserPlayCard(user: User, cardIds: string[]): void {
    const player = user.player;

    if (!player) {
      debug(
        `${user.id} tried to play card but is not playing in game ${this.id}`
      );
      throw new Error(`User not in play`);
    }

    debug(`${player.id} played those card: ${cardIds}`);
    try {
      const cards = cardIds.map((cardId) => player.hand.get(cardId)!);
      this.handlePlayerPlayCard(player, cards);
      player.hand.remove(cardIds);
      this.broadcast("played-card");
    } catch (error) {
      debug(`${player.id} tried to play invalid card ${error}`);
      throw error;
    }
  }
  handlePlayerPlayCard(player: Player, cards: Card[]): void {
    const command = this.commandFactory!.create(player, cards);
    command.execute();
  }
  checkGameOver(): void {
    if (this.currentGameState!.isGameOver()) {
      this.gameStarted = GameStarted.FINISHED;
      this.broadcast("over");
    }
  }
  overGame(): void {
    this.gameStarted = GameStarted.FINISHED;
  }
  private broadcast(event: string): void {
    for (const user of this.connectedUsers.values()) {
      user.emit(event, this.encode());
    }
  }
  encode(): GameModel {
    const connectedUsers = [...this.connectedUsers.values()].map((user) =>
      user.encode()
    );
    return new GameModel(
      this.id,
      connectedUsers,
      this.gameStarted,
      this.currentGameState?.encode(),
      this.gameSetting,
      this.seats
    );
  }
}
