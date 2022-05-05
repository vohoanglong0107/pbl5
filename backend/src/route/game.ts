import { Router } from "express";

const router = Router();

router.post("/create", (_req, res, _next) => {
  const gameId = res.app.locals.gameManager.createGame();
  res.send({ gameId });
});

router.get("/:gameId", (req, res, _next) => {
  const gameId = req.params.gameId;
  const game = res.app.locals.gameManager.getGame(gameId);
  if (game) res.send(game.encode());
  else res.status(404).send(`Game ${gameId} not found`);
});

export default router;
