import { RoomEntity } from 'src/campus/entities/room.entity';
import { DisciplineEntity } from 'src/discipline/entities/discipline.entity';
import { SubGroupEntity } from 'src/group/entities/subGroup.entity';
import { ProfileProfessorEntity } from 'src/profile/entities/profileProfessor.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ImportanceStatusEnum } from '../enums/importanceStatus.enum';
import { LessonTypeEnum } from '../enums/lessonType.enum';
import { PeriodicityEnum } from '../enums/periodicity.enum';
import { WeekDaysEnum } from '../enums/weekDays.enum';
import { ScheduleEntity } from './schedule.entity';

@Entity('lesson')
export class LessonEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(
    () => ScheduleEntity,
    scheduleEntity => scheduleEntity.lessons,
  )
  schedule: ScheduleEntity;

  @ManyToOne(
    () => SubGroupEntity,
    subGroupEntity => subGroupEntity.lessons,
  )
  subGroup: SubGroupEntity;

  @ManyToOne(
    () => DisciplineEntity,
    disciplineEntity => disciplineEntity.lessons,
  )
  @JoinColumn({ name: 'disciplineId' })
  discipline: DisciplineEntity;

  @ManyToOne(
    () => ProfileProfessorEntity,
    professor => professor.lessons,
  )
  @JoinColumn({ name: 'professorId' })
  professor: ProfileProfessorEntity;

  @ManyToOne(
    () => RoomEntity,
    roomEntity => roomEntity.lessons,
  )
  @JoinColumn({ name: 'roomId' })
  room: RoomEntity;

  @Column('enum', { enum: LessonTypeEnum })
  lessonType: LessonTypeEnum;

  @Column('enum', { enum: ImportanceStatusEnum })
  importanceStatus: ImportanceStatusEnum;

  @Column('varchar', { length: 11 })
  time: string;

  @Column('enum', { enum: WeekDaysEnum })
  day: WeekDaysEnum;

  @Column('enum', { enum: PeriodicityEnum })
  periodicity: PeriodicityEnum;
}
