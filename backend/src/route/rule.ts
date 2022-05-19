import { Router } from "express";
import RuleCtrl from "../controller/rule";
import { RuleVal, ruleSchema } from "../validation/rule";

class RuleRouter {
  router = Router();
  ruleCtrl = new RuleCtrl();
  ruleVal = new RuleVal();

  constructor() {
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router
      .route("/")
      .post(this.ruleVal.validateBody(ruleSchema), this.ruleCtrl.create);
    this.router.route("/").get(this.ruleCtrl.getAll);
    this.router.route("/:id").get(this.ruleCtrl.getById);
    this.router.route("/:id").put(this.ruleCtrl.updateById);
    this.router.route("/:id").delete(this.ruleCtrl.deleteById);
  }
}

export default new RuleRouter().router;
