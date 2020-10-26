import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany } from 'typeorm'
import { Discipline } from './discipline.enitity';
import { StudyDirection } from './studyDirection.entity';

@Entity({name: 'discipline_houred'})
export class DisciplineHoured {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Discipline, discipline => discipline.houred)
    discipline: Discipline

    @Column({type: 'numeric'})
    semester: number;

    @Column({type: 'numeric'})
    hours: number;

    @ManyToMany(() => StudyDirection)
    studyDirections: StudyDirection[]
}