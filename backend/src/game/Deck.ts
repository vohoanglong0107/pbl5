import Card from "./Card";
import { CardCommands } from "./command/CardCommands";

export default class Deck {
  cards: Card[];
  constructor(cards: Card[]) {
    this.cards = [...cards];
  }

  peek(num: number): Card[] {
    return this.cards.slice(-num);
  }
  shuffle() {
    this.cards = this.cards.sort(() => Math.random() - 0.5);
  }

  deal(): Card {
    const card = this.cards.pop();
    // Should never happen in a real game as they should have all exploded by now.
    if (!card) {
      throw new Error("No more cards");
    }
    return card;
  }
  // FIXME: This is a hack to deal the cards when game start (called only once when game start).
  dealCardStartingGame(numPlayers: number): Card[][] {
    const defuses = this.cards.filter(
      (card) => card.commandId === CardCommands.DEFUSE
    );
    const explodes = this.cards.filter(
      (card) => card.commandId === CardCommands.EXPLODE
    );
    const others = this.cards.filter(
      (card) =>
        card.commandId !== CardCommands.DEFUSE &&
        card.commandId !== CardCommands.EXPLODE
    );
    const cards = Array.from({ length: numPlayers }, (e) => [] as Card[]);
    for (let i = 0; i < numPlayers; i++) {
      cards[i].push(...defuses.splice(0, 1));
      cards[i].push(...others.splice(0, 5));
    }
    this.cards = defuses.concat(explodes).concat(others);
    this.shuffle();
    return cards;
  }

  getBottomCard(): Card {
    const card = this.cards.splice(0, 1)[0];
    if (!card) throw new Error("No more cards! Stop drawingggggggg");
    return card;
  }

  randomlyPushCard(card: Card) {
    const index = Math.floor(Math.random() * this.cards.length);
    this.cards.splice(index, 0, card);
    return this.cards;
  }
}
