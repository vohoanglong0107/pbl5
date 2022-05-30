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

export interface InGameState extends GameState {
  gameEntity: GameEntity;
  currentPlayer: Player;
}

export interface PlayState extends InGameState {
  type: "PlayState";
}

export interface TargetingState extends InGameState {
  type: "TargetingState";
}
