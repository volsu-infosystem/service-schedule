import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProfileProfessorEntity } from 'src/profile/entities/profileProfessor.entity';
import { DisciplineHouredEntity } from './disciplineHoured.entity';
import { LessonEntity } from 'src/schedule/entities/lesson.entity';

@Entity('discipline')
export class DisciplineEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 256 })
  name: string;

  @Column('varchar', { length: 2048 })
  desc: string;

  @OneToMany(
    () => DisciplineHouredEntity,
    disciplineHoured => disciplineHoured.discipline,
  )
  houred: DisciplineHouredEntity[];

  @ManyToMany(
    () => ProfileProfessorEntity,
    profileProfessor => profileProfessor.teachedDisciplines,
    { cascade: true },
  )
  @JoinTable({
    name: 'professors_disciplines',
    joinColumn: { name: 'professor_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'discipline_id', referencedColumnName: 'id' },
  })
  professors: ProfileProfessorEntity[];

  @OneToMany(
    () => LessonEntity,
    lessonEntity => lessonEntity.discipline,
  )
  lessons: LessonEntity[];

  /* @ToDo: Add Equipments Logic */
  @Column('varchar', { nullable: true })
  needEquipments: string;
}
