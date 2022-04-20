import { Player } from "../player";
import { User } from "../user";
export default class Game {
  id: string;
  players: Player[] = [];
  connectedUsers: User[] = [];
  constructor(id: string) {
    this.id = id;
  }
}
