import { Player } from "../player";
import GameState from "./GameState";

export default interface Game {
  currentState: GameState;
  players: Player[];
}
