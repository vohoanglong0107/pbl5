import debugModule from "debug";
import { ServerType, SocketType } from "@/events";
import cookie from "cookie";
import Room from "./Room";
import User from "./User";
const debug = debugModule("backend:socket:event");
import { COOKIE_NAME } from "@/constants";
import { Event } from "socket.io";
import Game from "./Game";

export class GameManager {
  private io: ServerType;

  games: Map<string, Room> = new Map();
  constructor(io: ServerType) {
    this.io = io;
    this.setUp();
  }
  createGame() {
    const game = new Room();
    this.games.set(game.id, game);
    return game.id;
  }
  getGame(id: string): Room | undefined {
    return this.games.get(id);
  }
  setUp() {
    this.io.use((socket, next) => {
      const sessionID = cookie.parse(socket.client.request.headers.cookie!)[
        COOKIE_NAME
      ];
      socket.data.sessionID = sessionID;
      const gameId = socket.handshake.auth.gameId as string;
      try {
        this.registerGameHandler(socket, gameId);
        next();
      } catch (error) {
        if (error instanceof Error) next(error);
        else if (typeof error === "string") next(new Error(error));
        else throw error;
      }
    });
    this.io.on("connection", (socket) => {
      debug(`${socket.data.sessionID} tried to join`);
      this.onConnection(socket);
      this.onDisconnect(socket);
    });
  }
  onConnection(socket: SocketType) {
    const sessionID = socket.data.sessionID!;
    const game = socket.data.game!;
    socket.join(game.id);
    let user = game.getUser(sessionID);
    if (user) {
      user.addConnection(socket);
    } else {
      user = new User(sessionID, socket);
      game.onConnect(user);
    }
    debug(`User ${sessionID} connect to game ${game.id}`);
  }
  onDisconnect(socket: SocketType) {
    const sessionID = socket.data.sessionID!;
    const game = socket.data.game!;
    let user = game.getUser(sessionID)!;
    socket.on("disconnect", () => {
      user.removeConnection(socket);
      if (user.isDisconnected()) {
        game.onDisconnect(user);
      }
      debug(`User ${sessionID} disconnect from game ${game.id}`);
    });
  }
  registerGameHandler(socket: SocketType, gameId: string) {
    const sessionID = socket.data.sessionID!;
    const game = this.getGame(gameId);
    if (!game) throw new Error(`Game ${gameId} not found`);
    socket.data.game = game;
    socket.use((event, next) => {
      try {
        this.redirectEventToGameHandler(game, event, sessionID);
        next();
      } catch (error) {
        if (error instanceof Error) next(error);
        else if (typeof error === "string") next(new Error(error));
        else throw error;
      }
    });
  }
  redirectEventToGameHandler(game: Room, event: Event, userId: string) {
    let [eventType, ...data] = event;
    debug(`user ${userId} send an event ${eventType} `);
    if (
      Room.isRoomEvent(eventType) ||
      Game.isGameEvent(eventType) ||
      User.isUserEvent(eventType)
    ) {
      const user = game.getUser(userId);
      if (user) {
        game.handleUserEvent(user, eventType, ...data);
      } else {
        debug(
          `user ${userId} try to send an event ${eventType} to game ${game.id} \
              but not connected to mentioned game`
        );
        throw new Error("User not in this game");
      }
    }
  }
}

export default GameManager;
