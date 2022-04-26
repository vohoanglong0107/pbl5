import debugModule from "debug";
import { ExtendedError } from "socket.io/dist/namespace";
import { Event } from "socket.io";
import { SocketType } from "@/events";
import GameManager from "@/game/GameManager";

const debug = debugModule("backend:socket:event");

const registerGameHandler = (socket: SocketType) => {
  return (event: Event, next: (err?: ExtendedError | undefined) => void) => {
    let [eventType, ...data] = event;
    debug(`user ${socket.data.sessionID!} send an event ${eventType} `);
    if (eventType.startsWith("game:")) {
      eventType = eventType.replace(/^(game:)/, "");
      socket.data.game!.handleUserEvent(
        socket.data.sessionID!,
        eventType,
        ...data
      );
    }

    next();
  };
};

export default registerGameHandler;
