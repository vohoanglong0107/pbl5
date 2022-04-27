import Card from "../card/Card";
import { Player } from "../player";

export default interface GameState {
  deck: Card[];
  discardPile: Card[];
  players: Player[];
  currentPlayerIndex: number;
  currentPlayerNumTurn: number;
  direction: number;
}
