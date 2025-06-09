import { RECIPES_CATEGORY } from "../interfaces/interfaces"

export class Recipe{
    constructor(
        private id: string,
        private title: string,
        private description: string,  
        private ingredients: string[],
        private cooking: string[],
        private imageUrl: string,
        private category: RECIPES_CATEGORY
     ){}

       public getId():string{
        return this.id
       }


       public getTitle():string{
        return this.title
       }

       public getDescription():string{
        return this.description
       }


       public getIngredients():string[]{
          return this.ingredients
         }

     public getCooking():string[]{
          return this.cooking
     }
  
     public getImageUrl():string{
          return this.imageUrl
     }
  
     public getCategory():RECIPES_CATEGORY{
          return this.category
     }
     public setTitle(value:string):void{
          this.title = value
     }

       public setDescription (value:string):void{
            this.description = value
       }


       public setIngredients (value:string[]):void{
          this.ingredients = value
     }

     public setCooking (value:string[]):void{
          this.cooking = value
     }


       public setImageUrl (value:string):void{
            this.imageUrl = value
       }


         public setCategory (value:RECIPES_CATEGORY):void{
              this.category = value
         }
}

