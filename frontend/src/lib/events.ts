import { User } from "@/components/user";
import { Game } from "@/components/game";

export interface ServerToClientEvents {
  "game:user:connected": (user: User) => void;
  "game:user:disconnected": (user: User) => void;
}

export type UserConnectEvent = (getGame: (game: Game) => void) => void;

export interface ClientToServerEvents {
  "game:start": () => void;
  "game:user:connect": UserConnectEvent;
}
