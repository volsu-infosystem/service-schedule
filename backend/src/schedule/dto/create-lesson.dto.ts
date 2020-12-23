import { IsNumber } from 'class-validator';

export class CreateLessonDto {
  @IsNumber()
  readonly disciplineId: number;

  @IsNumber()
  readonly roomId: number;
}
