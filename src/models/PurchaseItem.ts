export class PurchaseItem {
   private readonly id: string;
   private item: string;
   private quantity: number;
   private unityPrice: number ;
   private totalPrice: number ;
   private purchaseId: string;

   constructor(
       id: string,
       item: string,
       quantity: number ,
       unityPrice: number ,
       totalPrice: number ,
       purchaseId: string
   ) {
       this.id = id;
       this.item = item;
       this.quantity = quantity;
       this.unityPrice = unityPrice;
       this.totalPrice = totalPrice;
       this.purchaseId = purchaseId;
   }

   public getId(): string {
       return this.id;
   }

   public getItem(): string {
       return this.item;
   }

   public getQuantity(): number {
       return this.quantity;
   }

   public getUnityPrice(): number {
       return this.unityPrice;
   }

   public getTotalPrice(): number {
       return this.totalPrice;
   }

   public getPurchaseId(): string {
       return this.purchaseId;
   }

   public setItem(value: string): void {
       this.item = value;
   }

   public setQuantity(value: number): void {
       this.quantity = value;
   }

   public setTotalPrice(value: number): void {
       this.totalPrice = value;
   }

   public setPurchaseId(value: string): void {
       this.purchaseId = value;
   }

   public calculateTotalPrice(): void {
       const calculatedTotalPrice = this.quantity * this.unityPrice;
       this.setTotalPrice(calculatedTotalPrice);
   }
}
