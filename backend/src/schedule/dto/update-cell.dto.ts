import { IsEnum, IsNumber, Max, Min } from "class-validator";
import { weekDaysEnum } from "../enums/weekDays.enum";

export class UpdateCellDto {
    
    @IsEnum(weekDaysEnum)
    readonly dayWeek: weekDaysEnum;

    @IsNumber()
    @Min(1)
    @Max(7)
    readonly time: number;

    @IsNumber()
    readonly scheduleId: number;
}