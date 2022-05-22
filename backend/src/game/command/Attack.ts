import Command, { Response } from "./Command";
import GameEntity from "../GameEntity";
import { CardCommands } from "./CardCommands";

export default class Attack implements Command {
  constructor(public gameEntity: GameEntity) {}
  execute(): Response {
    this.gameEntity.nextPlayer = true;
    // Check if the player has been affected by an attack card or not
    if (this.gameEntity.currentPlayerNumberOfTurns === 1)
      this.gameEntity.currentPlayerNumberOfTurns = 2;
    else this.gameEntity.currentPlayerNumberOfTurns += 2;
    return {
      type: CardCommands.ATTACK,
    };
  }
}
