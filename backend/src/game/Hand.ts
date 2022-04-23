import Card from "./Card";

export default class Hand {
  cards: Card[] = [];
  add(card: Card) {
    this.cards.push(card);
  }
}
