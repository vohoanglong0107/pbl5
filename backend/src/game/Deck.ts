import Card from "./Card";

export default class Deck {
  cards: Card[] = [];

  peek(num: number): Card[] {
    return this.cards.slice(0, num);
  }
}
