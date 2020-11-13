import { IsNumber, IsString, Length } from "class-validator";

export class CreateGroupDto {
    @IsString()
    @Length(1, 64)
    readonly name: string;

    @IsNumber()
    readonly cathedraId: number;

    @IsNumber()
    readonly studyDirectionId: number;

    @IsNumber()
    readonly admissionYearId: number;

    @IsNumber()
    readonly groupLeaderId: number;

    @IsNumber()
    readonly scheduleId: number;
}