import { Router } from "express";
import DeckCtrl from "../controller/deck";
import { DeckVal, deckSchema } from "../validation/deck";

class DeckRouter {
  router = Router();
  deckCtrl = new DeckCtrl();
  deckVal = new DeckVal();

  constructor() {
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router
      .route("/")
      .post(this.deckVal.validateBody(deckSchema), this.deckCtrl.create);
    this.router.route("/").get(this.deckCtrl.getAll);
    this.router.route("/:id").get(this.deckCtrl.getById);
    this.router.route("/:id").put(this.deckCtrl.updateById);
    this.router.route("/:id").delete(this.deckCtrl.deleteById);
  }
}

export default new DeckRouter().router;
