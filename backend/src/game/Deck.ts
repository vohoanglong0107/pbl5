import Card from "./Card";

export default class Deck {
  cards: Card[];
  constructor() {
    this.cards = [];
    for (let i = 0; i < 42; i++) {
      this.cards.push(new Card(i.toString()));
    }
  }

  peek(num: number): Card[] {
    return this.cards.slice(-num);
  }
  shuffle() {
    this.cards = this.cards.sort(() => Math.random() - 0.5);
  }

  draw(): Card {
    const card = this.cards.pop();
    if (!card) {
      throw new Error("No more cards");
    }
    return card;
  }
}
