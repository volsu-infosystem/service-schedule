import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { DisciplineHoured } from './disciplineHoured.entity';
import { Group } from '../../group/entities/group.entity';

@Entity('study_direction')
export class StudyDirection {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar', { length: 256 })
    name: string;

    @Column('varchar', { length: 2048, nullable: true })
    desc: string;

    @OneToMany(() => Group, group => group.studyDirection)
    group: Group;

    @OneToMany(() => DisciplineHoured, houredDisciplines => houredDisciplines.studyDirection)
    houredDisciplines: DisciplineHoured[]
}