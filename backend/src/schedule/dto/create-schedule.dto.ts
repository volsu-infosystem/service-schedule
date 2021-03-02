import { IsNumber } from 'class-validator';
export class CreateScheduleDto {
  @IsNumber()
  readonly semester: number;

  @IsNumber()
  readonly groupId: number;
}
