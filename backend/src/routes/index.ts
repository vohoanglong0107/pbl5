import { Router } from "express";

const router = Router();

/* GET home page. */
router.get("/", (_req, res, _next) => {
  res.send("index");
});

export default router;
