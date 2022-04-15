export interface ServerToClientEvents {}

export interface ClientToServerEvents {
  "game:join": (gameId: string) => void;
  "game:start": (gameId: string) => void;
  "game:playCard": (gameId: string, cardId: string) => void;
}

export interface InterServerEvents {
  ping(): void;
}

export interface SocketData {
  sessionID: string;
}
