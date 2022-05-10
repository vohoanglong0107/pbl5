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
    const stoleCard = this.target.hand.cards[randomCardIndex];
    this.source.hand.cards.push(stoleCard);
    this.target.hand.cards.splice(randomCardIndex, 1);
    return {
      type: CardCommands.CAT,
      data: stoleCard,
    };
  }
}
