import Card from "../card/Card";
import { Player } from "../player";

export default interface GameState {
  deck: Card[];
  discardPile: Card[];
  turn: number;
  players: Player[];
  currentPlayerId: string;
  currentPlayerNumTurn: number;
  direction: number;
}
