import { LessonEntity } from 'src/schedule/entities/lesson.entity';
import { Entity, JoinTable, ManyToMany, ManyToOne, OneToMany } from 'typeorm';
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
  @JoinTable({
    name: 'professors_disciplines',
    joinColumn: { name: 'professor_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'discipline_id', referencedColumnName: 'id' },
  })
  teachedDisciplines: DisciplineEntity[];

  @OneToMany(
    () => LessonEntity,
    lesson => lesson.professor,
    { nullable: true },
  )
  lessons: LessonEntity[];
}
