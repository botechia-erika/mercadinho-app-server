import express, { Router } from "express";
import ProductsController from "./../controllers/productsController";

class ProductsRouter {
  private router: Router;
  private productsController: ProductsController;

  constructor() {
    this.router = express.Router();
    this.productsController = new ProductsController();
    this.setupRoutes();
  }

  private setupRoutes() {
    this.router.get("/", this.productsController.getAllProducts);
    this.router.get("/:id", this.productsController.getProductById);
    this.router.post("/", this.productsController.createProduct);
    this.router.put("/:id", this.productsController.updateProduct);
    this.router.delete("/:id", this.productsController.destroyProduct);
  }

  getRouter() {
    return this.router;
  }
}

export default ProductsRouter;
