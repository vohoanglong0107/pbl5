import Command from "./Command";
import Player from "../Player";
import GameEntity from "../GameEntity";
import { CardCommands } from "./CardCommands";

export default class Explode implements Command {
  constructor(public source: Player, public gameEntity: GameEntity) {}
  execute(): void {
    if (this.source.exploded) {
      // Should never happened as client can't draw anymore before defusing
      throw new Error("Player is already exploding");
    }
    if (
      !this.source.hand.cards.some(
        (card) => card.commandId === CardCommands.DEFUSE
      )
    ) {
      this.source.exploded = true;
    } else {
      const defuseCard = this.source.hand.cards.find(
        (card) => card.commandId === CardCommands.DEFUSE
      )!;
      this.source.hand.remove([defuseCard.id]);
    }
  }
}
