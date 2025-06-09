import { PAYMENT_TYPES } from './../interfaces/interfaces';
import { PurchaseItem } from "./PurchaseItem";

export class PurchaseDetails {
    // Propriedades da classe
    private readonly id: string;
    private purchaseList: PurchaseItem[] = [];
    private totalPrice: number = 0;
    private percentOfDiscount: number = 0;
    private totalDiscount: number = 0;
    private finalPrice: number = 0;
    private totalItems: number = 0;
    private paymentType: PAYMENT_TYPES;
    private buyerId?: string | undefined;
    private accountId?: string | undefined;

    // Construtor da classe
    constructor(
        id: string,
        purchaseList: PurchaseItem[] = [],
        paymentType: PAYMENT_TYPES,
        buyerId?: string | undefined,
        accountId?: string | undefined
    ) {
        this.id = id;
        this.purchaseList = purchaseList;
        this.paymentType = paymentType;
        this.buyerId = buyerId;
        this.accountId = accountId;
        // Inicializa os valores iniciais chamando os métodos correspondentes
        this.calculateTotalItems();
        this.calculateTotalDiscount();
        this.calculateFinalPrice();
    }

    // Métodos de acesso (getters)
    public getId(): string {
        return this.id;
    }

    public getPurchaseList(): PurchaseItem[] {
        return this.purchaseList;
    }

    public getPercentOfDiscount(): number {
        return this.percentOfDiscount;
    }

    public getTotalDiscount(): number {
        return this.totalDiscount;
    }

    public getFinalPrice(): number {
        return this.finalPrice;
    }

    public getTotalItems(): number {
        return this.totalItems;
    }

    public getPaymentType(): PAYMENT_TYPES {
        return this.paymentType;
    }

    public getBuyerId(): string | undefined {
        return this.buyerId;
    }

    public getAccountId(): string | undefined {
        return this.accountId;
    }

    // Métodos de modificação (setters)
    public setPurchaseList(value: PurchaseItem[]): void {
        this.purchaseList = value;
        // Atualiza os valores dependentes
        this.calculateTotalItems();
        this.calculateTotalDiscount();
        this.calculateFinalPrice();
    }

    public setTotalPrice(value: number): void {
        this.totalPrice = value;
    }

    public setTotalDiscount(value: number): void {
        this.totalDiscount = value;
    }

    public setFinalPrice(value: number): void {
        this.finalPrice = value;
    }

    public setTotalItems(value: number): void {
        this.totalItems = value;
    }

    public setPaymentType(value: PAYMENT_TYPES): void {
        this.paymentType = value;
        // Recalcula o preço final quando o método de pagamento é alterado
        this.calculateFinalPrice();
    }

    public setBuyerId(value: string): void {
        this.buyerId = value;
    }

    public setAccountId(value: string): void {
        this.accountId = value;
    }

    // Novos métodos solicitados

    // Adiciona um item à lista de compras
    public addItemToPurchaseList(item: PurchaseItem): void {
        this.purchaseList.push(item);
        // Atualiza os valores dependentes
        this.calculateTotalItems();
                this.calculateTotalDiscount();
        this.calculateFinalPrice();
    }

    // Calcula o total de itens na lista de compras
    public calculateTotalItems(): void {
        this.setTotalItems(this.purchaseList.length);
    }

    // Calcula o desconto total com base na percentagem fornecida
    public calculateTotalDiscount(): void {
        const calculatedTotalDiscount = (this.percentOfDiscount / 100) * this.totalPrice;
        this.setTotalDiscount(calculatedTotalDiscount);
    }

    // Calcula o preço final com base no desconto total e no método de pagamento
    public calculateFinalPrice(): void {
        let finalPrice = this.totalPrice - this.totalDiscount;

        // Aplica juros com base no método de pagamento
        switch (this.paymentType) {
            case PAYMENT_TYPES.JUROS5:
                finalPrice *= 1.05; // Acrescenta 5% de juros
                break;
            case PAYMENT_TYPES.JUROS10:
                finalPrice *= 1.1; // Acrescenta 10% de juros
                break;
            // Caso padrão para PAYMENT_TYPES.JUROS0 (não aplica juros)
            // ou outros valores não tratados explicitamente
        }

        this.setFinalPrice(finalPrice);
    }
}
