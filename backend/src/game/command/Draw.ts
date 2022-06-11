import debugModule from "debug";
import GameEntity from "../GameEntity";
import Player from "../Player";
import { CardCommands } from "./CardCommands";
import Command from "./Command";
import Explode from "./Explode";
const debug = debugModule("backend:socket:game");

export default class Draw implements Command {
  constructor(public source: Player, public gameEntity: GameEntity) {}
  execute() {
    const card = this.gameEntity.deal();
    debug(`${this.source.id} drew card ${JSON.stringify(card)}`);
    if (card.commandId === CardCommands.EXPLODE) {
      const explodeCommand = new Explode(this.source, this.gameEntity);
      explodeCommand.execute();
      if (!this.source.exploded) {
        this.gameEntity.deck.randomlyPushCard(card);
      }
    } else {
      this.source.draw(card);
    }
    this.gameEntity.currentPlayerNumberOfTurns--;
    // TODO: What should i do for this command type?
    return {
      type: 999,
      data: card,
    };
  }
}
