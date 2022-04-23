import Command from "./Command";
import Player from "../Player";
import GameState from "../GameState";

class DrawCardCommand implements Command {
  constructor(public source: Player, public target: GameState) {}
  execute(): void {
    this.source.draw(this.target.deck);
    this.target.advanceTurn();
  }
}

export default DrawCardCommand;
