import cors from "cors";
import cookie from "cookie";
import debug from "debug";
import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import { Server } from "socket.io";

import { stream } from "./util/logger";
import { registerRoutes } from "./route";
import {
  ClientToServerEvents,
  InterServerEvents,
  ServerToClientEvents,
  SocketData,
} from "@/events";
import { COOKIE_NAME, FRONTEND_DOMAIN } from "@/constants";
import GameManager from "@/game/GameManager";

morgan.token("date", (req, res, tz) => {
  return new Date().toLocaleString("en-US", {
    timeZone: "Asia/Ho_Chi_Minh",
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });
});

morgan.format(
  "myformat",
  '[:date[web]] :remote-addr - :remote-user  ":method :url HTTP/:http-version" :status ":referrer" ":user-agent" - :response-time ms'
);
const app = express();

app.use(cors({ origin: `http://${FRONTEND_DOMAIN}:3000` }));
app.use(morgan("myformat", { stream }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

registerRoutes(app);

const io = new Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>({
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
  pingTimeout: 2000,
  pingInterval: 3000,
});

const gameManager = new GameManager(io);

app.locals.io = io;
app.locals.gameManager = gameManager;

export default app;
