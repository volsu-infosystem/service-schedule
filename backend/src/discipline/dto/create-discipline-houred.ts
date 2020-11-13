import { IsNumber } from "class-validator";

export class CreateDisciplineHouredDto {
    @IsNumber()
    readonly semester: number

    @IsNumber()
    readonly hours: number

    @IsNumber()
    readonly disciplineId: number

    @IsNumber()
    readonly studyDirectionId: number
}
