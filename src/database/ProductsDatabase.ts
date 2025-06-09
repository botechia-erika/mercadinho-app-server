import { IProductDB } from '../interfaces/interfaces';
import {BaseDatabase} from './BaseDatabase'

export class ProductsDatabase extends BaseDatabase{
 public static TABLE_PRODUCTS = "products"
 async findProducts(q:string|undefined):Promise<IProductDB[]>{


  if(!q){
    const result: IProductDB[] = await BaseDatabase.connection(ProductsDatabase.TABLE_PRODUCTS)
    const productsDB = result;

  return productsDB
} else{
  const result = await BaseDatabase.connection(ProductsDatabase.TABLE_PRODUCTS).
  where( "item","LIKE", `%${q}%`)
    const productsDB = result;

  return productsDB
}
 }



async findProductById(id:string):Promise<IProductDB[]>{

  const result = await BaseDatabase.connection(ProductsDatabase.TABLE_PRODUCTS).
  where( "id","LIKE", `%${id}%`)


    const ProductsDB = result
  return ProductsDB
}


async findProductId(id:string):Promise<string>{

  const result = await BaseDatabase.connection.
  raw(`SELECT id FROM ${ProductsDatabase.TABLE_PRODUCTS} WHERE id LIKE ${id}`)
 

    const ProductId = result
  return ProductId
}

async findProductEmail(email:string):Promise<string>{

  const result = await BaseDatabase.connection.
  raw(`SELECT email FROM ${ProductsDatabase.TABLE_PRODUCTS} WHERE email LIKE ${email}`)
 

    const ProductEmail = result
  return ProductEmail
}

async findProductNickname(nickname:string):Promise<string>{

  const result = await BaseDatabase.connection.
  raw(`SELECT nickname FROM ${ProductsDatabase.TABLE_PRODUCTS} WHERE nickname LIKE ${nickname}`)
 

    const ProductNickname = result
  return ProductNickname
}
async insertProduct (Product4Insert: IProductDB):Promise<void>{
await BaseDatabase.connection(ProductsDatabase.TABLE_PRODUCTS).insert(Product4Insert)
  
}

async updateProduct (Product4Update: IProductDB, id:string):Promise<void>{
  await BaseDatabase.connection(ProductsDatabase.TABLE_PRODUCTS).
  update(Product4Update).
  where({ id: `${id}` });
  }

 async destroyProduct(idToDelete:string):Promise<void>{
  await BaseDatabase.connection(ProductsDatabase.TABLE_PRODUCTS).
  delete().where({ id: idToDelete });
 } 
}