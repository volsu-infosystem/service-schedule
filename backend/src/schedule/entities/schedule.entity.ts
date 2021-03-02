import { GroupEntity } from 'src/group/entities/group.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { LessonEntity } from './lesson.entity';

@Entity('schedule')
export class ScheduleEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(
    () => LessonEntity,
    lessonEntity => lessonEntity.schedule,
  )
  lessons: LessonEntity[];

  @Column('smallint')
  semester: number;

  @ManyToOne(
    () => GroupEntity,
    groupEntity => groupEntity.schedules,
  )
  group: GroupEntity;
}
