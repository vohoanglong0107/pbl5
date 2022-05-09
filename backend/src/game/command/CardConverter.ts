import Card from "@/game/Card";
import Command from "./Command";
import Defuse from "./Defuse";
import Explode from "./Explode";
import Cat from "./Cat";
import Skip from "./Skip";
import { CardCommands } from "./CardCommands";
import Player from "../Player";
import GameEntity from "../GameEntity";
import DrawFromBottom from "./DrawFromBottom";

export type CommandCreationInfo = {
  source: Player;
  target?: Player;
};

export default class CardConverter {
  constructor(public gameEntity: GameEntity) {}
  public convert(
    cards: Card[],
    commandCreationInfo: CommandCreationInfo
  ): Command {
    if (cards.length === 1) {
      return this.createFromSingleCard(cards[0], commandCreationInfo);
    }
    return this.createFromMultipleCards(cards, commandCreationInfo);
  }
  private createFromSingleCard(
    card: Card,
    commandCreationInfo: CommandCreationInfo
  ): Command {
    const { source, target } = commandCreationInfo;
    switch (card.commandId) {
      case CardCommands.DEFUSE:
        return new Defuse(source, this.gameEntity);
      case CardCommands.EXPLODE:
        return new Explode(source, this.gameEntity);
      case CardCommands.SKIP:
        return new Skip(this.gameEntity);
      case CardCommands.DRAW_FROM_BOTTOM:
        return new DrawFromBottom(source, this.gameEntity);
      case CardCommands.CAT:
        return new Cat(source, this.gameEntity, target!);
      default:
        throw new Error(`Unknown command id: ${card.commandId}`);
    }
  }
  private createFromMultipleCards(
    cards: Card[],
    commandCreationInfo: CommandCreationInfo
  ): Command {
    throw new Error("Not implemented");
  }
}
