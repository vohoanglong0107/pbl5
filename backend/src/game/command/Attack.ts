import Command from "./Command";
import GameEntity from "../GameEntity";

export default class Attack implements Command {
  constructor(public gameEntity: GameEntity) {}
  execute(): void {
    this.gameEntity.nextPlayer = true;
    this.gameEntity.currentPlayerNumberOfTurns += 2;
  }
}
