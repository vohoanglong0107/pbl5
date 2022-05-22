import { Router } from "express";
import CardCtrl from "../controller/card";
import { CardVal, cardSchema } from "../validation/card";

class CardRouter {
  router = Router();
  cardCtrl = new CardCtrl();
  cardVal = new CardVal();

  constructor() {
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router
      .route("/")
      .post(this.cardVal.validateBody(cardSchema), this.cardCtrl.create);
    this.router.route("/").get(this.cardCtrl.getAll);
    this.router.route("/:id").get(this.cardCtrl.getById);
    this.router.route("/:id").put(this.cardCtrl.updateById);
    this.router.route("/:id").delete(this.cardCtrl.deleteById);
  }
}

export default new CardRouter().router;
