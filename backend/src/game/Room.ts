import { v4 as uuidv4 } from "uuid";
import debugModule from "debug";
import Player from "./Player";
import Game, { GameEvent } from "./Game";
import RoomSetting from "./RoomSetting";
import User from "./User";
import RoomModel from "@/model/Room";
import { Acknowledgement } from "./UserEvent";

const debug = debugModule("backend:socket:game");

export enum GameStarted {
  NOT_STARTED,
  STARTED,
  FINISHED,
}

export enum RoomEvent {
  CONNECT = "room:connect",
  START_GAME = "room:start-game",
  TAKE_SEAT = "room:take-seat",
  STATE_CHANGED = "room:state-changed",
}

export default class Room {
  id: string = uuidv4();
  connectedUsers: Map<string, User> = new Map<string, User>();
  gameStarted: GameStarted = GameStarted.NOT_STARTED;
  game?: Game;
  roomSetting: RoomSetting = new RoomSetting();
  constructor() {}
  getUser(userId: string): User | undefined {
    return this.connectedUsers.get(userId);
  }
  onConnect(user: User) {
    this.connectedUsers.set(user.id, user);
    this.broadcastStateChanged();
  }
  // TODO: add graceful disconnection
  onDisconnect(user: User) {
    this.connectedUsers.delete(user.id);
    this.game?.removePlayer(user.id);
    this.broadcastStateChanged();
  }

  handleUserEvent(user: User, event: string, ...args: any[]): void {
    const data = args.slice(0, -1);
    const ack = args[args.length - 1] as Acknowledgement;
    try {
      let res: unknown;
      if (Game.isGameEvent(event)) {
        res = this.handleGameEvent(user, event as GameEvent, ...data);
      } else if (Room.isRoomEvent(event)) {
        res = this.handleRoomEvent(user, event as RoomEvent, ...data);
      } else {
        debug(`${user.id} tried to send unknown event ${event}`);
        throw new Error(`Unknown event ${event}`);
      }

      if (!res) res = null;
      ack({
        data: res,
      });
      this.broadcastStateChanged();
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
  handleRoomEvent(user: User, event: RoomEvent, ...data: any[]) {
    switch (event) {
      case RoomEvent.START_GAME:
        return this.startGame();
      case RoomEvent.TAKE_SEAT:
        const seatId = data[0] as number;
        return this.reserveSeat(user, seatId);
    }
  }
  handleGameEvent(user: User, event: GameEvent, ...data: any[]) {
    const player = user.player;
    if (!player) {
      debug(
        `${user.id} tried to perform a game event but is not playing in game ${this.id}`
      );
      throw new Error(`User not in game`);
    }
    const res = this.game!.handlePlayerEvent(player, event, ...data);
    return res;
  }
  reserveSeat(user: User, seatId: number): void {
    if (seatId >= this.roomSetting.maxPlayers) {
      throw new Error(`Seat ${seatId} is out of range`);
    }
    if (this.isSeatVacant(seatId)) {
      user.seat = seatId;
    } else {
      throw new Error(`Seat ${seatId} is not vacant`);
    }
  }
  isSeatVacant(seatId: number): boolean {
    for (const user of this.connectedUsers.values()) {
      if (user.seat === seatId) {
        return false;
      }
    }
    return true;
  }
  startGame() {
    const users = Array.from(this.connectedUsers.values());
    let usersInPlay = users.filter((user) => user.seat);
    if (usersInPlay.length <= 1) {
      throw new Error("Not enough player to start game");
    }
    this.gameStarted = GameStarted.STARTED;
    const players = usersInPlay.map((user) => {
      const player = new Player(user.id, user.username, user.seat!);
      user.player = player;
      return player;
    });

    this.game = this.setUpNewGame(players);
  }
  setUpNewGame(players: Player[]) {
    const game = new Game(players, this.roomSetting.turnTime);
    game.on("start-turn", () => {
      this.broadcastStateChanged();
    });
    game.on("over", () => {
      this.overGame();
      this.broadcastStateChanged();
      debug(`Game ${this.id} is over`);
    });
    return game;
  }
  overGame(): void {
    this.gameStarted = GameStarted.FINISHED;
  }
  private broadcastStateChanged(): void {
    this.connectedUsers.forEach((user) =>
      user.emit(RoomEvent.STATE_CHANGED, this.encode())
    );
  }
  encode(): RoomModel {
    const connectedUsers = [...this.connectedUsers.values()].map((user) =>
      user.encode()
    );
    return new RoomModel(
      this.id,
      connectedUsers,
      this.gameStarted,
      this.game?.encode(),
      this.roomSetting
    );
  }
  static isRoomEvent(event: string): event is RoomEvent {
    return Object.values(RoomEvent).includes(event as RoomEvent);
  }
}

export { GameEvent };
