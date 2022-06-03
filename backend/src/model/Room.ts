import { Game } from "./Game";
import RoomSetting from "@/game/RoomSetting";
import User from "./User";
import { Chat } from "./../game/Chat"

export default class Room {
  constructor(
    public id: string,
    public connectedUsers: User[],
    public game: Game,
    public roomSetting: RoomSetting,
    public chatHistory: Chat[]
  ) { }
}
