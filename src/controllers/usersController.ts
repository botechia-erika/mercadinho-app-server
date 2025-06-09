import  jwt  from 'jsonwebtoken';
import { Request, Response } from "express";
import { UserDatabase } from "../database/UserDatabase";
import { User } from "../models/User";
import { IAccountDB, IProductDB, IUserDB } from "../interfaces/interfaces";
import { today } from "../helpers/helpers";
import { v4 as uuidv4 } from 'uuid';
import { UserWithAccount } from "../models/UserWithAccount";
import { AccountsDatabase } from "../database/AccountsDatabase";
import bcrypt from 'bcrypt'
class UsersController {
  async getAllUsers(req: Request, res: Response) {
    try {
      const q = req.query.q as string | undefined;
      const userDatabase = new UserDatabase();
      const usersData= await userDatabase.findUsers(q);
      
      if (!usersData[0]) {
        res.status(404)
        throw new Error( "User not found" );
      } else {
        const result:User[] = usersData.map((user)=>{
            return new User(
              user.id,
              user.idProfile,
              user.fullName,
              user.nickname,
              user.password,
              user.email,
              user.avatar,
              user.role,
              user.createdAt
            )
        })
       
        res.status(200).json({ message: "User result", result });
      }
    } catch (error) {
      console.error(error);
      res.status(500).send(error instanceof Error ? error.message : "Unexpected error");
    }
  }

  async getUserById(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const userDatabase = new UserDatabase();
      const usersDB = await userDatabase.findUserById(id);
      const userFirst = usersDB[0];

      if (!userFirst) {
        res.status(404)
        throw new Error( "User not found" );
      } else {
        const result:User[] = usersDB.map((user)=>{
          return new User(
            user.id,
            user.idProfile,
            user.fullName,
            user.nickname,
            user.password,
            user.email,
            user.avatar,
            user.role,
            user.createdAt
          )
      })

      res.status(200).json({message: "Usuario encontrado", result})
    }
    } catch (error) {
      console.error(error);
      res.status(500).send(error instanceof Error ? error.message : "Unexpected error");
    }
  }
/******************get USER BY NICKNAME***************** */

/*************************create user********************************** */
  async createUser(req: Request, res: Response) {
    try {
    

      const {id, fullName, nickname, email, password, avatar, role } = req.body
    
      const newAccount = uuidv4();

      const passwordHash = await bcrypt.hash(password, 10)

    const newInstanceUser = new UserWithAccount(
      id,
      newAccount,
      fullName,
      nickname,
      passwordHash,
      email,
      avatar,
      role,
      today,
      0,
      0,
      today,
      'blue'
    )


    const objUser : IUserDB={
      id: newInstanceUser.getId(),
      idProfile: newInstanceUser.getIdProfile(),
      fullName: newInstanceUser.getFullName(),
      nickname: newInstanceUser.getNickname(),
      password: newInstanceUser.getPassword(),
      email: newInstanceUser.getEmail(),
      avatar: newInstanceUser.getAvatar(),
      role: newInstanceUser.getRole(),
      createdAt: newInstanceUser.getCreatedAt()
    }

    const userDatabase = new UserDatabase()
    await userDatabase.insertUser(objUser)

    const objAccount :IAccountDB={
      id: newInstanceUser.getIdProfile(),
      user_id: newInstanceUser.getId(),
      balance: newInstanceUser.getBalance(),
      score: newInstanceUser.getScore(),
      category: newInstanceUser.getCategory()
    }


    const accountsDatabase = new AccountsDatabase();
    await accountsDatabase.insertAccount(objAccount)

    const [usersData]= await userDatabase.findUserByNickname(objUser.nickname);

  const dataHash = usersData
       
        const confirmHash = await bcrypt.compare(password , dataHash.password)

       if(!confirmHash){
        res.status(401)
        throw new Error('"401" : Senha invalida')
       }

       const token = jwt.sign({
        id: dataHash.id
      },
      process.env.JWT_KEY ?? "" ,
      {
        expiresIn: process.env.JWT_EXPIRES_IN
      }
      )

      const user = dataHash

      const {
        password: _,
        ...userLogin
      } = user

      res.status(200).json({ message: "User result",
       token,
       user: userLogin
      });

    } catch (error) {
      console.error(error);
      res.status(500).send(error instanceof Error ? error.message : "Unexpected error");
    }
  }



/*************************edit user******************************* */
  async editUserById(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const { nickname, email, password, avatar, role } = req.body

      const usersDatabase = new UserDatabase();
      const userExist =await usersDatabase.findUserId(id)

      if(!userExist){
        res.status(404)
        throw new Error('"404": Usuario Nao Cadastrado')
      }

      const user4Edit = await usersDatabase.findUserById(id)

      const inst4Edit = new User(
        user4Edit[0].id,
        user4Edit[0].idProfile,
        user4Edit[0].fullName,
        user4Edit[0].nickname,
        user4Edit[0].password,
        user4Edit[0].email,
        user4Edit[0].avatar,
        user4Edit[0].role,
        user4Edit[0].createdAt
      )

   nickname !== inst4Edit.getNickname()? inst4Edit.setNickname(nickname):inst4Edit.getNickname()
    password !== inst4Edit.getPassword()? inst4Edit.setPassword(password):inst4Edit.getPassword()
      email !== inst4Edit.getEmail()? inst4Edit.setEmail(email):inst4Edit.getEmail()
      avatar !== inst4Edit.getAvatar()? inst4Edit.setEmail(email):inst4Edit.getEmail()

      const obj4Update:IUserDB={
        id,
        idProfile: inst4Edit.getIdProfile(),
        fullName: inst4Edit.getFullName(),
        nickname: inst4Edit.getNickname(),
        email: inst4Edit.getEmail(),
        password: inst4Edit.getPassword(),
        avatar: inst4Edit.getAvatar(), 
        role: inst4Edit.getRole(), 
        createdAt: inst4Edit.getCreatedAt()
      }

      

      await usersDatabase.updateUser(obj4Update, id)

  
      const usersData= await usersDatabase.findUserById(id);
        
      if (!usersData[0]) {
        res.status(400)
        throw new Error( "Cadastro nao completado" );
      } else {
        const user = usersData[0]
        const result:User = new User(
              user.id,
              user.idProfile,
              user.fullName,
              user.nickname,
              user.password,
              user.email,
              user.avatar,
              user.role,
              user.createdAt
            )
      // ... (seu código existente para a edição de usuário)
      res.status(200).json({ message: "User updated successfully", result });
        }
    } catch (error) {
      console.error(error);
      res.status(500).send(error instanceof Error ? error.message : "Unexpected error");
    }
  }

  async destroyUser(req: Request, res: Response) {
    try {
      // ... (seus código existente para a exclusão de usuário)
      res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).send(error instanceof Error ? error.message : "Unexpected error");
    }
  }
}

export default UsersController;
