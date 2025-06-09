import { AccountsDatabase } from './../database/AccountsDatabase';
import { Product } from './../models/Product';
import { ProductsDatabase } from "./../database/ProductsDatabase";
import { Request, Response } from "express";
import { IProductDB } from "../interfaces/interfaces";
import { v4 as uuidv4 } from "uuid";
import { resolveSoa } from 'dns';

export class ProductController {
  public getAllProducts = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const q = req.query.q as string | undefined;

      if ((q && q.length < 0) || q === "") {
        res.status(400);
        throw new Error("Pesquisa deve ter ao menos 1 caracter");
      }

      const productsDatabase = new ProductsDatabase();
      const productDB = await productsDatabase.findProducts(q);

      // error 404 para usuarios nao encontrados
      if (!productDB[0]) {
        res.status(404);
        throw new Error("404 produto nao encontrado");
      } else {
        const result:Product[] = productDB.map((product:IProductDB)=>{
          return new Product(
            product.id,
            product.item,
            product.description,
            product.image_url,
            product.price,
            product.category
          )
        });

        res.status(200).send({ result });
      }
    } catch (error) {
      console.log(error);

      if (req.statusCode === 200) {
        res.status(500);
      }

      if (error instanceof Error) {
        res.send(error.message);
      } else {
        res.send("Erro inesperado");
      }
    }
  };
  public getProductById = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const id = req.params.id as string;
      const productsDatabase = new ProductsDatabase();
      const productDB = await productsDatabase.findProductById(id);
      const resultDB = productDB[0]

      if(!resultDB){
        res.status(404)
        throw new Error(`"404" o produto com id : ${id} nao esta cadastrado`)
      }

      const result:Product = 
       new Product(
        resultDB.id,
        resultDB.item,
        resultDB.description,
        resultDB.image_url,
        resultDB.price,
        resultDB.category
        )
      ;


      res.status(200);
      res.json({result});
    } catch (error) {
      console.log(error);

      if (req.statusCode === 200) {
        res.status(500);
      }

      if (error instanceof Error) {
        res.send(error.message);
      } else {
        res.send("Erro inesperado");
      }
    }
  };

  public createProduct = async (req: Request, res: Response): Promise<void> => {
    try {
      const {
        item,
        description,
        price,
        imageUrl,
        category,
      } = req.body;
      const regex = /^(https?:\/\/[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}([-a-zA-Z0-9@:%_\+.~#?&//=]*)?)$/;

      // Exemplo de uso
      if (!regex.test(imageUrl)) {
        res.status(400)
        throw new Error('"400" URL para imagem invalida')
      }

      if(description.length<1|| description.length>60 || description.length === ""){
        res.status(400)
        throw new Error('"400" Descricao para produto invalida')
      }


      if(item.length<1|| item.length>60 || item.length === ""){
        res.status(400)
        throw new Error('"400" Nome do Item para produto invalida')
      }

      const newInstance = new Product(
        uuidv4(),
        item,
        description,
        imageUrl,
        Number(price),
        category
      );

      const instance4InsertDB: IProductDB = {
        id: newInstance.getId(),
        item: newInstance.getItem(),
        description: newInstance.getDescription(),
        image_url: newInstance.getImageUrl(),
        price: newInstance.getPrice(),
        category: newInstance.getCategory(),
      };

      const productsDatabase= new ProductsDatabase()
     await productsDatabase.insertProduct(instance4InsertDB)
     const instanceSuccess = await productsDatabase.findProductById(instance4InsertDB.id)

      const resultDB = instanceSuccess[0];

      if(!resultDB){
        res.status(400)
        throw new Error("'400': Falha ao cadastrar produto ")
      }
      const result:Product = 
      new Product(
       resultDB.id,
       resultDB.item,
       resultDB.description,
       resultDB.image_url,
       resultDB.price,
       resultDB.category
       )
     ;

      res.status(201);
      res.json({ message: `produto insertado e instanciado`, result });
    } catch (error) {
      console.log(error);

      if (req.statusCode === 200) {
        res.status(500);
      }

      if (error instanceof Error) {
        res.send(error.message);
      } else {
        res.send("Erro inesperado");
      }
    }
  };

  public updateProduct = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = req.params.id;
      const { item, description, imageUrl, price, category } = req.body;
      const productsDatabase = new ProductsDatabase();
  
      const productExists = await productsDatabase.findProductById(id);
      const regex = /^(https?:\/\/[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}([-a-zA-Z0-9@:%_\+.~#?&//=]*)?)$/;

      // Exemplo de uso
      if (!regex.test(imageUrl)) {
        res.status(400)
        throw new Error('"400" URL para imagem invalida')
      }

      if (!productExists[0]) {
        res.status(404);
        throw new Error(`"404" Produto com ${id} não foi encontrado`);
      }
  
      const existingProduct = productExists[0];
  
      const updatedProduct = new Product(
        existingProduct.id,
        existingProduct.item,
        existingProduct.description,
        existingProduct.image_url,
        existingProduct.price,
        existingProduct.category
      );
  
      
      if (description) updatedProduct.setDescription(description);
      if (imageUrl) updatedProduct.setImageUrl(imageUrl);
      if (price) updatedProduct.setPrice(Number(price));
      if (category) updatedProduct.setCategory(category);
  
      const updatedProductDB: IProductDB = {
        id: updatedProduct.getId(),
        item: updatedProduct.getItem(),
        description: updatedProduct.getDescription(),
        image_url: updatedProduct.getImageUrl(),
        price: updatedProduct.getPrice(),
        category: updatedProduct.getCategory(),
      };
  
      await productsDatabase.updateProduct(updatedProductDB, id);
  
      res.status(200);
      res.json(`Produto ${id} atualizado com sucesso`);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  };
  
  public destroyProduct = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const id = req.params.id as string;
      const accountId =req.headers.Header as string
      const productsDatabase = new ProductsDatabase()
      const accountsDatabase = new AccountsDatabase()
      await accountsDatabase.destroyProduct(accountId)
      await productsDatabase.destroyProduct(id)
      
    
      res.status(200);
      res.json(`produto com id ${id} deletado com sucesso`);
    } catch (error) {
      res.status(500).json({ error });
    }
  };
}

export default ProductController;
