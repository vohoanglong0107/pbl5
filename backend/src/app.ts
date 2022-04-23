import cors from "cors";
import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import morgan from "morgan";

import { stream } from "./utils/logger";
import { registerRoutes } from "./route";

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

registerRoutes(app);

export default app;
