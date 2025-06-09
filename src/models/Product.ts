import { PRODUCTS_CATEGORY } from "../interfaces/interfaces"

 

export class Product{
    constructor(
     private id:string,
     private item: string,  
     private description:string,
     private imageUrl :string ,
     private price: number,
     private category: PRODUCTS_CATEGORY
     ){}

       public getId():string{
        return this.id
       }


       public getItem():string{
        return this.item
       }

       public getDescription():string{
        return this.description
       }

       public setDescription (value:string):void{
            this.description = value
       }
       public getImageUrl():string{
        return this.imageUrl
       }

       public setImageUrl (value:string):void{
            this.imageUrl = value
       }
       public getPrice():number{
        return this.price
       }

       public setPrice (value:number):void{
            this.price = value
       }
       public getCategory():PRODUCTS_CATEGORY{
          return this.category
         }
  
         public setCategory (value:PRODUCTS_CATEGORY):void{
              this.category = value
         }
}

