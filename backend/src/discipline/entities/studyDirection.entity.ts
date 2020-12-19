import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { DisciplineHouredEntity } from './disciplineHoured.entity';
import { GroupEntity } from '../../group/entities/group.entity';

@Entity('study_direction')
export class StudyDirectionEntity {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar', { length: 256 })
    name: string;

    @Column('varchar', { length: 2048, nullable: true })
    desc: string;

    @OneToMany(() => GroupEntity, group => group.studyDirection)
    group: GroupEntity;

    @OneToMany(() => DisciplineHouredEntity, houredDisciplines => houredDisciplines.studyDirection)
    houredDisciplines: DisciplineHouredEntity[]
}