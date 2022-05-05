import Card from "@/game/Card";
import Player from "./Player";

export default class GameState {
  constructor(
    public deck: Card[],
    public discardPile: Card[],
    public turn: number,
    public players: Array<Player | undefined>,
    public currentPlayerIndex: number,
    public currentPlayerNumTurn: number,
    public direction: number = 1
  ) {}
}
