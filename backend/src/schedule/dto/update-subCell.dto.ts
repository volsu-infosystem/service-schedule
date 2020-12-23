import { IsEnum, IsNumber } from 'class-validator';
import { periodEnum } from '../enums/period.enum';

export class UpdateSubCellDto {
  @IsEnum(periodEnum)
  readonly period: periodEnum;

  @IsNumber()
  readonly subGroupId: number;

  @IsNumber()
  readonly cellId: number;

  @IsNumber()
  readonly lessonId: number;
}
