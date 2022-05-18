import Card from "@/game/Card";
import Player from "./Player";

export class GameEntity {
  constructor(
    public deck: Card[],
    public discardPile: Card[],
    public currentPlayerNumberOfTurns: number,
    public direction: number
  ) {}
}

export interface GameState {
  type: string;
}

export class IdleState implements GameState {
  public type: string;
  constructor() {
    this.type = "IdleState";
  }
}

export class OverState implements GameState {
  public type: string;
  public winner: Player;
  constructor(winner: Player) {
    this.type = "OverState";
    this.winner = winner;
  }
}

export class PlayState implements GameState {
  public type: string;
  public gameEntity: GameEntity;
  public currentPlayer: Player;
  constructor(gameEntity: GameEntity, currentPlayer: Player) {
    this.type = "PlayState";
    this.gameEntity = gameEntity;
    this.currentPlayer = currentPlayer;
  }
}

export class TargetingState implements GameState {
  public type: string;
  public currentPlayer: Player;
  public gameEntity: GameEntity;
  constructor(gameEntity: GameEntity, currentPlayer: Player) {
    this.type = "TargetingState";
    this.gameEntity = gameEntity;
    this.currentPlayer = currentPlayer;
  }
}

export class Game {
  constructor(public currentState: GameState, public players: Player[]) {}
}
