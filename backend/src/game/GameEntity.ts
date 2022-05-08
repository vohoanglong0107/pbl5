import Deck from "./Deck";
import Card from "./Card";

export default class GameEntity {
  deck: Deck;
  discardPile: Card[];
  currentPlayerNumberOfTurns: number = 1;
  direction: number = 1;
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
}
