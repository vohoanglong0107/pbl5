import Command, { Response } from "./Command";
import { CardCommands } from "./CardCommands";
import GameEntity from "../GameEntity";

export default class Shuffle implements Command {
  constructor(public gameEntity: GameEntity) {}
  execute(): Response {
    this.gameEntity.deck.shuffle();
    return {
      type: CardCommands.SHUFFLE,
    };
  }
}
