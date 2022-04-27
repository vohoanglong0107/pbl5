import Card from "./Card";
import mockDB from "./MockDB";

export default class Deck {
  cards: Card[];
  constructor() {
    this.cards = [...mockDB.desks.cards];
  }

  peek(num: number): Card[] {
    return this.cards.slice(-num);
  }
  shuffle() {
    this.cards = this.cards.sort(() => Math.random() - 0.5);
  }

  draw(): Card {
    const card = this.cards.pop();
    // Should never happen in a real game as they should have all exploded by now.
    if (!card) {
      throw new Error("No more cards");
    }
    return card;
  }
}
