import RoomSetting from "@/game/RoomSetting";
import { Chat, SystemMessage } from "./../game/Chat";
import { Game } from "./Game";
import User from "./User";

export default class Room {
  constructor(
    public id: string,
    public connectedUsers: User[],
    public game: Game,
    public roomSetting: RoomSetting,
    public chat: {
      chatHistory: Chat[];
      systemMessages: SystemMessage[];
    }
  ) {}
}
