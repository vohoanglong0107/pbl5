import Hand from "./Hand";
import Card from "./Card";
import PlayerModel from "@/model/Player";

export default class Player {
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
  encode(): PlayerModel {
    return new PlayerModel(
      this.id,
      this.username,
      this.hand.cards,
      this.exploded
    );
  }
}
