import { Lesson } from 'src/schedule/models/lesson.entity';
import { Entity, ManyToMany, ManyToOne } from 'typeorm';
import { Cathedra } from './cathedra.entity';
import { Discipline } from './discipline.enitity';
import { ProfileBase } from './profileBase.entity';

@Entity({name: 'profile_professor'})
export class ProfileProfessor extends ProfileBase {
    
    @ManyToOne(() => Cathedra, cathedra => cathedra.professors)
    cathedra: Cathedra;

    @ManyToMany(() => Discipline, discipline => discipline.professors)
    teachedDisciplines: Discipline[]

    @ManyToMany(() => Lesson)
    lessons: ProfileProfessor[];

}