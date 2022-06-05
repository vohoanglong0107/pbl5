import debugModule from "debug";
import GameEntity from "../GameEntity";
import Player from "../Player";
import { CardCommands } from "./CardCommands";
import Command, { Response } from "./Command";
import Explode from "./Explode";
const debug = debugModule("backend:socket:game");

// TODO: refactor this with Draw Command
export default class DrawFromBottom implements Command {
  constructor(public source: Player, public gameEntity: GameEntity) {}
  execute(): Response {
    const card = this.gameEntity.deck.getBottomCard();
    debug(`${this.source.id} drew card ${JSON.stringify(card)} from bottom`);
    if (card.commandId === CardCommands.EXPLODE) {
      const explodeCommand = new Explode(this.source, this.gameEntity);
      explodeCommand.execute();
      if (!this.source.exploded) {
        this.gameEntity.deck.cards.push(card);
      }
    } else {
      this.source.draw(card);
    }
    this.gameEntity.currentPlayerNumberOfTurns--;
    return {
      type: CardCommands.DRAW_FROM_BOTTOM,
      data: card,
    };
  }
}
