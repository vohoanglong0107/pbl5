/**
 * Module dependencies.
 */

import debugModule from "debug";
import http from "http";
import app from "./app";
import registerCookie from "./cookie";
import logger from "./util/logger";

const debug = debugModule("backend:server");

/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(process.env.PORT || "8000");
app.set("port", port);

/**
 * Create HTTP server.
 */

const server = http.createServer(app);
app.locals.io.attach(server);
app.locals.io.engine.on("initial_headers", registerCookie);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on("error", onError);
server.on("listening", onListening);

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
    case "EADDRINUSE":
      logger.error(`${bind} is already in use`);
      process.exit(1);
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
  debug(`Listening on ${bind}`);
}
