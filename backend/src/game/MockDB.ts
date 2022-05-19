import { CardCommands } from "./command/CardCommands";
import Card from "./Card";

class MockDB {
  public readonly desks = {
    name: "main-desk",
    cards: [] as Card[],
  };
  constructor() {
    for (let i = 0; i < 16; i++) {
      this.desks.cards.push({
        id: `${i}`,
        commandId: CardCommands.EXPLODE,
      });
    }

    for (let i = 16; i < 24; i++) {
      this.desks.cards.push({
        id: `${i}`,
        commandId: CardCommands.DEFUSE,
      });
    }
    for (let i = 24; i < 32; ++i) {
      this.desks.cards.push({
        id: `${i}`,
        commandId: CardCommands.SKIP,
      });
    }
    for (let i = 24; i < 48; ++i) {
      this.desks.cards.push({
        id: `${i}`,
        commandId: CardCommands.SEE_THE_FUTURE,
      });
    }
    for (let i = 48; i < 64; ++i) {
      this.desks.cards.push({
        id: `${i}`,
        commandId: CardCommands.CAT,
      });
    }
    for (let i = 64; i < 72; ++i) {
      this.desks.cards.push({
        id: `${i}`,
        commandId: CardCommands.DRAW_FROM_BOTTOM,
      });
    }
    for (let i = 72; i < 80; ++i) {
      this.desks.cards.push({
        id: `${i}`,
        commandId: CardCommands.ATTACK,
      });
    }
    for (let i = 80; i < 88; ++i) {
      this.desks.cards.push({
        id: `${i}`,
        commandId: CardCommands.REVERSE,
      });
    }
    for (let i = 88; i < 96; ++i) {
      this.desks.cards.push({
        id: `${i}`,
        commandId: CardCommands.SHUFFLE,
      });
    }
    for (let i = 96; i < 104; ++i) {
      this.desks.cards.push({
        id: `${i}`,
        commandId: CardCommands.TARGET_ATTACK,
      });
    }
  }
  getCard(id: string): Card | undefined {
    return this.desks.cards.find((card) => card.id === id);
  }
}

const mockDB = new MockDB();

export default mockDB;
