import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { DisciplineHoured } from './disciplineHoured.entity';
import { Equipment } from '../../campus/entities/equipment.entity';
import { ProfileProfessor } from '../../profile/entities/profileProfessor.entity';
import { Lesson } from 'src/schedule/entities/lesson.entity';

@Entity({name: 'discipline'})
export class Discipline {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', length: 256})
    name: string;

    @Column({type: 'varchar', length: 2048})
    desc: string;

    @OneToMany(() => DisciplineHoured, disciplineHoured => disciplineHoured.discipline)
    houred: DisciplineHoured[]

    @ManyToMany(() => ProfileProfessor, profileProfessor => profileProfessor.teachedDisciplines)
    @JoinTable()
    professors: ProfileProfessor[]

    @OneToMany(() => Lesson, lesson => lesson.discipline)
    lessons: Lesson[]

    @Column()
    needEquipments: Equipment[]
}