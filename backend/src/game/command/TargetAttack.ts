import Command from "./Command";
import GameEntity from "../GameEntity";
import Player from "../Player";

export default class TargetAttack implements Command {
  constructor(public target: Player, public gameEntity: GameEntity) {}
  execute(): void {
    this.gameEntity.nextPlayer = this.target.id;
    this.gameEntity.currentPlayerNumberOfTurns += 2;
  }
}
