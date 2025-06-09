import { IAccountDB, IProductDB } from '../interfaces/interfaces';
import {BaseDatabase} from './BaseDatabase'

export class AccountsDatabase extends BaseDatabase{
 public static TABLE_ACCOUNTS ="accounts"
 async findAccounts(q:string|undefined):Promise<IAccountDB[]>{


  if(!q){
    const result: IAccountDB[] = await BaseDatabase.connection(AccountsDatabase.TABLE_ACCOUNTS)
    const accountsDB = result;

  return accountsDB
} else{
  const result = await BaseDatabase.connection(AccountsDatabase.TABLE_ACCOUNTS).
  where( "id","LIKE", `%${q}%`)
  const accountsDB = result;
  return accountsDB
}
 }



async findAccountById(id:string):Promise<IAccountDB[]>{

  const result = await BaseDatabase.connection(AccountsDatabase.TABLE_ACCOUNTS).where( "id","LIKE", `%${id}%`)


    const ProductsDB = result
  return ProductsDB
}


async findAccountId(id:string):Promise<string>{

  const result = await BaseDatabase.connection.
  raw(`SELECT id FROM ${AccountsDatabase.TABLE_ACCOUNTS} WHERE id LIKE "%${id}%"`)
 

    const accountId = result
  return accountId
}

async findProductEmail(email:string):Promise<string>{

  const result = await BaseDatabase.connection.
  raw(`SELECT email FROM ${AccountsDatabase.TABLE_ACCOUNTS} WHERE email LIKE ${email}`)
 

    const ProductEmail = result
  return ProductEmail
}

async findProductNickname(nickname:string):Promise<string>{

  const result = await BaseDatabase.connection.
  raw(`SELECT nickname FROM ${AccountsDatabase.TABLE_ACCOUNTS} WHERE nickname LIKE ${nickname}`)
 

    const ProductNickname = result
  return ProductNickname
}
async insertAccount (Account4Insert: IAccountDB):Promise<void>{
await BaseDatabase.connection(AccountsDatabase.TABLE_ACCOUNTS).insert(Account4Insert)
  
}

async updateAccount (Account4Update: IAccountDB, id:string):Promise<void>{
  await BaseDatabase.connection(AccountsDatabase.TABLE_ACCOUNTS).
  update(Account4Update).
  where({ id: `${id}` });
  }

 async destroyProduct(idToDelete:string):Promise<void>{
  await BaseDatabase.connection(AccountsDatabase.TABLE_ACCOUNTS).
  delete().where({ id: idToDelete });
 } 
 
}