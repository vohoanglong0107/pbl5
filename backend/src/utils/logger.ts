import winston from "winston";
import { StreamOptions } from "morgan";
import appRoot from "app-root-path";

interface LoggerOptions {
  file: winston.transports.FileTransportOptions;
  console: winston.transports.ConsoleTransportOptions;
}

const options: LoggerOptions = {
  file: {
    level: "info",
    filename: `${appRoot}/logs/app.log`,
    handleExceptions: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    format: winston.format.json(),
  },
  console: {
    level: "debug",
    handleExceptions: true,
    format: winston.format.cli(),
  },
};

const logger = winston.createLogger({
  transports: [
    new winston.transports.File(options.file),
    new winston.transports.Console(options.console),
  ],
  exitOnError: false, // do not exit on handled exceptions
});

export const stream: StreamOptions = {
  write(message) {
    logger.info(message);
  },
};

export default logger;
