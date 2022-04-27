import { Commands } from "./command/Commands";
import Card from "./Card";

class MockDB {
  public readonly desks = {
    name: "main-desk",
    cards: [
      {
        id: "0",
        commandId: Commands.EXPLODE,
      },
    ],
  };
  constructor() {
    for (let i = 1; i < 5; i++) {
      this.desks.cards.push({
        id: `${i}`,
        commandId: Commands.EXPLODE,
      });
    }

    for (let i = 5; i < 8; i++) {
      this.desks.cards.push({
        id: `${i}`,
        commandId: Commands.DEFUSE,
      });
    }
    for (let i = 8; i < 16; ++i) {
      this.desks.cards.push({
        id: `${i}`,
        commandId: Commands.SKIP,
      });
    }
  }
  getCard(id: string): Card | undefined {
    return this.desks.cards.find((card) => card.id === id);
  }
}

const mockDB = new MockDB();

export default mockDB;
