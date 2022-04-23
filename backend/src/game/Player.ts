import Hand from "./Hand";
import Deck from "./Deck";
import User from "./User";

export default class Player implements User {
  id: string;
  username: string;
  hand: Hand = new Hand();
  constructor(id: string, username: string) {
    this.id = id;
    this.username = username;
  }
  draw(deck: Deck) {
    this.hand.add(deck.draw());
  }
}
