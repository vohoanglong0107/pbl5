import Game from "../Game";
import Player from "../Player";
import Command from "./Command";

export default class Cat implements Command {
  constructor(
    public source: Player,
    public game: Game,
    public target: Player
  ) {}
  execute(): void {
    throw new Error("Not implemented");
  }
}
