import debugModule from "debug";
import EventEmitter from "events";
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

export default class Game extends EventEmitter {
  gameEntity: GameEntity;
  players: Player[];
  currentPlayer!: Player;
  private cardConverter: CardConverter;
  private currentTimer!: NodeJS.Timeout;
  private turnTime: number;
  constructor(players: Player[], turnTime: number) {
    super();
    this.players = players;
    this.turnTime = turnTime;
    this.gameEntity = new GameEntity();
    this.cardConverter = new CardConverter(this.gameEntity);
    for (let player of players) {
      player?.reset();
    }
    this.start();
  }
  start() {
    this.currentPlayer = this.nextPlayer();
    this.startTurn();
  }
  startTurn() {
    if (this.isOver()) return this.over();
    this.updateFromGameEntity();

    this.currentTimer = setTimeout(() => {
      this.endTurn();
    }, this.turnTime);
    this.emit("start-turn");
    debug(`Player ${this.currentPlayer.id} is starting turn`);
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
      const nextPlayer = this.getPlayer(this.gameEntity.nextPlayer);
      if (!nextPlayer) {
        throw new Error(`Player ${this.gameEntity.nextPlayer} is not in game`);
      }
      this.currentPlayer = nextPlayer;
    }
  }
  endTurn(draw: boolean = true) {
    clearTimeout(this.currentTimer);
    if (draw) this.handlePlayerDrawCard(this.currentPlayer);
    debug(`Player ${this.currentPlayer.id} is ending turn`);
    this.startTurn();
  }
  passTurnToNextPlayer() {
    this.currentPlayer = this.nextPlayer(this.currentPlayer);
  }
  // TODO: add direction
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

    const rankedCandidates = playersAfterCurrentSeat.sort(
      (a, b) => a.seat - b.seat
    );
    if (rankedCandidates.length === 0) {
      throw new Error("No player left");
    }

    return rankedCandidates[0];
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
    this.endTurn(false);
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
  isOver(): boolean {
    let remainingPlayers = this.players.filter((player) => !player.exploded);
    return remainingPlayers.length <= 1;
  }
  over() {
    clearTimeout(this.currentTimer);
    this.emit("over");
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
      this.handleCurrentPlayerBeingRemoved();
    }
  }
  handleCurrentPlayerBeingRemoved() {
    this.gameEntity.nextPlayer = true;
    this.endTurn(false);
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
