import debug from "debug";
import http from "http";
import app from "./app";
import createIO from "./socket";
import logger from "./utils/logger";

import registerHandler from "./handlers";
import { PORT } from "./constants";
import { getGame } from "./middlewares";

const debugLog = debug("backend:server");

app.set("port", PORT);

/**
 * Create HTTP server.
 */

const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(PORT);
server.on("error", onError);
server.on("listening", onListening);

/**
 * Create socket.io server.
 */

const io = createIO(server);
registerHandler(io);
io.use(getGame);

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error: NodeJS.ErrnoException) {
  if (error.syscall !== "listen") {
    throw error;
  }

  const bind = typeof PORT === "string" ? `Pipe ${PORT}` : `Port ${PORT}`;

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
