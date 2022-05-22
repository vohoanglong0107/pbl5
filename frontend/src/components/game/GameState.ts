import { Player } from "../player";
import GameEntity from "./GameEntity";
export default interface GameState {
  type: string;
}

export interface IdleState extends GameState {
  type: "IdleState";
}

export interface OverState extends GameState {
  type: "OverState";
  winner: Player;
}

export interface PlayState extends GameState {
  type: "PlayState";
  gameEntity: GameEntity;
  currentPlayer: Player;
}

export interface TargetingState extends GameState {
  type: "TargetingState";
  currentPlayer: Player;
  gameEntity: GameEntity;
}
