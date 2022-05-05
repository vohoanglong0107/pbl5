import debugModule from "debug";
import Deck from "./Deck";
import Card from "./Card";
import Player from "./Player";
import GameStateModel from "@/model/GameState";
const debug = debugModule("backend:socket:game");

export default class GameState {
  deck: Deck;
  discardPile: Card[];
  turn: number = 0;
  players: Array<Player | undefined>;
  currentPlayerIndex: number = 0;
  currentPlayerNumTurn: number = 1;
  direction: number = 1;

  advanceTurn(): void {
    if (this.isGameOver()) return;
    this.currentPlayerNumTurn--;
    // progress to next player
    if (this.currentPlayerNumTurn === 0) {
      this.currentPlayerIndex =
        (this.currentPlayerIndex + 1) % this.players.length;
      while (
        !this.players[this.currentPlayerIndex] ||
        this.players[this.currentPlayerIndex]?.exploded
      ) {
        this.currentPlayerIndex =
          (this.currentPlayerIndex + 1) % this.players.length;
      }
      this.currentPlayerNumTurn = 1;
    }
  }
  constructor(players: Array<Player | undefined>) {
    this.deck = new Deck();
    this.deck.shuffle();
    this.discardPile = [] as Card[];
    this.players = players;
    for (let player of players) {
      player?.reset();
    }
    this.currentPlayerIndex = this.players.findIndex((player) => player);
  }
  isGameOver(): boolean {
    let remainingPlayers = this.players.filter(
      (player) => player && !player.exploded
    );
    return remainingPlayers.length <= 1;
  }
  // TODO: handle abruption disconnect
  //  e.g. disconnect while in turn or when performing special action
  //  e.g. being favored ...
  removePlayer(userId: string): void {
    let playerIndex = this.players.findIndex((player) => player?.id === userId);
    if (playerIndex == -1) {
      debug(`Player ${userId} is being removed while not in game`);
      return;
    }
    this.players[playerIndex] = undefined;
    if (playerIndex === this.currentPlayerIndex) {
      this.advanceTurn();
    }
  }
  getPlayer(userId: string): Player | undefined {
    return this.players.find((player) => player?.id === userId);
  }
  getCurrentPlayer(): Player | undefined {
    return this.players[this.currentPlayerIndex];
  }
  encode(): GameStateModel {
    const players = this.players.map((player) =>
      player ? player.encode() : player
    );
    return new GameStateModel(
      this.deck.cards,
      this.discardPile,
      this.turn,
      players,
      this.currentPlayerIndex,
      this.currentPlayerNumTurn,
      this.direction
    );
  }
}
