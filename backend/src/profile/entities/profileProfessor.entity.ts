import { LessonEntity } from 'src/schedule/entities/lesson.entity';
import { Entity, ManyToMany, ManyToOne, OneToMany } from 'typeorm';
import { DisciplineEntity } from '../../discipline/entities/discipline.entity';
import { CathedraEntity } from '../../institute/entities/cathedra.entity';
import { ProfileBaseEntity } from './profileBase.entity';

@Entity('profile_professor')
export class ProfileProfessorEntity extends ProfileBaseEntity {
  @ManyToOne(
    () => CathedraEntity,
    cathedra => cathedra.professors,
  )
  cathedra: CathedraEntity;

  @ManyToMany(
    () => DisciplineEntity,
    discipline => discipline.professors,
    { nullable: true },
  )
  teachedDisciplines: DisciplineEntity[];

  @OneToMany(
    () => LessonEntity,
    lesson => lesson.professor,
  )
  lessons: LessonEntity[];
}
