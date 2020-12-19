import { IsString, Length } from "class-validator";

export class CreateInstituteDto {
    @IsString()
    @Length(3, 256)
    readonly name: string;
}