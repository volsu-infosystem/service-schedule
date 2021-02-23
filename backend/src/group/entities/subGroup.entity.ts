import { LessonEntity } from 'src/schedule/entities/lesson.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { ProfileStudentEntity } from '../../profile/entities/profileStudent.entity';

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
    name: 'sub_subGroups_students',
    joinColumn: { name: 'sub_subGroup_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'student_id', referencedColumnName: 'id' },
  })
  students: ProfileStudentEntity[];

  @OneToMany(
    () => LessonEntity,
    lessonEntity => lessonEntity.subGroup,
  )
  lessons: LessonEntity;
}
