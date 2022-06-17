import { v4 as uuidv4 } from "uuid";
import debugModule from "debug";
import Game, { GameEvent } from "./Game";
import RoomSetting from "./RoomSetting";
import User, { UserEvent } from "./User";
import RoomModel from "@/model/Room";
import { Acknowledgement } from "./UserEvent";
import { type } from "os";
import { Chat } from "./Chat"
import cardService from "@/service/Card";
import CardSetting from "./CardSetting";

const debug = debugModule("backend:socket:game");

export enum RoomEvent {
  STATE_CHANGED = "room:state-changed",
  CHATED = "room:chated",
  SETTING = "room:setting"
}


export default class Room {
  public id: string = uuidv4();
  private connectedUsers: Map<string, User> = new Map<string, User>();
  private roomSetting: RoomSetting = new RoomSetting();
  private game: Game = new Game(this.roomSetting.gameSetting);
  private chatHistory: Chat[] = [];
  constructor() {
    this.game.eventTracker.on("game:state-changed", () => {
      this.broadcastStateChanged();
    });
  }
  getUser(userId: string): User | undefined {
    return this.connectedUsers.get(userId);
  }
  async onConnect(user: User) {
    this.connectedUsers.set(user.id, user);

    let cardsFixPlayerNum: Array<CardSetting> = new Array();
    await cardService.GetDefaultCardSetting(this.connectedUsers.size).then((res) => {
      cardsFixPlayerNum = res;
    })

    // for first player join game
    if (this.roomSetting.gameSetting.cardSetting.length == 0) {
      this.roomSetting.gameSetting.cardSetting = cardsFixPlayerNum;
    }

    // for n'th player join game
    // get previous defaultCard to compare with current Cards
    let cardsPrev: Array<CardSetting> = new Array();
    await cardService.GetDefaultCardSetting(this.connectedUsers.size - 1).then((res) => {
      cardsPrev = res;
    })

    // if cardsPrev = current cards => update cards with playerNum
    let cond = true;
    for (let i = 0; i < this.roomSetting.gameSetting.cardSetting.length; i++) {
      if (this.roomSetting.gameSetting.cardSetting[i].number != cardsPrev[i].number) {
        cond = false;
      }
    }
    if (cond) {
      this.roomSetting.gameSetting.cardSetting = cardsFixPlayerNum;
    }

    this.broadcastStateChanged();
  }
  // TODO: add graceful disconnection
  onDisconnect(user: User) {
    this.connectedUsers.delete(user.id);
    this.game.removePlayer(user.id);
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
      } else if (User.isUserEvent(event)) {
        res = user.handleUserEvent(event as UserEvent, ...data);
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
      debug(error);
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
  private handleRoomEvent(user: User, event: RoomEvent, ...data: any[]) {
    switch (event) {
      case RoomEvent.CHATED: {
        this.chatHistory.push({ username: user.username, msg: data[0] })
        break;
      }
      case RoomEvent.SETTING: {
        this.roomSetting.gameSetting.targetingTime = data[0].targetingTime * 1000;
        this.roomSetting.gameSetting.turnTime = data[0].turnTime * 1000;
        this.roomSetting.gameSetting.cardSetting = data[0].cardSetting;
        break;
      }
    }
  }
  private handleGameEvent(user: User, event: GameEvent, ...data: any[]) {
    let player = this.game.getPlayer(user.id);
    if (!player) {
      if (event === GameEvent.TAKE_SEAT)
        player = this.game.addPlayer(user.id, user.username);
      else {
        debug(`${user.id} tried to send event ${event} without taking seat`);
        throw new Error(`Player ${user.username} is not in the game`);
      }
    }
    const res = this.game.handlePlayerEvent(player, event, ...data);
    return res;
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
      this.game.encode(),
      this.roomSetting,
      this.chatHistory
    );
  }
  static isRoomEvent(event: string): event is RoomEvent {
    return Object.values(RoomEvent).includes(event as RoomEvent);
  }
}

export { GameEvent };
