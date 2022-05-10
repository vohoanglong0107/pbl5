import Command from "./Command";
import GameEntity from "../GameEntity";
import { CardCommands } from "./CardCommands";

export default class Skip implements Command {
  constructor(public gameEntity: GameEntity) {}
  execute() {
    this.gameEntity.currentPlayerNumberOfTurns--;
    return {
      type: CardCommands.SKIP,
    };
  }
}
