import { Game } from "@/components/game";

export interface ServerToClientEvents {
  "game:started": (game: Game) => void;
  "user:connected": (game: Game) => void;
  "user:disconnected": (game: Game) => void;
  "user:took-slot": (game: Game) => void;
}

export interface ClientToServerEvents {
  "game:start": () => void;
  "user:connect": () => void;
  "user:take-slot": () => void;
}
