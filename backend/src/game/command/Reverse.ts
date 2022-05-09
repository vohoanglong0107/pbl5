import Command from "./Command";
import GameEntity from "../GameEntity";

export default class Skip implements Command {
  constructor(public gameEntity: GameEntity) {}
  execute(): void {
    this.gameEntity.currentPlayerNumberOfTurns--;
    this.gameEntity.direction = this.gameEntity.direction ^ 1;
  }
}
