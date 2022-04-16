import { Socket } from "socket.io";
import Game from "@/game/Game";
import User from "@/game/User";

export interface ServerToClientEvents {
  "game:user:connected": (user: User) => void;
  "game:user:disconnected": (user: User) => void;
}

export type UserConnectEvent = (
  populateConnectedUsersIds: (connectedUsersIds: string[]) => void
) => void;

export interface ClientToServerEvents {
  "game:start": () => void;
  "game:user:connect": UserConnectEvent;
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
