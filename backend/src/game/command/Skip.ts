import Command from "./Command";
import GameState from "../GameState";

export default class Skip implements Command {
  constructor(public gameState: GameState) {}
  execute(): void {
    this.gameState.advanceTurn();
  }
}
