import cors from "cors";
import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import morgan from "morgan";

import { stream } from "./utils/logger";
import indexRouter from "./routes/index";
import usersRouter from "./routes/users";
import gamesRouter from "./routes/games";

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

app.use(cors({ origin: "*" }));
app.use(morgan("myformat", { stream }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/games", gamesRouter);

export default app;
