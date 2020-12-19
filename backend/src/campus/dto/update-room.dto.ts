import { IsNumber, IsString, Length } from "class-validator";

export class UpdateRoomDto {
    @IsString()
    @Length(1, 64)
    readonly name: string;

    @IsNumber()
    readonly capacity: number;

    @IsNumber()
    readonly campusId: number;
}