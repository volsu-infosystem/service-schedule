import { RoomEntity } from 'src/campus/entities/room.entity';
import { DisciplineEntity } from 'src/discipline/entities/discipline.entity';
import { ProfileProfessorEntity } from 'src/profile/entities/profileProfessor.entity';
import { ScheduleEntity } from '../entities/schedule.entity';
import { ImportanceStatusEnum } from '../enums/importanceStatus.enum';
import { LessonTypeEnum } from '../enums/lessonType.enum';
import { PeriodicityEnum } from '../enums/periodicity.enum';

export class CreateLessonDto {
  readonly scheduleId: number;
  readonly disciplineId: number;
  readonly professorId: number;
  readonly roomId: number;
  readonly lessonType: LessonTypeEnum;
  readonly importanceStatus: ImportanceStatusEnum;
  readonly startTime: string;
  readonly endTime: string;
  readonly periodicity: PeriodicityEnum;

  discipline?: DisciplineEntity;
  professor?: ProfileProfessorEntity;
  room?: RoomEntity;
  schedule?: ScheduleEntity;
}
