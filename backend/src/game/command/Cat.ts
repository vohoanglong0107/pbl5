import GameState from "../GameState";
import Player from "../Player";
import Command from "./Command";

export default class Cat implements Command {
  constructor(
    public source: Player,
    public gameState: GameState,
    public target: Player
  ) {}
  execute(): void {
    throw new Error("Not implemented");
  }
}
