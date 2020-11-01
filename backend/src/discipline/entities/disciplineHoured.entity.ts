import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'
import { StudyDirection } from '../studyDirection.entity';
import { Discipline } from './discipline.enitity';

@Entity({name: 'discipline_houred'})
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
    studyDirection: StudyDirection[]
}