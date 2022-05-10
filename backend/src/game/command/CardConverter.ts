import Card from "@/game/Card";
import Command from "./Command";
import Defuse from "./Defuse";
import Explode from "./Explode";
import Cat from "./Cat";
import Skip from "./Skip";
import { CardCommands } from "./CardCommands";
import Player from "../Player";
import GameEntity from "../GameEntity";
import SeeTheFuture from "./SeeTheFuture";
import Steal from "./Steal";

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
    if (cards.length === 0) {
      throw new Error("You must select at least one card");
    }
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
      case CardCommands.SEE_THE_FUTURE:
        return new SeeTheFuture(this.gameEntity);
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
    const { source, target } = commandCreationInfo;
    const commandId = cards[0].commandId;
    const checkAllCardSameCommand = (): boolean => {
      return cards.every((card) => card.commandId === commandId);
    };
    if (!checkAllCardSameCommand()) {
      throw new Error("You must select cards with the same mechanic");
    }
    switch (cards.length) {
      case 2:
        return new Steal(source, this.gameEntity, target!);
      case 5:
        throw new Error("Unimplemented");
      default:
        throw new Error("You can only play 2 or 5 cards");
    }
  }
  isTargetRequired(card: Card): boolean {
    switch (card.commandId) {
      case CardCommands.CAT:
        return true;
      default:
        return false;
    }
  }
}
