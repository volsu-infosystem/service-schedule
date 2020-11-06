import { Lesson } from 'src/schedule/entities/lesson.entity';
import { Entity, ManyToMany, ManyToOne } from 'typeorm';
import { Discipline } from '../../discipline/entities/discipline.entity';
import { Cathedra } from '../../institute/entities/cathedra.entity';
import { ProfileBase } from './profileBase.entity';

@Entity('profile_professor')
export class ProfileProfessor extends ProfileBase {
  @ManyToOne(
    () => Cathedra,
    cathedra => cathedra.professors,
  )
  cathedra: Cathedra;

  @ManyToMany(
    () => Discipline,
    discipline => discipline.professors,
  )
  teachedDisciplines: Discipline[];

  @ManyToMany(() => Lesson)
  lessons: ProfileProfessor[];
}
