import Card from "@/game/Card";
import Command from "./Command";
import Defuse from "./Defuse";
import Explode from "./Explode";
import Cat from "./Cat";
import Skip from "./Skip";
import { CardCommands } from "./CardCommands";
import Player from "../Player";
import Game from "../Game";

export type CommandCreationInfo = {
  source: Player;
  target?: Player;
};

export default class CardConverter {
  constructor(public game: Game) {}
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
        return new Defuse(source, this.game.gameEntity);
      case CardCommands.EXPLODE:
        return new Explode(source, this.game.gameEntity);
      case CardCommands.SKIP:
        return new Skip(this.game.gameEntity);
      case CardCommands.CAT:
        return new Cat(source, this.game, target!);
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
