import { IsEmail, IsNotEmpty, IsNumber } from "class-validator";

export class LoginUserDto {
    @IsEmail()
    @IsNotEmpty({message: 'E-mail is required'})
    readonly email: string;

    @IsNumber()
    @IsNotEmpty({message: 'Secret Code is required'})
    readonly secretCode: number;
}