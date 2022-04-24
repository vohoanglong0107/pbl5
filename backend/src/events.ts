import { Socket } from "socket.io";
import Game from "@/game/Game";
import GameModel from "@/game/GameModel";

export interface ServerToClientEvents {
  "game:started": (game: GameModel) => void;
  "user:connected": (game: GameModel) => void;
  "user:disconnected": (game: GameModel) => void;
  "user:took-slot": (game: GameModel) => void;
}

export interface ClientToServerEvents {
  "game:start": () => void;
  "user:connect": () => void;
  "user:take-slot": () => void;
}

export interface InterServerEvents {
  ping(): void;
}

export interface SocketData {
  sessionID: string;
  game: Game;
}

export type SocketType = Socket<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>;
