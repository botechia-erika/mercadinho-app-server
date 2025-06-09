import { PurchaseItem } from "../models/PurchaseItem";

export enum PRODUCTS_CATEGORY {
    'horti-fruti',
    'laticinios',
    'armazem',
    'limpeza',
    'papelaria',
    'higiene-pessoal'
}


export interface IProductDB {
    id: string;
    item: string;
    description: string;
    image_url: string;
    price: number;
    category: PRODUCTS_CATEGORY;
}

export enum USER_ROLES {
    "Cadastrado",
    "Cliente", 
    "Anonimo"
  }

export interface IUserDB {
    id:string,
    idProfile: string;
    fullName:string,
    nickname: string,
    email: string,
    password: string,
    avatar: string,
    role: USER_ROLES,
    createdAt: string
  };

export enum RECIPES_CATEGORY{
    "Frutas",
    "Vegetais",
    "Smoothies",
    "Sucos"
}



export interface IRecipeDB{
    id: string,
    title: string,
    ingredients: string[],
    cooking: string[],
    description: string,
    imgUrl: string,
    category: RECIPES_CATEGORY
}

export enum PAYMENT_TYPES{
    JUROS0=1|2,
    JUROS5=3|4|5|6,
    JUROS10=7|8
}

export interface IPurchaseDetails{
    id:string,
    purchaseList:PurchaseItem[],
    totalPrice: number,
    percentOfDiscount:number,
    totalDiscount: number,
    finalPrice:number ,
    totalItems : number ,
    paymentType: PAYMENT_TYPES,
    buyerId?: string |undefined,
    accountId?: string|undefined 
}

export interface IPurchaseItem {
 id:string,
  name: string,
  quantity: number,
  unityPrice: number,
  totalPrice : number,
  purchase_id: string
}

export interface IAccountDB{
    id :string,
    user_id : string,
    balance : number,
    score :number,
    category: string
}


export interface ISaleDB{
    id:string,
    item: string,
    price: number,
    quantity: number,
    totalPrice: number
}


export interface ISale4PurchaseDB{
    id:string,
    idPurchase: string,
    item: string,
    price: number,
    quantity: number,
    totalPrice: number
}



export interface IPurchaseDB {
    id: string,
    buyer_id: string,
    finalPrice: Number,
    created_at: string 
}



export interface IPurchaseTicket {
    id: string,
    buyerId: string,
    accountId: string,
    updatedScore: number,
    updatedCategory: string,
    purchasePrice: number,
    purchaseList: IPurchaseDB[]
}

