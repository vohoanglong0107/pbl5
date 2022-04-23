/**
 * Module dependencies.
 */

import debug from "debug";
import http from "http";
import { Server } from "socket.io";
import app from "./app";
import logger from "./utils/logger";
import {
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData,
} from "./events";
import registerHandler from "./handlers";
import { COOKIE_NAME } from "./constants";
import getGame from "./middlewares/getGame";

const debugLog = debug("backend:server");

/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(process.env.PORT || "8000");
app.set("port", port);

/**
 * Create HTTP server.
 */

const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on("error", onError);
server.on("listening", onListening);

/**
 * Create socket.io server.
 */

const FRONTEND_DOMAIN = process.env.FRONTEND_DOMAIN || "localhost";

const io = new Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>(server, {
  cors: {
    origin: `http://${FRONTEND_DOMAIN}:3000`,
    credentials: true,
  },
  cookie: {
    name: COOKIE_NAME,
    path: "/",
    httpOnly: true,
    sameSite: "none",
    secure: true,
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365 * 1),
  },
});

registerHandler(io);
io.use(getGame);
/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val: string) {
  const normalizedPort = parseInt(val, 10);

  if (Number.isNaN(normalizedPort)) {
    // named pipe
    return val;
  }

  if (normalizedPort >= 0) {
    // normalizedPort number
    return normalizedPort;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error: NodeJS.ErrnoException) {
  if (error.syscall !== "listen") {
    throw error;
  }

  const bind = typeof port === "string" ? `Pipe ${port}` : `Port ${port}`;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      logger.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case "EADDRINUSE":
      logger.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  const addr = server.address();
  const bind = typeof addr === "string" ? `pipe ${addr}` : `port ${addr!.port}`;
  debugLog(`Listening on ${bind}`);
}
