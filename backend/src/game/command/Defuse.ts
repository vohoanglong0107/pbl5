import Command, { Response } from "./Command";
import Player from "../Player";
import GameEntity from "../GameEntity";

// TODO add interactive element for defusing
//  For example:
//  - Player draw explode card -> auto play explode card
//  - Prompt user to play a defuse card
//  - If user doesn't have a defuse card, player is exploded (check before prompting)
export default class Defuse implements Command {
  constructor(public source: Player, public gameEntity: GameEntity) {}
  execute(): Response {
    throw new Error("Defuse should not be played directly (for now))");
  }
}
