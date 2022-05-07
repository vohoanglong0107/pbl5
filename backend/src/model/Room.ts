import Game from "./Game";
import RoomSetting from "@/game/RoomSetting";
import User from "./User";
import { GameStarted } from "@/game/Room";

export default class Room {
  constructor(
    public id: string,
    public connectedUsers: User[],
    public gameStarted: GameStarted,
    public currentGameState: Game | undefined,
    public gameSetting: RoomSetting
  ) {}
}
