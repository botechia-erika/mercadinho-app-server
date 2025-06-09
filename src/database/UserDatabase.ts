import { IUserDB } from '../interfaces/interfaces';
import {User} from './../models/User'
import {BaseDatabase} from './BaseDatabase'

export class UserDatabase extends BaseDatabase{
 public static TABLE_USERS = "users"
 
 async findUsers(q:string|undefined):Promise<IUserDB[]>{


  if(!q){
    const result: IUserDB[] = await BaseDatabase.connection(UserDatabase.TABLE_USERS)
    const usersDB = result;

  return usersDB
} else{
  const result = await BaseDatabase.connection(UserDatabase.TABLE_USERS).
  where( "nickname","LIKE", `%${q}%`)
    const usersDB = result;

  return usersDB
}
 }

 async findUserByNickname(nickname:string):Promise<IUserDB[]>{

  const result = await BaseDatabase.connection(UserDatabase.TABLE_USERS).
  where( "nickname","LIKE", `%${nickname}%`)


    const usersDB = result
  return usersDB
}

async findUserById(id:string):Promise<IUserDB[]>{

  const result = await BaseDatabase.connection(UserDatabase.TABLE_USERS).
  where( "id","LIKE", `%${id}%`)


    const usersDB = result
  return usersDB
}
async findUserByNicknames(nickname:string, password:string):Promise<string>{

  const result = await BaseDatabase.connection(UserDatabase.TABLE_USERS).
  where( "nickname","LIKE", `%${nickname}%`).
  andWhere(password=`${password}`)

  if(result){
    return "bananinha"
  }else{
    return "cajuzinho"
  }
}

async findUserId(id:string):Promise<string>{

  const result = await BaseDatabase.connection.
  raw(`SELECT id FROM ${UserDatabase.TABLE_USERS} WHERE id LIKE "%${id}%"`)
 

    const userId = result
  return userId
}

async findUserEmail(email:string):Promise<string>{

  const result = await BaseDatabase.connection.
  raw(`SELECT email FROM ${UserDatabase.TABLE_USERS} WHERE email LIKE ${email}`)
 

    const userEmail = result
  return userEmail
}

async findUserNickname(nickname:string):Promise<string>{

  const result = await BaseDatabase.connection.
  raw(`SELECT nickname FROM ${UserDatabase.TABLE_USERS} WHERE nickname LIKE ${nickname}`)
 

    const userNickname = result
  return userNickname
}
async insertUser (user4Insert: IUserDB):Promise<void>{
await BaseDatabase.connection(UserDatabase.TABLE_USERS).insert(user4Insert)
  
}

async updateUser (user4Update: IUserDB, id:string):Promise<void>{
  await BaseDatabase.connection(UserDatabase.TABLE_USERS).
  update(user4Update).
  where({ id: `${id}` });
  }

 async destroyUser(idToDelete:string):Promise<void>{
  await BaseDatabase.connection(UserDatabase.TABLE_USERS).
  delete().where({ id: idToDelete });
 } 
}