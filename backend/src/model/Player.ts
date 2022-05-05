import Card from "@/game/Card";
import User from "./User";

export default class Player extends User {
  hand: Card[];
  exploded: boolean;
  constructor(id: string, username: string, cards: Card[], exploded: boolean) {
    super(id, username);
    this.hand = cards;
    this.exploded = exploded;
  }
}
