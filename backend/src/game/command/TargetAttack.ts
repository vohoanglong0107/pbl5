import Command, { Response } from "./Command";
import GameEntity from "../GameEntity";
import Player from "../Player";
import { CardCommands } from "./CardCommands";

export default class TargetAttack implements Command {
  constructor(public gameEntity: GameEntity, public target: Player) {}
  execute(): Response {
    this.gameEntity.nextPlayer = this.target;
    if (this.gameEntity.currentPlayerNumberOfTurns === 1)
      this.gameEntity.currentPlayerNumberOfTurns = 2;
    else this.gameEntity.currentPlayerNumberOfTurns += 2;
    return {
      type: CardCommands.TARGET_ATTACK,
    };
  }
}
