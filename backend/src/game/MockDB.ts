import { CardCommands } from "./command/CardCommands";
import Card from "./Card";

class MockDB {
  public readonly desks = {
    name: "main-desk",
    cards: [
      {
        id: "0",
        commandId: CardCommands.EXPLODE,
      },
    ],
  };
  constructor() {
    for (let i = 1; i < 16; i++) {
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
    for (let i = 32; i < 48; ++i) {
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
  }
  getCard(id: string): Card | undefined {
    return this.desks.cards.find((card) => card.id === id);
  }
}

const mockDB = new MockDB();

export default mockDB;
