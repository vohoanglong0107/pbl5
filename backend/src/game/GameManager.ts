import debugModule from "debug";
import { ServerType, SocketType } from "@/events";
import cookie from "cookie";
import Game from "./Game";
import User from "./User";
const debug = debugModule("backend:socket:event");
import { COOKIE_NAME } from "@/constants";

export class GameManager {
  private io: ServerType;

  games: Map<string, Game> = new Map();
  constructor(io: ServerType) {
    this.io = io;
    this.setUp();
  }
  createGame() {
    const game = new Game();
    this.games.set(game.id, game);
    return game.id;
  }
  getGame(id: string): Game | undefined {
    return this.games.get(id);
  }
  setUp() {
    this.io.use((socket, next) => {
      const sessionID = cookie.parse(socket.client.request.headers.cookie!)[
        COOKIE_NAME
      ];
      socket.data.sessionID = sessionID;
      const gameId = socket.handshake.auth.gameId as string;
      const game = this.getGame(gameId);
      if (game) {
        socket.data.game = game;
        socket.use((event, next) => {
          let [eventType, ...data] = event;
          debug(`user ${sessionID} send an event ${eventType} `);
          if (eventType.startsWith("game:")) {
            const userEvent = eventType.replace(/^(game:)/, "");
            const user = game.getUser(sessionID);
            if (!user) {
              next(new Error("User not in this game"));
              debug(
                `user ${sessionID} try to send an event ${eventType} to game ${game.id} \
                but not connected to mentioned game`
              );
              return;
            } else {
              game.handleUserEvent(user, userEvent, ...data);
            }
          }
          next();
        });
        next();
      } else {
        next(new Error("Game not found"));
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
}

export default GameManager;
