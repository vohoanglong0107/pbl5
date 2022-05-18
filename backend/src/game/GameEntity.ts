import Deck from "./Deck";
import Card from "./Card";
import { GameEntity as GameEntityModel } from "@/model/Game";

export default class GameEntity {
  deck: Deck;
  discardPile: Card[];
  currentPlayerNumberOfTurns: number = 1;
  direction: number = 1;
  // TODO: change to Player instance instead of string
  nextPlayer: null | true | string = null;

  startTurn() {}
  constructor() {
    this.deck = new Deck();
    this.deck.shuffle();
    this.discardPile = [] as Card[];
  }
  deal() {
    return this.deck.deal();
  }
  encode() {
    return new GameEntityModel(
      this.deck.cards,
      this.discardPile,
      this.currentPlayerNumberOfTurns,
      this.direction
    );
  }
}
