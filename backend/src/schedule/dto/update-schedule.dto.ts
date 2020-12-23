import { IsNumber } from 'class-validator';

export class UpdateScheduleDto {
  @IsNumber()
  readonly semester: number;
}
