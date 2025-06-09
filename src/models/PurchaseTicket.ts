import { PurchaseDetails } from "./PurchaseDetails";


class PurchaseTicket {
  constructor(
    private readonly id: string ,
    private readonly ticketId: string,
    private readonly finalPrice : number,
    private paid : 1| 0,
    private readonly createdAt :string
  ){}
  public getId(): string {
    return this.id;
}
public getTicketId(): string {
    return this.ticketId;
}
public getTFinalPrice(): number {
    return this.finalPrice;
}
public getPaid(): 1|0 {
    return this.paid;
}

public getCreatedAt(): string {
    return this.createdAt;
}


public setPaid(value: 1|0): void {
    this.paid = value;

}
}