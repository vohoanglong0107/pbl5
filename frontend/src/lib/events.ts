import { Game } from "@/components/game";
import User from "@/components/user/User";

import { XOR } from "@/util/type";

export interface ServerToClientEvents {
  "game:started": (game: Game) => void;
  "game:connected": (game: Game) => void;
  "game:disconnected": (game: Game) => void;
  "game:took-slot": (game: Game) => void;
  "game:drew-card": (game: Game) => void;
  "game:played-card": (game: Game) => void;
  [key: string]: (...args: any) => void;
}

export interface ClientToServerEvents {
  "game:start": () => void;
  "game:connect": (getUser: (user: User) => void) => void;
  "game:take-slot": () => void;
  "game:draw-card": () => void;
  "game:play-card": (cardIds: string[]) => void;
  [key: string]: (...args: any) => void;
}

export type AckResponse = XOR<{ error: string }, { data: unknown }>;

export interface Acknowledgement {
  (response: AckResponse): void;
}
