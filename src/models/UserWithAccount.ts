import { USER_ROLES } from "../interfaces/interfaces";
import { User } from "./User";

export class UserWithAccount extends User {
    private score: number;
    private balance: number;
    private updatedAt: string;
    private category: string;

    constructor(
        id: string,
        idProfile: string,
        fullName: string,
        nickname: string,
        email: string,
        password: string,
        avatar: string,
        role: USER_ROLES,
        createdAt: string,
        score: number,
        balance: number,
        updatedAt: string,
        category: string
    ) {
        super(id, idProfile, fullName, nickname, email, password, avatar, role, createdAt);
        this.score = score;
        this.balance = balance;
        this.updatedAt = updatedAt;
        this.category = category;
    }

    public getScore(): number {
        return this.score;
    }

    public getBalance(): number {
        return this.balance;
    }

    public getUpdatedAt(): string {
        return this.updatedAt;
    }

    public getCategory(): string {
        return this.category;
    }

    public addPoints(value: number): void {
        const shoppingPointsEarned = value * 0.5;
        this.score += shoppingPointsEarned;
    }

    public makePurchase(amount: number): void {
        if (this.balance - amount < 0) {
            throw new Error('Saldo insuficiente.');
        }
        this.balance -= amount;
        this.score += amount * 2;
    }

    public redeemPointsForPrize(prizePoints: number): void {
        if (this.score >= prizePoints) {
            this.score -= prizePoints;
            console.log(`Prêmio resgatado com sucesso! Pontuação restante: ${this.score}`);
        } else {
            throw new Error('Pontuação insuficiente para resgatar o prêmio.');
        }
    }

    public defineCategory(score:number): void {
        if (this.score < 100) {
            this.category = 'blue';
        } else if (this.score >= 100 && this.score <= 1000) {
            this.category = 'gold';
        } else {
            this.category = 'black';
        }
    }
}
