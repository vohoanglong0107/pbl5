import { User } from "@/components/user";

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
