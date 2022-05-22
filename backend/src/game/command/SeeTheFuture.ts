import Command, { Response } from "./Command";
import GameEntity from "../GameEntity";
import { CardCommands } from "./CardCommands";

export default class SeeTheFuture implements Command {
  constructor(public gameEntity: GameEntity) {}
  execute(): Response {
    return {
      type: CardCommands.SEE_THE_FUTURE,
      data: this.gameEntity.deck.peek(3).reverse(),
    };
  }
}
