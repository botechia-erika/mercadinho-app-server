import express, { Router } from "express";
import UsersController from "./../controllers/usersController";

class UserRouter {
  private router: Router;
  private usersController: UsersController;

  constructor() {
    this.router = express.Router();
    this.usersController = new UsersController();
    this.setupRoutes();
  }

  private setupRoutes() {
    this.router.get("/", this.usersController.getAllUsers.bind(this.usersController));
    this.router.get("/:id", this.usersController.getUserById.bind(this.usersController));
    this.router.post("/", this.usersController.createUser.bind(this.usersController));
    this.router.put("/:id", this.usersController.editUserById.bind(this.usersController));
    this.router.delete("/:id", this.usersController.destroyUser.bind(this.usersController));
  }

  getRouter() {
    return this.router;
  }
}

export default UserRouter;
