import Hand from "./Hand";
import User from "./User";
import Card from "./Card";

export default class Player implements User {
  id: string;
  username: string;
  hand: Hand = new Hand();
  exploded = false;
  constructor(id: string, username: string) {
    this.id = id;
    this.username = username;
  }
  draw(card: Card) {
    this.hand.add(card);
  }
  reset() {
    this.hand.clear();
    this.exploded = false;
  }
}
