class TicketDetails {
    private id: number;
    private buyerId: number;
    private accountId: number;
    private productsList: string[];
    private paid: boolean;
    private totalPrice: number;

    constructor(
        id: number,
        buyerId: number,
        accountId: number,
        productsList: string[],
        paid: boolean,
        totalPrice: number
    ) {
        this.id = id;
        this.buyerId = buyerId;
        this.accountId = accountId;
        this.productsList = productsList;
        this.paid = paid;
        this.totalPrice = totalPrice;
    }

    // Getters
    getId(): number {
        return this.id;
    }

    getBuyerId(): number {
        return this.buyerId;
    }

    getAccountId(): number {
        return this.accountId;
    }

    getProductsList(): string[] {
        return this.productsList;
    }

    isPaid(): boolean {
        return this.paid;
    }

    getTotalPrice(): number {
        return this.totalPrice;
    }

    // Setters
    setId(newId: number): void {
        this.id = newId;
    }

    setBuyerId(newBuyerId: number): void {
        this.buyerId = newBuyerId;
    }

    setAccountId(newAccountId: number): void {
        this.accountId = newAccountId;
    }

    setProductsList(newProductsList: string[]): void {
        this.productsList = newProductsList;
    }

    setPaid(newPaid: boolean): void {
        this.paid = newPaid;
    }

    setTotalPrice(newTotalPrice: number): void {
        this.totalPrice = newTotalPrice;
    }
}