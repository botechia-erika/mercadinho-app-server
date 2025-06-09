export class Sale {
  constructor(
    private readonly id: string ,
    private readonly purchaseId : string,
    private itemId: string,
    private itemPrice:number,
    private itemQuantity: number,
    private itemTotalPrice: number
  ){}
  public getId(): string {
    return this.id;
}
public getPurchaseId(): string {
    return this.purchaseId;
}

public getItemId(): string {
    return this.itemId;
}
public getItemPrice(): number {
    return this.itemPrice;
}
public getItemQuantity(): number {
    return this.itemQuantity;
}

public getItemTotalPrice(): number {
    return this.itemPrice;
}


public setItemId(value: string): void {
    this.itemId = value;
}


public setItemPrice(value: number): void {
    this.itemPrice = value;
}

public setItemQuantity(value: number): void {
    this.itemQuantity = value;
}
public setItemTotalPrice(value: number): void {
    this.itemTotalPrice = value;
}
}