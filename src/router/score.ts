import express, { Router } from "express";
import { ScoreController } from "../controllers/scoreController";
class ScoreRouter {
  private router: Router;
  private scoreController: ScoreController;

  constructor() {
    this.router = express.Router();
    this.scoreController = new ScoreController();
    this.setupRoutes();
  }

  private setupRoutes() {
    this.router.get("/", this.scoreController.getAllScore)
  }

  getRouter() {
    return this.router;
  }
}

export default ScoreRouter;
