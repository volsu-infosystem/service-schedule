import { IsNumber, IsString } from "class-validator";

export class CreateUserDto {
    @IsString()
    readonly login;

    @IsString()
    readonly password;

    @IsNumber()
    readonly roleId: number;
};