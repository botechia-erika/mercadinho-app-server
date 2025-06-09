

import express , {Application, Request, Response} from 'express'
import dotenv from 'dotenv'
dotenv.config()
const port = Number(process.env.PORT)|| 3001


import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan";
import path from 'path';

import PremiosRouter from './router/premios';
import ProductsRouter from './router/products';
import PurchasesRouter from './router/purchases';
import UsersRouter from './router/users';
import AuthRouter from './router/auth';
import ScoreRouter from './router/score'

const premiosRouter = new PremiosRouter();
const usersRouter = new UsersRouter();
const productsRouter = new ProductsRouter();
const purchasesRouter = new PurchasesRouter();
const authRouter = new AuthRouter();
const scoreRouter = new ScoreRouter();

const app : Application = express();


app.use(morgan("dev"));
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.resolve(__dirname, "../../public/")))
app.get("/ping", (req: Request, res: Response) => {
  res.send("Pong");
});
app.get("/", (req: Request, res: Response) => {
  res.sendFile(path.resolve(__dirname, "../public/index.html"));
});
app.use('/api/auth', authRouter.getRouter());
app.use('/api/premios', premiosRouter.getRouter());
app.use('/api/products', productsRouter.getRouter());
app.use('/api/users', usersRouter.getRouter());
app.use('/api/purchases', purchasesRouter.getRouter());
app.use('/api/score', scoreRouter.getRouter());


app.listen(3001, () => {
    console.log(`Server is running on port ${port}`);
});


export default app