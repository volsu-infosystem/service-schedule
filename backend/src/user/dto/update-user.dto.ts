import { IsEmail, IsNumber } from "class-validator";

export class UpdateUserDto {
    @IsEmail()
    readonly email: string;

    @IsNumber()
    readonly roleId: number;
};