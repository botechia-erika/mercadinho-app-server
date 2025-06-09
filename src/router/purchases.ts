import express, { Router } from "express";
import PurchasesController from "./../controllers/purchasesController";

class PurchasesRouter {
  private router: Router;
  private purchasesController: PurchasesController;

  constructor() {
    this.router = express.Router();
    this.purchasesController = new PurchasesController();
    this.setupRoutes();
  }

  private setupRoutes() {
    this.router.get("/", this.purchasesController.getAllPurchases);
    this.router.get("/:id", this.purchasesController.getPurchaseById);
    this.router.post("/", this.purchasesController.createPurchase);
    this.router.put("/:id", this.purchasesController.updatePurchase);
    this.router.delete("/:id", this.purchasesController.destroyPurchase);
  }

  getRouter() {
    return this.router;
  }
}

export default PurchasesRouter;
