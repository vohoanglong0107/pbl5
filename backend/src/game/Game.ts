import debugModule from "debug";
import EventEmitter from "events";
import GameEntity from "./GameEntity";
import Player from "./Player";
import {
  Game as GameModel,
  GameState as GameStateModel,
  IdleState as IdleStateModel,
  OverState as OverStateModel,
  PlayState as PlayStateModel,
  TargetingState as TargetingStateModel,
} from "@/model/Game";
import CardHandler, { MechanicToCommand } from "./command/CardHandler";
import Draw from "./command/Draw";
import GameSetting from "./GameSetting";
import Card from "./Card";
import cardService from "@/service/Card";
const debug = debugModule("backend:socket:game");

//? Change underlining data structure to Map ?
class PlayerManager {
  private players: Player[] = [];
  private maxPlayers: number;
  constructor(maxPlayers: number) {
    this.maxPlayers = maxPlayers;
  }
  addPlayer(playerId: string, playerName: string) {
    const vacantSeat = this.getVacantSeat();
    if (vacantSeat === undefined) {
      throw new Error("No vacant seat");
    }
    const player = new Player(playerId, playerName, vacantSeat);
    this.players.push(player);
    return player;
  }
  getPlayer(playerId: string) {
    const player = this.players.find((player) => player.id === playerId);
    return player;
  }
  getActivePlayer() {
    return this.players.filter((player) => !player.exploded);
  }

