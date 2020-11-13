import { IsNumber } from "class-validator";

export class UpdateLessonDto {
    @IsNumber()
    readonly disciplineId: number;
    
    @IsNumber()
    readonly roomId: number;
}