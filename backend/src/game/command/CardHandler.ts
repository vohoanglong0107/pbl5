import Card from "@/game/Card";
import Command from "./Command";
import Defuse from "./Defuse";
import Explode from "./Explode";
import Skip from "./Skip";
import { CardCommands } from "./CardCommands";
import Player from "../Player";
import GameEntity from "../GameEntity";
import SeeTheFuture from "./SeeTheFuture";
import Steal from "./Steal";
import DrawFromBottom from "./DrawFromBottom";
import Attack from "./Attack";
import Shuffle from "./Shuffle";
import Reverse from "./Reverse";
import TargetAttack from "./TargetAttack";

export type CommandCreationInfo = {
  source: Player;
  target?: Player;
};

export default class CardHandler {
  private cards?: Card[];
  private commandId?: CardCommands;
  private source?: Player;
  private target?: Player;
  constructor(public gameEntity: GameEntity) {}
  public isTargetRequired(): boolean {
    return (
      this.commandId === CardCommands.STEAL ||
      this.commandId === CardCommands.TARGET_ATTACK
    );
  }
  public setCards(cards: Card[]) {
    this.checkCardsValid(cards);
    this.cards = cards;
    this.commandId = this.convertCardsToCommand(cards);
    return this;
  }
  public setSource(source: Player) {
    this.source = source;
    return this;
  }
  public setTarget(target: Player) {
    this.target = target;
    return this;
  }
  public play(): unknown {
    if (this.cards === undefined || this.commandId === undefined)
      throw new Error("Cards haven't set yet");
    if (this.source === undefined) throw new Error("Source hasn't set yet");
    if (this.isTargetRequired() && this.target === undefined)
      throw new Error("Target hasn't set yet");
    const command = this.convert(this.commandId);
    const res = command.execute();
    this.source.hand.remove(this.cards);
    return res;
  }
  private convert(commandId: CardCommands): Command {
    switch (commandId) {
      case CardCommands.DEFUSE:
        return new Defuse(this.source!, this.gameEntity);
      case CardCommands.EXPLODE:
        return new Explode(this.source!, this.gameEntity);
      case CardCommands.SKIP:
        return new Skip(this.gameEntity);
      case CardCommands.SEE_THE_FUTURE:
        return new SeeTheFuture(this.gameEntity);
      case CardCommands.STEAL:
        return new Steal(this.source!, this.gameEntity, this.target!);
      case CardCommands.DRAW_FROM_BOTTOM:
        return new DrawFromBottom(this.source!, this.gameEntity);
      case CardCommands.ATTACK:
        return new Attack(this.gameEntity);
      case CardCommands.TARGET_ATTACK:
        return new TargetAttack(this.gameEntity, this.target!);
      case CardCommands.REVERSE:
        return new Reverse(this.gameEntity);
      case CardCommands.SHUFFLE:
        return new Shuffle(this.gameEntity);
      default:
        throw new Error(`Unknown command id: ${this.commandId}`);
    }
  }
  private checkCardsValid(cards: Card[]) {
    if (cards.length === 0)
      throw new Error("You must select at least one card");
    const commandId = cards[0].commandId;
    const checkAllCardSameCommand = (): boolean => {
      return cards.every((card) => card.commandId === commandId);
    };
    if (!checkAllCardSameCommand()) {
      throw new Error("You must select cards with the same mechanic");
    }
  }
  private convertCardsToCommand(cards: Card[]): CardCommands {
    const commandId = cards[0].commandId;
    switch (cards.length) {
      case 1:
        return commandId;
      case 2:
        return CardCommands.STEAL;
      case 5:
        throw new Error("Unimplemented");
      default:
        throw new Error("You can only play 2 or 5 cards");
    }
  }
}
