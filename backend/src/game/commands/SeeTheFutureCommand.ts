import Command from "./Command";
import GameState from "../GameState";
import Player from "../Player";

export default class SeeTheFutureCommand implements Command {
  constructor(public source: Player, public target: GameState) {}
  execute(): void {}
}
