import Card from "@/game/Card";
import Player from "./Player";

export default class Game {
  constructor(
    public deck: Card[],
    public discardPile: Card[],
    public players: Player[],
    public currentPlayerId: string,
    public currentPlayerNumTurn: number,
    public direction: number = 1
  ) {}
}
