import { IsEnum, IsNumber } from 'class-validator';
import { studyLevelEnum } from '../enums/studyLevel.enum';

export class CreateAdmissionYearDto {
  @IsNumber()
  readonly year: number;

  @IsEnum(studyLevelEnum)
  readonly studyLevel: studyLevelEnum;

  @IsNumber()
  readonly instituteId: number;
}
