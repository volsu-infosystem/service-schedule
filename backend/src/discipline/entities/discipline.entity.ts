import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { ProfileProfessorEntity } from 'src/profile/entities/profileProfessor.entity';
import { LessonEntity } from 'src/schedule/entities/lesson.entity';
import { DisciplineHouredEntity } from './disciplineHoured.entity';

@Entity('discipline')
export class DisciplineEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar', { length: 256 })
    name: string;

    @Column('varchar', { length: 2048 })
    desc: string;

    @OneToMany(() => DisciplineHouredEntity, disciplineHoured => disciplineHoured.discipline)
    houred: DisciplineHouredEntity[]

    @ManyToMany(() => ProfileProfessorEntity, profileProfessor => profileProfessor.teachedDisciplines)
    @JoinTable()
    professors: ProfileProfessorEntity[]

    @OneToMany(() => LessonEntity, lesson => lesson.discipline)
    lessons: LessonEntity[]

    // To Do: Add Equipments Logic
    @Column('varchar', { nullable: true })
    needEquipments: string;
}