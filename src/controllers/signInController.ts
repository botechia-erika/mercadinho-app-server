import { PurchaseDatabase } from "../database/PurchaseDatabase";
import dotenv from "dotenv";
import { NextFunction, Request, Response } from "express";
import { UserDatabase } from "../database/UserDatabase";
import { IUserDB } from "../interfaces/interfaces";
import { today } from "../helpers/helpers";
import uuidv4 from "uuid";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

dotenv.config();

class SignInController {
  async postAuth(req: Request, res: Response) {
    try {
      const { nickname, password } = req.body;
      const userDatabase = new UserDatabase();
      const userData = await userDatabase.findUserByNickname(nickname);

      if (!userData) {
        return res.status(401).json({ error: "401 Invalid nickname" });
      }

      const isValidPassword = await bcrypt.compare(
        password,
        userData[0].password
      );

      if (!isValidPassword) {
        return res.status(401).json({ error: "401 Invalid password" });
      }

      const token = jwt.sign({ id: userData[0].id }, process.env.JWT_KEY || "", {
        expiresIn: process.env.JWT_EXPIRES_IN || "1d",
      });

      const { password: _, ...userLogin } = userData[0];

      return res
        .status(200)
        .json({ message: "User result", token, user: userLogin });
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        return res.status(500).send(error.message);
      }
      return res.status(500).send("Unexpected error");
    }
  }

  async getProfile(req: Request, res: Response) {
    try {
      const result = req.user;
      return res.status(200).json({ message: "Authorized user", result });
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        return res.status(500).send(error.message);
      }
      return res.status(500).send("Unexpected error");
    }
  }
}

export default SignInController;
