import { IsNumber, IsString, Length } from "class-validator";

export class UpdateCathedraDto {
    @IsString()
    @Length(3, 256)
    readonly name: string;

    @IsNumber()
    readonly instituteId: number;
}