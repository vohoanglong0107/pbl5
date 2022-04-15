import Interactive from "./Interactive";
import Deck from "./Deck";
import Card from "./Card";

export default class GameState implements Interactive {
  deck: Deck = new Deck();
  discardPile: Deck = new Deck();
  turn: number = 0;
  turnOrder: number[] = [];
  currentPlayerIndex: number = 0;
  currentPlayerNumTurn: number = 1;
  direction: number = 1;
  advanceTurn(): void {
    this.currentPlayerIndex =
      (this.currentPlayerIndex + 1) % this.turnOrder.length;
    this.currentPlayerNumTurn = 1;
  }
}
