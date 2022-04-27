import Command from "./Command";
import GameState from "../GameState";
import Player from "../Player";

export default class SeeTheFutureCommand implements Command {
  constructor(public source: Player, public gameState: GameState) {}
  execute(): void {
    throw new Error("Not implemented");
  }
}
