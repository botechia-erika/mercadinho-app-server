import { Request, Response } from "express";
import { v4 as uuidv4 } from 'uuid';
import { Purchase } from "../models/Purchase";
import { Sale } from "../models/Sale";
import { today } from "../helpers/helpers";
import { PurchaseDatabase } from '../database/PurchaseDatabase';
import { User } from '../models/User';
import { AccountsDatabase } from '../database/AccountsDatabase';
import { UserWithAccount } from '../models/UserWithAccount';
import { IUserDB, IAccountDB, IPurchaseDB, ISale4PurchaseDB, USER_ROLES, IPurchaseTicket } from './../interfaces/interfaces';
import {text} from '../types/types'
import { UserDatabase } from './../database/UserDatabase';
import { SalesDatabase } from './../database/SalesDatabase';

export class PurchasesController {
 
    public createPurchase = async (req: Request, res: Response): Promise<void> => {
        try {
            const { total, productsList, buyerId } = req.body;
            const cartTotal = Number(total);
            const purchaseId = uuidv4();
            
            const purchaseInstance: Purchase = new Purchase(
                purchaseId,
                buyerId ,
                cartTotal,
                today
            );
console.log("Cart Total:", cartTotal);
console.log("Purchase ID:", purchaseId);
console.log('products:', productsList)
            const purchase4Insert: IPurchaseDB = {
                id: purchaseInstance.getId(),
                buyer_id: buyerId,
                finalPrice: purchaseInstance.getTFinalPrice(),
                created_at: purchaseInstance.getCreatedAt() 
            }

            const purchaseDatabase = new PurchaseDatabase();
            await purchaseDatabase.insertPurchase(purchase4Insert);

            const salesDatabase = new SalesDatabase();
            if (!Array.isArray(productsList)) {
    // Trate o caso em que productsList não é um array
    console.error("Error: productsList is not an array");
    res.status(400).send("Bad Request: productsList should be an array");
    return;
}
            for (const item of productsList) {
                const saleId: string = uuidv4();
                const newSale = new Sale(
                    saleId,
                    purchaseInstance.getId(),
                    item.id,
                    item.price,
                    item.quantity,
                    item.totalPrice
                );

                const newSaleDB: ISale4PurchaseDB = {
                    id: newSale.getId(),
                    idPurchase: newSale.getPurchaseId(),
                    item: newSale.getItemId(),
                    price: Number(newSale.getItemPrice()),
                    quantity: Number(newSale.getItemQuantity()),
                    totalPrice: Number(newSale.getItemTotalPrice())
                };

                await salesDatabase.insertSale(newSaleDB);
            }

            const userDatabase = new UserDatabase();
            const client4Update = await userDatabase.findUserById(buyerId)

            const instanceClient: User = new User(
                client4Update[0].id,
                client4Update[0].idProfile,
                client4Update[0].fullName,
                client4Update[0].nickname,
                client4Update[0].password,
                client4Update[0].email,
                client4Update[0].avatar,
                USER_ROLES.Cliente,
                client4Update[0].createdAt
            )

            const user4UpdateDB: IUserDB = {
                id: instanceClient.getId(),
                idProfile: instanceClient.getIdProfile(),
                fullName: instanceClient.getFullName(),
                nickname: instanceClient.getNickname(),
                password: instanceClient.getPassword(),
                email: instanceClient.getEmail(),
                avatar: instanceClient.getAvatar(),
                role: instanceClient.getRole(),
                createdAt: instanceClient.getCreatedAt()
            }

            await userDatabase.updateUser(user4UpdateDB, instanceClient.getId())

            const id4ADB: string = user4UpdateDB.idProfile
            const accountsDatabase = new AccountsDatabase()
            const accountFromDB = await accountsDatabase.findAccountById(id4ADB)

            const currentScore: number = Number(cartTotal * 0.3)
            const score4Update: number = Number(accountFromDB[0].score) + Number(currentScore)
            const currentBalance: number = Number(accountFromDB[0].balance)
            
const category4Update = (score: number): string => {
    if (score < 100) {
        return 'blue';
    } else if (score >= 100 && score <= 1000) {
        return 'gold';
    } else {
        return 'black';
    }
};const instance4Account = new UserWithAccount(
    instanceClient.getId(),
    instanceClient.getIdProfile(),
    instanceClient.getFullName(),
    instanceClient.getNickname(),
    instanceClient.getPassword(),
    instanceClient.getEmail(),
    instanceClient.getAvatar(),
    instanceClient.getRole(),
    instanceClient.getCreatedAt(),
    score4Update,
    currentBalance,
    today,
    category4Update(score4Update)
);


            const account4Update: IAccountDB = {
                id: instance4Account.getIdProfile(),
                user_id: buyerId,
                balance: instance4Account.getBalance(),
                score: instance4Account.getScore(),
                category: instance4Account.getCategory()
            }

            const buyerIdAccount: string = instance4Account.getIdProfile()
            await accountsDatabase.updateAccount(account4Update, buyerIdAccount)

            if(buyerId === "000.000.000-00"){
                res.status(201).json("201: Compra ANONIMA cadastrada com sucesso")
            } else {
                const userDBResult = await userDatabase.findUserById(buyerId)
                const accountDBResult = await accountsDatabase.findAccountById(account4Update.id)
                const purchaseDBResult = await purchaseDatabase.findPurchaseById(purchase4Insert.id)
                const productsPurchased = await salesDatabase.findSalesByPurchase(purchase4Insert.id)

                const result : IPurchaseTicket = {
                    id: purchaseDBResult[0].id,
                    buyerId: userDBResult[0].nickname,
                    accountId: accountDBResult[0].id,
                    updatedScore: accountDBResult[0].score,
                    updatedCategory: accountDBResult[0].category,
                    purchasePrice: cartTotal,
                    purchaseList: productsPurchased
                }

                res.status(201).json({ message: 'Compra Cadastrada com sucesso' , result });
            } 
        } catch (error) {
            console.log(error);
            res.status(500).send("Erro inesperado");
        }
    };

