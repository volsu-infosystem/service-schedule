import { ImportanceStatusEnum } from '../enums/importanceStatus.enum';
import { LessonTypeEnum } from '../enums/lessonType.enum';
import { PeriodicityEnum } from '../enums/periodicity.enum';
import { WeekDaysEnum } from '../enums/weekDays.enum';

export class UpdateLessonDto {
  readonly scheduleId?: number;
  readonly disciplineId?: number;
  readonly professorId?: number;
  readonly roomId?: number;
  readonly subGroupId?: number;
  readonly lessonType?: LessonTypeEnum;
  readonly importanceStatus?: ImportanceStatusEnum;
  readonly time?: string;
  readonly day?: WeekDaysEnum;
  readonly periodicity?: PeriodicityEnum;
}
