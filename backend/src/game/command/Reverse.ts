import Command, { Response } from "./Command";
import GameEntity from "../GameEntity";
import { CardCommands } from "./CardCommands";

export default class Skip implements Command {
  constructor(public gameEntity: GameEntity) {}
  execute(): Response {
    this.gameEntity.currentPlayerNumberOfTurns--;
    this.gameEntity.direction = this.gameEntity.direction ^ 1;
    return {
      type: CardCommands.REVERSE,
    };
  }
}
