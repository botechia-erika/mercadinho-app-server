import { PurchaseDatabase } from './../database/PurchaseDatabase';
import dotenv from 'dotenv';
import { NextFunction, Request, Response } from 'express';
import { UserDatabase } from '../database/UserDatabase';
import { IUserDB } from '../interfaces/interfaces';
import { today } from '../helpers/helpers';
import uuidv4 from 'uuid';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { AccountsDatabase } from '../database/AccountsDatabase';

dotenv.config();

export class ScoreController {
  async getAllScore(req: Request, res: Response) {
    try {
        
        const q = req.query.q as string | undefined
    
        const accountsDatabase = new AccountsDatabase()
        const accountExists = await accountsDatabase.findAccounts(q)

        if(!accountExists[0]){
            res.status(404);
            throw new Error(`404 user nao encontrado` )
        }

   
        res.send({message: `contas`, result: accountExists})


    
    } catch (error) {
      console.error(error);
      res.status(500).send(error instanceof Error ? error.message : 'Unexpected error');
    }
  }
}