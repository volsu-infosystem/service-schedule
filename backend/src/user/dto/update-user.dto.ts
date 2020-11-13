import { IsNumber, IsString } from "class-validator";

export class UpdateUserDto {
    @IsString()
    readonly login;

    @IsString()
    readonly password;

    @IsNumber()
    readonly roleId: number;
};