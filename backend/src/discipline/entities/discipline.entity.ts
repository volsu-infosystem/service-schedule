import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { ProfileProfessor } from 'src/profile/entities/profileProfessor.entity';
import { Lesson } from 'src/schedule/entities/lesson.entity';
import { DisciplineHoured } from './disciplineHoured.entity';

@Entity('discipline')
export class Discipline {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar', { length: 256 })
    name: string;

    @Column('varchar', { length: 2048 })
    desc: string;

    @OneToMany(() => DisciplineHoured, disciplineHoured => disciplineHoured.discipline)
    houred: DisciplineHoured[]

    @ManyToMany(() => ProfileProfessor, profileProfessor => profileProfessor.teachedDisciplines)
    @JoinTable()
    professors: ProfileProfessor[]

    @OneToMany(() => Lesson, lesson => lesson.discipline)
    lessons: Lesson[]

    // To Do: Add Equipments Logic
    @Column('varchar', { nullable: true })
    needEquipments: string;
}