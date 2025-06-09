import { PurchaseDetails } from "./PurchaseDetails";


export class Purchase{
  constructor(
    private readonly id: string ,
    private readonly buyerId :string,
    private readonly finalPrice : number,
    private readonly createdAt :string
  ){}
  public getId(): string {
    return this.id;
}
public getBuyerId(): string {
    return this.buyerId;
}

public getTFinalPrice(): number {
    return this.finalPrice;
}


public getCreatedAt(): string {
    return this.createdAt;
}

}