    public getAllPurchases = (async (req: Request, res: Response): Promise<void> => {
        try {

          const q = req.query.q as string || undefined
         const purchaseDatabase = new PurchaseDatabase()
         const purchaseDB = await purchaseDatabase.findPurchases(q)

        if(!purchaseDB){
            res.status(404)
            throw new Error("404: Nenhum pagamento cadastrado")
        }

         const result: Purchase[] = purchaseDB.map((purchase:IPurchaseDB)=>{
            return new Purchase(
                purchase.id,
                purchase.buyer_id,
                Number(purchase.finalPrice),
                purchase.created_at
            )
         })
        

        res.send({message: "Lista de pagamentos Cadastrados", result}) 
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
        });
        

        public getPurchaseById = (async (req: Request, res: Response): Promise<void> => {
            try {
            
            const id = req.body.id
        
             const purchaseDatabase = new PurchaseDatabase()
    
            if( id === "000.000.000-00"){

             const purchasesDB = await purchaseDatabase.findPurchaseByBuyerId(id)

                const result: Purchase[] = purchasesDB.map((purchase:IPurchaseDB)=>{
                    return new Purchase(
                        purchase.id,
                        purchase.buyer_id,
                        Number(purchase.finalPrice),
                        purchase.created_at
                    )
                 })

                res.status(200).json({message: "Lista de pagamentos sem Usuario Cadastrado", result})
            }else{
    
             const purchasesDB = await purchaseDatabase.findPurchaseByBuyerId(id)

             if(!purchasesDB[0]){
                res.status(404)
                throw new Error("'404': Nenhum pagamento cadastrado ou usuario nao cadastrado")
             }

             const result: Purchase[] = purchasesDB.map((purchase:IPurchaseDB)=>{
                return new Purchase(
                    purchase.id,
                    purchase.buyer_id,
                    Number(purchase.finalPrice),
                    purchase.created_at
                )
             })
            
    
            res.send({message: `Lista de pagamentos Cadastrados com id ${id}`, result}) 
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
            });



    public updatePurchase = async (req: Request, res: Response): Promise<void> => {
        try {
            const id = req.params.id as string;
            res.status(200).json(`update purchase ${id}`);
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

    public destroyPurchase = async (req: Request, res: Response): Promise<void> => {
        try {
            const id = req.params.id as string;
            res.status(200).json(`produto com id ${id} deletado com sucesso`);
        } catch (error) {
            res.status(500).json({ error });
        }
    };
}

export default PurchasesController;
