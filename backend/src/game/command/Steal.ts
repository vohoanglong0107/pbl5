import Player from "../Player";
import Command, { Response } from "./Command";
import GameEntity from "../GameEntity";
import { CardCommands } from "./CardCommands";

export default class Steal implements Command {
  constructor(
    public source: Player,
    public gameEntity: GameEntity,
    public target: Player
  ) {}
  execute(): Response {
    const randomCardIndex = Math.floor(
      Math.random() * this.target.hand.cards.length
    );
    const stolenCard = this.target.hand.cards.splice(randomCardIndex, 1);
    this.source.hand.cards.push(...stolenCard);
    return {
      type: CardCommands.CAT,
      data: stolenCard,
    };
  }
}
