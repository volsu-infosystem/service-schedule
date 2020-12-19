import { IsNumber, IsString, Length } from "class-validator";

export class UpdateEquipmentDto {
    @IsString()
    @Length(1, 256)
    readonly name: string;

    @IsString()
    @Length(0, 2048)
    readonly desc: string;

    @IsNumber()
    readonly roomId: number;
}
