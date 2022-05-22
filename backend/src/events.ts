import { Server, Socket } from "socket.io";
import Room from "@/game/Room";
import GameModel from "@/model/Room";
import User from "./game/User";

export interface ServerToClientEvents {
  "game:started": (game: GameModel) => void;
  "user:connected": (game: GameModel) => void;
  "user:disconnected": (game: GameModel) => void;
  "user:took-slot": (game: GameModel) => void;
  "user:drew-card": (game: GameModel) => void;
  "user:played-card": (game: GameModel) => void;
  [key: string]: (...args: any) => void;
}

export interface ClientToServerEvents {
  "game:start": () => void;
  "user:connect": (getUser: (user: User) => void) => void;
  "user:take-slot": () => void;
  "user:draw-card": () => void;
  "user:play-card": (cardIds: string[]) => void;
  [key: string]: (...args: any) => void;
}

export interface InterServerEvents {
  ping(): void;
}

export interface SocketData {
  sessionID: string;
  game: Room;
}

export type SocketType = Socket<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>;

export type ServerType = Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>;
