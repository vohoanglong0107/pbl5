import Command from "./Command";
import Game from "../Game";
import Player from "../Player";
import Interactive from "../Interactive";

export default class SeeTheFutureCommand implements Command {
  constructor(public source: Player, public target: Interactive) {}
  execute(): void {}
}
