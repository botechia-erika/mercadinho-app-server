import express, { Router } from "express";
import SignInController from "./../controllers/signInController";
import { authMiddleware } from "../middlewares/authMiddleware";

class AuthRouter {
  private router: Router;
  private signInController: SignInController

  constructor() {
    this.router = express.Router();
    this.signInController = new SignInController();
    this.setupRoutes();
  }

  private setupRoutes() {
    this.router.post("/", this.signInController.postAuth);
    this.router.get("/profile", authMiddleware, this.signInController.getProfile);

  }

  getRouter() {
    return this.router;
  }
}

export default AuthRouter;
