import Command from "./Command";
import Player from "../Player";
import GameState from "../GameState";

// TODO add interactive element for defusing
//  For example:
//  - Player draw explode card -> auto play explode card
//  - Prompt user to play a defuse card
//  - If user doesn't have a defuse card, player is exploded (check before prompting)
export default class Defuse implements Command {
  constructor(public source: Player, public gameState: GameState) {}
  execute(): void {
    throw new Error("Defuse should not be played directly (for now))");
  }
}
