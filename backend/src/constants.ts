export const COOKIE_NAME = "io";
export const FRONTEND_DOMAIN = process.env.FRONTEND_DOMAIN || "localhost";
export const PORT = normalizePort(process.env.PORT || "8000");

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
