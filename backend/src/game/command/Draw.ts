import debugModule from "debug";
import GameEntity from "../GameEntity";
import Player from "../Player";
import { CardCommands } from "./CardCommands";
import Command from "./Command";
import Explode from "./Explode";
const debug = debugModule("backend:socket:game");

export default class Draw implements Command {
  constructor(public source: Player, public gameEntity: GameEntity) {}
  execute(): void {
    const card = this.gameEntity.deal();
    debug(`${this.source.id} drew card ${JSON.stringify(card)}`);
    if (card.commandId === CardCommands.EXPLODE) {
      const explodeCommand = new Explode(this.source, this.gameEntity);
      explodeCommand.execute();
    } else {
      this.source.draw(card);
    }
    this.gameEntity.currentPlayerNumberOfTurns--;
  }
}
