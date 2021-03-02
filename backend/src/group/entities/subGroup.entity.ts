import { LessonEntity } from 'src/schedule/entities/lesson.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { ProfileStudentEntity } from '../../profile/entities/profileStudent.entity';
import { GroupEntity } from './group.entity';

@Entity('sub_group')
export class SubGroupEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 64 })
  name: string;

  @ManyToMany(
    () => ProfileStudentEntity,
    student => student.subGroups,
  )
  @JoinTable({
    name: 'sub-groups_students',
    joinColumn: { name: 'sub_group_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'student_id', referencedColumnName: 'id' },
  })
  students: ProfileStudentEntity[];

  @OneToMany(
    () => LessonEntity,
    lessonEntity => lessonEntity.subGroup,
  )
  lessons: LessonEntity;

  @ManyToOne(
    () => GroupEntity,
    groupEntity => groupEntity.subGroups,
  )
  group: GroupEntity;
}
