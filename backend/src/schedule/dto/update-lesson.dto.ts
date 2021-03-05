import { ImportanceStatusEnum } from '../enums/importanceStatus.enum';
import { LessonTypeEnum } from '../enums/lessonType.enum';
import { PeriodicityEnum } from '../enums/periodicity.enum';

export class InsertLessonDto {
  readonly lessonId: number;
  readonly periodicity: PeriodicityEnum;
  readonly disciplineId: number;
  readonly professorId: number;
  readonly roomId: number;
  readonly lessonType: LessonTypeEnum;
  readonly importanceStatus: ImportanceStatusEnum;

  readonly subGroupId: number;
  readonly day: number;
  readonly order: number;
}
