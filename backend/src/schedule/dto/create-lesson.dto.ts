import { SubGroupEntity } from 'src/group/entities/subGroup.entity';
import { ImportanceStatusEnum } from '../enums/importanceStatus.enum';
import { LessonTypeEnum } from '../enums/lessonType.enum';
import { PeriodicityEnum } from '../enums/periodicity.enum';

export class CreateLessonDto {
  readonly scheduleId: number;
  readonly subGroupId: number;
  readonly disciplineId: number;
  readonly professorId: number;
  readonly roomId: number;
  readonly lessonType: LessonTypeEnum;
  readonly importanceStatus: ImportanceStatusEnum;
  readonly startTime: string;
  readonly endTime: string;
  readonly periodicity: PeriodicityEnum;
  readonly subGroup: SubGroupEntity;
}
