import { Router } from "express";
import gameManager from "../game/GameManager";

const router = Router();

router.post("/create", (_req, res, _next) => {
  const gameId = res.app.locals.gameManager.createGame();
  res.send({ gameId });
});

export default router;
