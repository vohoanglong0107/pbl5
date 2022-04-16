import Hand from "./Hand";
import User from "./User";
import Interactive from "./Interactive";

export default class Player implements Interactive, User {
  id: string;
  username: string;
  hand: Hand = new Hand();
  constructor(id: string, username: string) {
    this.id = id;
    this.username = username;
  }
}
