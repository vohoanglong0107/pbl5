import Command from "./Command";
import Game from "../Game";
import Player from "../Player";

export default class SeeTheFutureCommand implements Command {
  constructor(public source: Player, public gameState: Game) {}
  execute(): void {
    throw new Error("Not implemented");
  }
}
