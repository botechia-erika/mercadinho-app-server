import jwt from 'jsonwebtoken'
import { UserDatabase } from '../database/UserDatabase'

import { NextFunction, Request, Response } from "express"
export const authMiddleware = async (req:Request,res:Response, next:NextFunction)=>{
       const {authorization} = req.headers

       if(!authorization){
        res.status(401)
        throw new Error('"401" : NAO AUTORIZADO')
       }

       type JwtPayload ={
        id: string
       }

       // remove bearer e pega so o token
       const token = authorization.split(" ")[1]
    
       
       const {id}=jwt.verify(
        token,
        process.env.JWT_KEY ?? "" 
       ) as JwtPayload

      const userDatabase = new UserDatabase()

      const userDB= await userDatabase.findUserById(id);

      const user = userDB[0]
      if (!user) {
        res.status(401)
        throw new Error( "401 usuario nao autorizado" );
      } else {

      const {
        password: _,
        ...userLogged
      } = user

     req.user = userLogged
    
      next()
}}