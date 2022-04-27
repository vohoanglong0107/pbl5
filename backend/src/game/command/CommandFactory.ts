import Card from "@/game/Card";
import Command from "./Command";
import Defuse from "./Defuse";
import Explode from "./Explode";
import Cat from "./Cat";
import Skip from "./Skip";
import { Commands } from "./Commands";
import Player from "../Player";
import GameState from "../GameState";

export type CommandCreationInfo = {
  target?: Player;
};

export default class CommandFactory {
  constructor(public gameState: GameState) {}
  public create(
    source: Player,
    cards: Card[],
    additionalInfo?: CommandCreationInfo
  ): Command {
    if (cards.length === 1) {
      return this.createFromSingleCard(source, cards[0], additionalInfo);
    }
    return this.createFromMultipleCards(source, cards, additionalInfo);
  }
  private createFromSingleCard(
    source: Player,
    card: Card,
    additionalInfo?: CommandCreationInfo
  ): Command {
    switch (card.commandId) {
      case Commands.DEFUSE:
        return new Defuse(source, this.gameState);
      case Commands.EXPLODE:
        return new Explode(source, this.gameState);
      case Commands.SKIP:
        return new Skip(this.gameState);
      case Commands.CAT:
        return new Cat(source, this.gameState, additionalInfo!.target!);
      default:
        throw new Error(`Unknown command id: ${card.commandId}`);
    }
  }
  private createFromMultipleCards(
    source: Player,
    cards: Card[],
    additionalInfo?: CommandCreationInfo
  ): Command {
    throw new Error("Not implemented");
  }
}
