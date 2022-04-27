import Card from "./Card";

export default class Hand {
  cards: Card[] = [];
  add(card: Card) {
    this.cards.push(card);
  }
  get(cardId: string): Card | undefined {
    return this.cards.find((card) => card.id === cardId);
  }
  remove(cardIds: string[]) {
    this.cards = this.cards.filter((card) => !cardIds.includes(card.id));
  }
  clear() {
    this.cards = [];
  }
}
