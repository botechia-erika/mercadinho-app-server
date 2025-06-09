import {  IPurchaseDB, ISale4PurchaseDB } from '../interfaces/interfaces';
import {BaseDatabase} from './BaseDatabase'

export class SalesDatabase extends BaseDatabase{
 public static TABLE_SALES = "sales"
 
async insertSale (sale4Insert: ISale4PurchaseDB):Promise<void>{
await BaseDatabase.connection(SalesDatabase.TABLE_SALES).insert(sale4Insert)
  
}


async findSalesByPurchase(idPurchase4Find:string):Promise<IPurchaseDB[]>{

    const result = await BaseDatabase.connection.raw(`SELECT * FROM ${SalesDatabase.TABLE_SALES} WHERE idPurchase LIKE "%${idPurchase4Find}%"`)
   
  
      const purchaseList = result
    return purchaseList
  }
}