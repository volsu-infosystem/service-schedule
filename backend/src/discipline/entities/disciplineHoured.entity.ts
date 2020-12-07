import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { DisciplineEntity } from './discipline.entity';
import { StudyDirectionEntity } from './studyDirection.entity';

@Entity('discipline_houred')
export class DisciplineHouredEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(
    () => DisciplineEntity,
    discipline => discipline.houred,
    { nullable: true }
  )
  discipline: DisciplineEntity;

  @Column('numeric')
  semester: number;

  @Column('numeric')
  hours: number;

  @ManyToOne(
    () => StudyDirectionEntity,
    studyDirection => studyDirection.houredDisciplines,
    { nullable: true }
  )
  studyDirection: StudyDirectionEntity;
}
