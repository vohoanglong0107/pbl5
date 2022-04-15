import Hand from "./Hand";
import Interactive from "./Interactive";

export default class Player implements Interactive {
  id: string;
  username: string;
  hand: Hand = new Hand();
  constructor(id: string, username: string) {
    this.id = id;
    this.username = username;
  }
}
