import Command from "./Command";
import GameEntity from "../GameEntity";

export default class Shuffle implements Command {
  constructor(public gameEntity: GameEntity) {}
  execute(): void {
    this.gameEntity.deck.shuffle();
  }
}
