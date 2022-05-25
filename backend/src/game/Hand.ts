import Card from "./Card";

export default class Hand {
  cards: Card[] = [];
  add(card: Card) {
    this.cards.push(card);
  }
  get(cardId: number): Card | undefined {
    return this.cards.find((card) => card.id === cardId);
  }
  remove(Card: Card[]) {
    const cardIds = Card.map((card) => card.id);
    this.cards = this.cards.filter((card) => !cardIds.includes(card.id));
  }
  clear() {
    this.cards = [];
  }
}