  // TODO: handle direction
  getNextPlayer(player: Player) {
    let currentSeat = player.seat;
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
  getRandomPlayer(exclude: Player[] = []) {
    const players = this.getActivePlayer().filter(
      (player) => !exclude.includes(player)
    );
    const randomTargetIndex = Math.floor(Math.random() * players.length);
    return players[randomTargetIndex];
  }
  removePlayer(playerId: string) {
    let player = this.players.find((player) => player.id === playerId);
    if (!player) {
      debug(`Player ${playerId} is being removed while not in game`);
      return;
    }
    this.players = this.players.filter((player) => player.id !== playerId);
  }
  reserveSeat(player: Player, seatId: number): void {
    if (seatId >= this.maxPlayers) {
      throw new Error(`Seat ${seatId} is out of range`);
    }
    // Temporary fix when Player first join game, perform both get random Seat and choose seat to that very same seat.
    if (player.seat === seatId) {
      return;
    }
    if (this.isSeatVacant(seatId)) {
      player.seat = seatId;
    } else {
      throw new Error(`Seat ${seatId} is not vacant`);
    }
  }
  private isSeatVacant(seatId: number): boolean {
    return this.players.every((player) => player.seat !== seatId);
  }
  private getVacantSeat(): number | undefined {
    for (let seatId = 0; seatId < this.maxPlayers; seatId++) {
      if (this.isSeatVacant(seatId)) {
        return seatId;
      }
    }
    return undefined;
  }
  isLastManStanding() {
    const activePlayers = this.getActivePlayer();
    return activePlayers.length <= 1;
  }
  reset() {
    this.players.forEach((player) => {
      player.reset();
    });
  }
  encode() {
    return this.players.map((player) => player.encode());
  }
}

export enum GameEvent {
  START = "game:start",
  PLAY_CARD = "game:play-card",
  DRAW_CARD = "game:draw-card",
  OVER = "game:over",
  REQUEST_TARGET = "game:request-target",
  TARGET_PLAYER = "game:target-player",
  TAKE_SEAT = "game:take-seat",
}

interface GameState {
  handlePlayerEvent: (player: Player, event: string, ...data: any[]) => unknown;
  onEntry: () => void;
  onExit: () => void;
  onRemovePlayer: (playerId: string) => void;
  encode: () => GameStateModel;
}

class StateManager {
  private currentState: GameState[] = [];
  public pushState(state: GameState) {
    if (this.topState) this.topState.onExit();
    this.currentState.push(state);
    state.onEntry();
  }
  public popState() {
    this.topState.onExit();
    this.currentState.pop();
    if (this.topState) this.topState.onEntry();
  }
  public changeState(state: GameState) {
    if (this.topState) this.topState.onExit();
    this.currentState.pop();
    this.currentState.push(state);
    state.onEntry();
  }
  public get topState() {
    return this.currentState[this.currentState.length - 1];
  }
}

class EventTracker extends EventEmitter {}

export enum IdleStateEvent {
  TAKE_SEAT = "game:take-seat",
  START = "game:start",
}

class IdleState implements GameState {
  constructor(
    private stateManager: StateManager,
    private playerManager: PlayerManager,
    private gameSetting: GameSetting,
    private eventTracker: EventTracker
  ) {}
  handlePlayerEvent(player: Player, event: string, ...data: any[]) {
    switch (event) {
      case IdleStateEvent.START:
        this.startGame(player);
        break;
      case IdleStateEvent.TAKE_SEAT:
        const seatId = data[0] as number;
        return this.reserveSeat(player, seatId);

      default:
        break;
    }
  }
  private startGame(startingPlayer: Player) {
    this.playerManager.reset();
    const activePlayer = this.playerManager.getActivePlayer().length;
    if (activePlayer < 2) throw new Error("Not enough players");
    cardService.GetMainDeckByPlayerNumber(activePlayer).then((cards) => {
      const compatibleCards = cards.map(
        (card) => new Card(card.id, MechanicToCommand[card.mechanic])
      );
      this.stateManager.changeState(
        new PlayState(
          this.stateManager,
          this.playerManager,
          this.gameSetting,
          this.eventTracker,
          startingPlayer,
          compatibleCards
        )
      );
    });
  }
  private reserveSeat(player: Player, seatId: number): void {
    this.playerManager.reserveSeat(player, seatId);
  }
  onEntry() {
    this.eventTracker.emit("game:state-changed");
  }
  onExit() {}
  onRemovePlayer(playerId: string) {}
  encode() {
    return new IdleStateModel();
  }
}

export enum OverStateEvent {
  TAKE_SEAT = "game:take-seat",
  START = "game:start",
}

class OverState implements GameState {
  constructor(
    private stateManager: StateManager,
    private playerManager: PlayerManager,
    private gameSetting: GameSetting,
    private eventTracker: EventTracker,
    private winner: Player
  ) {}
  handlePlayerEvent(player: Player, event: string, ...data: any[]) {
    switch (event) {
      case OverStateEvent.START:
        this.startGame(this.winner);
        break;
      case OverStateEvent.TAKE_SEAT:
        const seatId = data[0] as number;
        return this.reserveSeat(player, seatId);
      default:
        break;
    }
  }
  private startGame(startingPlayer: Player) {
    this.playerManager.reset();
    const activePlayer = this.playerManager.getActivePlayer().length;
    if (activePlayer < 2) throw new Error("Not enough players");
    cardService.GetMainDeckByPlayerNumber(activePlayer).then((cards) => {
      const compatibleCards = cards.map(
        (card) => new Card(card.id, MechanicToCommand[card.mechanic])
      );
      this.stateManager.changeState(
        new PlayState(
          this.stateManager,
          this.playerManager,
          this.gameSetting,
          this.eventTracker,
          startingPlayer,
          compatibleCards
        )
      );
    });
  }
  private reserveSeat(player: Player, seatId: number): void {
    this.playerManager.reserveSeat(player, seatId);
  }
  onEntry() {
    this.eventTracker.emit("game:state-changed");
    debug("Game over");
  }
  onExit() {}
  onRemovePlayer(playerId: string) {
    if (playerId === this.winner.id) {
      this.stateManager.changeState(
        new IdleState(
          this.stateManager,
          this.playerManager,
          this.gameSetting,
          this.eventTracker
        )
      );
    }
  }
  encode() {
    return new OverStateModel(this.winner.encode());
  }
}

class PlayState implements GameState {
  private stateManager: StateManager;
  private playerManager: PlayerManager;
  private gameSetting: GameSetting;
  private eventTracker: EventTracker;
  private gameEntity: GameEntity;
  private cardHandler: CardHandler;
  private currentTimer!: NodeJS.Timeout;
  private timeLimit: number;
  public currentPlayer: Player;
  constructor(
    stateManager: StateManager,
    playerManager: PlayerManager,
    gameSetting: GameSetting,
    eventTracker: EventTracker,
    currentPlayer: Player,
    cards: Card[]
  ) {
    this.stateManager = stateManager;
    this.playerManager = playerManager;
    this.gameSetting = gameSetting;
    this.eventTracker = eventTracker;
    this.currentPlayer = currentPlayer;
    this.gameEntity = new GameEntity(cards);
    this.cardHandler = new CardHandler(this.gameEntity);
    this.timeLimit = gameSetting.turnTime;
    this.dealCardToEachPlayer();
  }
  private dealCardToEachPlayer() {
    const activePlayers = this.playerManager.getActivePlayer();
    const cards = this.gameEntity.deck.dealCardStartingGame(
      activePlayers.length
    );
    activePlayers.forEach((player, index) => {
      cards[index].forEach((card) => {
        player.hand.add(card);
      });
    });
  }
  onEntry() {
    this.startTurn();
  }
  private startTurn() {
    if (this.isOver()) return this.over();
    this.currentTimer = setTimeout(() => {
      this.endTurn();
    }, this.timeLimit);
    this.updateFromGameEntity();
    debug(`Player ${this.currentPlayer.id} is starting turn`);
    this.eventTracker.emit("game:state-changed");
  }
  private updateFromGameEntity() {
    if (this.gameEntity.nextPlayer === null) {
      if (this.gameEntity.currentPlayerNumberOfTurns === 0) {
        this.gameEntity.currentPlayerNumberOfTurns = 1;
        this.passTurnToNextPlayer();
      }
    } else if (this.gameEntity.nextPlayer === true) {
      this.passTurnToNextPlayer();
      this.gameEntity.nextPlayer = null;
    } else {
      const nextPlayer = this.gameEntity.nextPlayer;
      this.passTurnToNextPlayer(nextPlayer);
      this.gameEntity.nextPlayer = null;
    }
  }
  private passTurnToNextPlayer(nextPlayer?: Player) {
    if (nextPlayer === undefined)
      nextPlayer = this.playerManager.getNextPlayer(this.currentPlayer);

    this.currentPlayer = nextPlayer;
  }
  private endTurn(draw: boolean = true) {
    clearTimeout(this.currentTimer);
    if (draw) this.currentPlayerDrawCard();
    debug(`Player ${this.currentPlayer.id} is ending turn`);
    this.startTurn();
  }
  onExit() {
    clearTimeout(this.currentTimer);
  }
  isOver(): boolean {
    return this.playerManager.isLastManStanding();
  }
  over() {
    this.stateManager.changeState(
      new OverState(
        this.stateManager,
        this.playerManager,
        this.gameSetting,
        this.eventTracker,
        // get last player a.k.a the winner
        this.playerManager.getActivePlayer()[0]
      )
    );
  }
  handlePlayerEvent(player: Player, event: string, ...data: any[]): unknown {
    let res: unknown;
    switch (event) {
      case GameEvent.PLAY_CARD:
        const cardIds = (data[0] as string[]).map((cardId) => parseInt(cardId));
        res = this.handlePlayerPlayCard(player, cardIds);
        break;

      case GameEvent.DRAW_CARD:
        res = this.handlePlayerDrawCard();
        break;
      default:
        throw new Error("Can't perform this action right now");
    }
    return res;
  }
  private handlePlayerPlayCard(player: Player, cardIds: number[]) {
    try {
      // TODO: Check exception for Nope
      if (player.id !== this.currentPlayer.id) {
        throw new Error("Not current player");
      }
      debug(`${player.id} tried to play card ${cardIds}`);
      const cards = cardIds.map((cardId) => player.hand.get(cardId)!);
      this.cardHandler.setSource(player);
      this.cardHandler.setCards(cards);
      if (this.cardHandler.isTargetRequired()) {
        // TODO: should pause current state's timer instead of resetting it
        this.stateManager.pushState(
          new TargetingState(
            this.stateManager,
            this.playerManager,
            this.gameSetting,
            this.eventTracker,
            this.gameEntity,
            this.cardHandler,
            this.currentPlayer
          )
        );
        // not calling endturn here to not start new turn (and endturn, ..., blowing the stack trace)
      } else {
        const res = this.cardHandler.play();
        this.endTurn(false);
        return res;
      }
    } catch (error) {
      debug(`${player.id} tried to play invalid card ${error}`);
      throw error;
    }
  }
  private handlePlayerDrawCard() {
    this.currentPlayerDrawCard();
    this.endTurn(false);
  }
  private currentPlayerDrawCard() {
    const command = new Draw(this.currentPlayer, this.gameEntity);
    command.execute();
  }
  onRemovePlayer(playerId: string) {
    // check game over
    if (playerId === this.currentPlayer.id) {
      this.gameEntity.nextPlayer = true;
      this.endTurn(false);
    } else if (this.playerManager.isLastManStanding()) {
      this.over();
    }
  }
  encode() {
    return new PlayStateModel(
      this.gameEntity.encode(),
      this.currentPlayer.encode()
    );
  }
}

class TargetingState implements GameState {
  private stateManager: StateManager;
  private playerManager: PlayerManager;
  private gameSetting: GameSetting;
  private eventTracker: EventTracker;
  private gameEntity: GameEntity;
  private cardHandler: CardHandler;
  private currentTimer!: NodeJS.Timeout;
  private timeLimit: number;
  public currentPlayer: Player;
  constructor(
    stateManager: StateManager,
    playerManager: PlayerManager,
    gameSetting: GameSetting,
    eventTracker: EventTracker,
    gameEntity: GameEntity,
    cardHandler: CardHandler,
    currentPlayer: Player
  ) {
    this.stateManager = stateManager;
    this.playerManager = playerManager;
    this.gameSetting = gameSetting;
    this.eventTracker = eventTracker;
    this.timeLimit = gameSetting.targetingTime;
    this.currentPlayer = currentPlayer;
    this.gameEntity = gameEntity;
    this.cardHandler = cardHandler;
  }
  handlePlayerEvent(player: Player, event: string, ...data: any[]) {
    let res: unknown;
    switch (event) {
      case GameEvent.TARGET_PLAYER:
        if (player.id !== this.currentPlayer.id)
          throw new Error("Can't perform this action right now");

        const targetId = data[0] as string;
        const targetPlayer = this.playerManager.getPlayer(targetId);

        if (!targetPlayer) throw new Error("Target not found");

        res = this.handlePlayerTargeting(targetPlayer);
        break;
      default:
        throw new Error("Can't perform this action right now");
    }
    return res;
  }
  handlePlayerTargeting(target: Player) {
    const response = this.cardHandler.setTarget(target).play();
    this.stateManager.popState();
    return response;
  }
  onEntry() {
    this.currentTimer = setTimeout(() => {
      this.handlePlayerTargeting(this.randomlyTarget());
    }, this.timeLimit);
    this.eventTracker.emit("game:state-changed");
  }
  onExit() {
    clearTimeout(this.currentTimer);
  }
  private randomlyTarget() {
    return this.playerManager.getRandomPlayer([this.currentPlayer]);
  }
  onRemovePlayer(playerId: string) {
    // check game over
    if (playerId === this.currentPlayer.id) {
      this.gameEntity.nextPlayer = true;
      this.stateManager.popState();
    } else if (this.playerManager.isLastManStanding()) {
      this.stateManager.popState();
    }
  }
  encode() {
    return new TargetingStateModel(
      this.gameEntity.encode(),
      this.currentPlayer.encode()
    );
  }
}

export default class Game {
  private gameSetting: GameSetting;
  private playerManager: PlayerManager;
  private stateManager: StateManager;
  public eventTracker: EventTracker;
  constructor(gameSetting: GameSetting) {
    this.playerManager = new PlayerManager(gameSetting.maxPlayers);
    this.gameSetting = gameSetting;
    this.stateManager = new StateManager();
    this.eventTracker = new EventTracker();
    this.stateManager.pushState(
      new IdleState(
        this.stateManager,
        this.playerManager,
        this.gameSetting,
        this.eventTracker
      )
    );
  }

  handlePlayerEvent(player: Player, event: GameEvent, ...data: any[]) {
    return this.stateManager.topState.handlePlayerEvent(player, event, ...data);
  }
  addPlayer(playerId: string, playerName: string) {
    return this.playerManager.addPlayer(playerId, playerName);
  }
  // TODO: handle abruption disconnect
  //  e.g. disconnect while in turn or when performing special action
  //  e.g. being favored ...
  removePlayer(playerId: string): void {
    this.playerManager.removePlayer(playerId);
    this.stateManager.topState.onRemovePlayer(playerId);
  }
  getPlayer(playerId: string) {
    return this.playerManager.getPlayer(playerId);
  }
  encode(): GameModel {
    return new GameModel(
      this.stateManager.topState.encode(),
      this.playerManager.encode()
    );
  }
  static isGameEvent(event: string): event is GameEvent {
    return Object.values(GameEvent).includes(event as GameEvent);
  }
}
