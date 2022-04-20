import { Application } from "express";
import DeckRouter from "./deck";
import CardRouter from "./card";
import RuleRouter from "./rule";
import GameRouter from "./game";

export default function registerRoutes(app: Application) {
  // deck router
  app.use("/api/deck", DeckRouter);
  // card router
  app.use("/api/card", CardRouter);
  // rule router
  app.use("/api/rule", RuleRouter);
  // game router
  app.use("/api/game", GameRouter);
}
