import { ImportanceStatusEnum } from '../enums/importanceStatus.enum';
import { LessonTypeEnum } from '../enums/lessonType.enum';
import { PeriodicityEnum } from '../enums/periodicity.enum';

export class UpdateLessonDto {
  readonly disciplineId?: number;
  readonly professorId?: number;
  readonly roomId?: number;
  readonly lessonType?: LessonTypeEnum;
  readonly importanceStatus?: ImportanceStatusEnum;
  readonly startTime?: string;
  readonly endTime?: string;
  readonly periodicity?: PeriodicityEnum;
}
