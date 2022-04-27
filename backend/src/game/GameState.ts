import Deck from "./Deck";
import Card from "./Card";
import Player from "./Player";

export default class GameState {
  deck: Deck;
  discardPile: Card[];
  turn: number = 0;
  players: Player[];
  currentPlayerIndex: number = 0;
  currentPlayerNumTurn: number = 1;
  direction: number = 1;

  advanceTurn(): void {
    this.currentPlayerNumTurn--;
    // progress to next player
    if (this.currentPlayerNumTurn === 0) {
      this.currentPlayerIndex =
        (this.currentPlayerIndex + 1) % this.players.length;
      while (this.players[this.currentPlayerIndex].exploded)
        this.currentPlayerIndex =
          (this.currentPlayerIndex + 1) % this.players.length;
      this.currentPlayerNumTurn = 1;
    }
  }
  constructor(players: Player[]) {
    this.deck = new Deck();
    this.deck.shuffle();
    this.discardPile = [] as Card[];
    this.players = players;
    for (let player of players) {
      player.reset();
    }
  }
  isGameOver(): boolean {
    let remainingPlayers = this.players.filter((player) => !player.exploded);
    return remainingPlayers.length === 1;
  }
}
