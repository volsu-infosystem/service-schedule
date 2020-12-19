import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
    constructor(
        private readonly mailerService: MailerService
    ) {}

    async sendSecretCode(email: string, secretCode: number): Promise<any> {

        this.mailerService.sendMail({
            to: email,
            from: 'auth@ratingvolsu.ru',
            subject: 'ВолГу Рейтинг: Авторизация нового устройства',
            text: String(secretCode)
        })
    }
}
