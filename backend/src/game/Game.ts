import debugModule from "debug";
import GameEntity from "./GameEntity";
import Player from "./Player";
import GameModel from "@/model/Game";
import CardConverter from "./command/CardConverter";
import Draw from "./command/Draw";
const debug = debugModule("backend:socket:game");

export enum GameEvent {
  PLAY_CARD = "game:play-card",
  DRAW_CARD = "game:draw-card",
}

export default class Game {
  gameEntity: GameEntity;
  players: Player[];
  currentPlayer!: Player;
  private cardConverter: CardConverter;
  private currentTimer: NodeJS.Timeout | null = null;
  constructor(players: Player[]) {
    this.players = players;
    this.gameEntity = new GameEntity();
    this.cardConverter = new CardConverter(this);
    for (let player of players) {
      player?.reset();
    }
    this.start();
  }
  start() {
    this.startTurn();
    this.currentPlayer = this.nextPlayer();
  }
  startTurn() {
    this.updateFromGameEntity();
    // this.currentTimer = setTimeout(() => {
    //   this.endTurn();
    // });
  }
  updateFromGameEntity() {
    if (this.gameEntity.nextPlayer === null) {
      if (this.gameEntity.currentPlayerNumberOfTurns === 0) {
        this.gameEntity.currentPlayerNumberOfTurns = 1;
        this.passTurnToNextPlayer();
      }
    } else if (this.gameEntity.nextPlayer === true) {
      this.passTurnToNextPlayer();
    } else {
      const currentPlayer = this.getPlayer(this.gameEntity.nextPlayer);
      if (!currentPlayer) {
        throw new Error(`Player ${this.gameEntity.nextPlayer} is not in game`);
      }
      this.currentPlayer = currentPlayer;
    }
  }
  endTurn() {
    this.handlePlayerDrawCard(this.currentPlayer);
  }
  passTurnToNextPlayer() {
    this.currentPlayer = this.nextPlayer(this.currentPlayer);
  }
  nextPlayer(player?: Player) {
    let currentSeat = player === undefined ? -1 : player.seat;
    let playersAfterCurrentSeat = this.players.filter(
      (player) => player.seat > currentSeat && !player.exploded
    );
    if (playersAfterCurrentSeat.length === 0) {
      playersAfterCurrentSeat = [...this.players].filter(
        (player) => !player.exploded
      );
    }

    return playersAfterCurrentSeat.sort((a, b) => a.seat - b.seat)[0];
  }

  handlePlayerEvent(player: Player, event: GameEvent, ...data: any[]) {
    let res: unknown;
    switch (event) {
      case GameEvent.PLAY_CARD:
        const cardIds = data[0] as string[];
        res = this.handlePlayerPlayCard(player, cardIds);
        break;

      case GameEvent.DRAW_CARD:
        res = this.handlePlayerDrawCard(player);
        break;
    }
    this.startTurn();
    return res;
  }
  handlePlayerDrawCard(player: Player) {
    const command = new Draw(player, this.gameEntity);
    command.execute();
  }
  handlePlayerPlayCard(player: Player, cardIds: string[]) {
    try {
      debug(`${player.id} tried to play card ${cardIds}`);
      const cards = cardIds.map((cardId) => player.hand.get(cardId)!);
      const command = this.cardConverter.convert(cards, { source: player });
      command.execute();
      player.hand.remove(cardIds);
    } catch (error) {
      debug(`${player.id} tried to play invalid card ${error}`);
      throw error;
    }
  }
  isGameOver(): boolean {
    let remainingPlayers = this.players.filter((player) => !player.exploded);
    return remainingPlayers.length <= 1;
  }
  // TODO: handle abruption disconnect
  //  e.g. disconnect while in turn or when performing special action
  //  e.g. being favored ...
  removePlayer(playerId: string): void {
    let player = this.players.find((player) => player.id === playerId);
    if (!player) {
      debug(`Player ${playerId} is being removed while not in game`);
      return;
    }
    this.players = this.players.filter((player) => player.id !== playerId);
    if (player.id === this.currentPlayer?.id) {
      this.passTurnToNextPlayer();
    }
  }
  getPlayer(playerId: string): Player | undefined {
    return this.players.find((player) => player.id === playerId);
  }
  encode(): GameModel {
    const players = this.players.map((player) =>
      player ? player.encode() : player
    );
    return new GameModel(
      this.gameEntity.deck.cards,
      this.gameEntity.discardPile,
      players,
      this.currentPlayer?.id,
      this.gameEntity.currentPlayerNumberOfTurns,
      this.gameEntity.direction
    );
  }
  static isGameEvent(event: string): event is GameEvent {
    return Object.values(GameEvent).includes(event as GameEvent);
  }
}
