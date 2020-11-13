import { IsEmail, IsNumber, IsString, Length } from "class-validator";

export class CreateProfileBaseDto {
    @IsString()
    @Length(2, 64)
    readonly firstName: string;

    @IsString()
    @Length(2, 64)
    readonly lastName: string;

    @IsString()
    @Length(2, 64)
    readonly middleName?: string;

    @IsEmail()
    @Length(0, 256)
    readonly email: string;

    @IsNumber()
    @Length(6, 8)
    readonly userId?: string;
}