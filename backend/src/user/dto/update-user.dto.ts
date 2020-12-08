import { IsEmail, IsNumber } from "class-validator";

export class UpdateUserDto {
    @IsEmail()
    readonly email;

    @IsNumber()
    readonly roleId: number;
};