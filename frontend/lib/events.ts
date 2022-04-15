export interface ServerToClientEvents {}

export interface ClientToServerEvents {
  "game:join": (gameId: string) => void;
  "game:start": (gameId: string) => void;
  "game:playCard": (gameId: string, cardId: string) => void;
}
