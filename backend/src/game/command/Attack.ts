import Command, { Response } from "./Command";
import GameEntity from "../GameEntity";
import { CardCommands } from "./CardCommands";

export default class Attack implements Command {
  constructor(public gameEntity: GameEntity) {}
  execute(): Response {
    this.gameEntity.nextPlayer = true;
    this.gameEntity.currentPlayerNumberOfTurns += 2;
    return {
      type: CardCommands.ATTACK,
    };
  }
}
