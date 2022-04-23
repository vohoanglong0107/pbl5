import Player from "@/game/Player";
import Card from "@/game/Card";
import UserModel from "./User";

export default class PlayerModel extends UserModel {
  hand: Card[];
  constructor(player: Player) {
    super(player);
    this.hand = player.hand.cards;
  }
}
