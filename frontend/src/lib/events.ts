import { Game } from "@/components/game";
import User from "@/components/user/User";

export interface ServerToClientEvents {
  "game:started": (game: Game) => void;
  "user:connected": (game: Game) => void;
  "user:disconnected": (game: Game) => void;
  "user:took-slot": (game: Game) => void;
  "user:drew-card": (game: Game) => void;
}

export interface ClientToServerEvents {
  "game:start": () => void;
  "user:connect": (getUser: (user: User) => void) => void;
  "user:take-slot": () => void;
  "user:draw-card": () => void;
}
