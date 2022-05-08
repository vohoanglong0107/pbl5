import Player from "../Player";
import Command from "./Command";
import GameEntity from "../GameEntity";

export default class Cat implements Command {
  constructor(
    public source: Player,
    public gameEntity: GameEntity,
    public target: Player
  ) {}
  execute(): void {
    throw new Error("Not implemented");
  }
}
