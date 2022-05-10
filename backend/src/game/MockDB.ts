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
    for (let i = 24; i < 40; ++i) {
      this.desks.cards.push({
        id: `${i}`,
        commandId: CardCommands.SKIP,
      });
    }
    for (let i = 40; i < 64; ++i) {
      this.desks.cards.push({
        id: `${i}`,
        commandId: CardCommands.SEE_THE_FUTURE,
      });
    }
  }
  getCard(id: string): Card | undefined {
    return this.desks.cards.find((card) => card.id === id);
  }
}

const mockDB = new MockDB();

export default mockDB;
