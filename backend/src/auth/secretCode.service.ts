import { Injectable } from "@nestjs/common";

@Injectable()
export class SecretCodeService {
    async generateSecretCode(): Promise<number> {
        let secretCode: string;
        for (let i = 0; i<6; i++) {
            secretCode += String(Math.floor(Math.random() * 10))
        }
        return Number(secretCode);
    }
}