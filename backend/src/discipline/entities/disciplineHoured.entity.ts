import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'
import { Discipline } from './discipline.enitity';
import { StudyDirection } from './studyDirection.entity';

@Entity('discipline_houred')
export class DisciplineHoured {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Discipline, discipline => discipline.houred)
    discipline: Discipline

    @Column('numeric')
    semester: number;

    @Column('numeric')
    hours: number;

    @ManyToOne(() => StudyDirection, studyDirection => studyDirection.houredDisciplines)
    studyDirection: StudyDirection
}