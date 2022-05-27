import { Application } from "express";
import DeckRouter from "./deck";
import CardRouter from "./card";
import RuleRouter from "./rule";
import GameRouter from "./game";
import * as swaggerDocument from '../../swagger.json'
import swaggerUi from "swagger-ui-express";

export default function registerRoutes(app: Application) {
  app.use('/swagger', swaggerUi.serve);
  app.get('/swagger', swaggerUi.setup(swaggerDocument));

  // deck router
  app.use("/api/deck", DeckRouter);
  // card router
  app.use("/api/card", CardRouter);
  // rule router
  app.use("/api/rule", RuleRouter);
  // game router
  app.use("/api/game", GameRouter);
}
