import Card from "../card/Card";
import { Player } from "../player";

export default interface GameState {
  deck: Card[];
  discardPile: Card[];
  turn: number;
  players: Array<Player | undefined>;
  currentPlayerIndex: number;
  currentPlayerNumTurn: number;
  direction: number;
}
