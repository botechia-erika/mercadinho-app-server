import express, { Request, Response, Router } from 'express';
import PremiosController from '../controllers/premiosController';

class RecipesRouter {
    private router: Router;
    private controller: PremiosController;

    constructor() {
        this.router = express.Router();
        this.controller = new PremiosController();
        this.setupRoutes();
    }

    private setupRoutes(): void {
        this.router.get('/', this.controller.getAllRecipes);
        this.router.get('/:id', this.controller.getRecipeById);
        this.router.post('/', this.controller.createRecipe);
        this.router.put('/:id', this.controller.editRecipe);
    }

    public getRouter(): Router {
        return this.router;
    }
}

export default RecipesRouter;
