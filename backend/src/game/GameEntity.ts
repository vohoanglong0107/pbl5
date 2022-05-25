import Deck from "./Deck";
import Card from "./Card";
import { GameEntity as GameEntityModel } from "@/model/Game";
import Player from "./Player";

export default class GameEntity {
  deck: Deck;
  discardPile: Card[];
  currentPlayerNumberOfTurns: number = 1;
  direction: number = 1;
  nextPlayer: null | true | Player = null;

  startTurn() {}
  constructor(cards: Card[]) {
    this.deck = new Deck(cards);
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
