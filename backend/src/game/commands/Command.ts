import Player from "../Player";
import GameState from "../GameState";

export default interface Command {
  source: Player;
  target: GameState;
  execute(): void;
}
