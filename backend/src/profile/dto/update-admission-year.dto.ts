import { IsEnum, IsNumber } from "class-validator";
import { studyLevelEnum } from "../enums/studyLevel.enum";

export class UpdateCathedraDto {
    @IsNumber()
    readonly year: number;

    @IsEnum(studyLevelEnum)
    readonly studyLevel: studyLevelEnum;
    
    @IsNumber()
    readonly instituteId: number;
}