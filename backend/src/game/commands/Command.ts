import Player from "../Player";
import Interactive from "../Interactive";

export default interface Command {
  source: Player;
  target: Interactive;
  execute(): void;
}
