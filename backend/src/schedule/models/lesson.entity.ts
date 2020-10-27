import { Discipline } from 'src/profile/models/discipline.enitity'
import { ProfileProfessor } from 'src/profile/models/profileProfessor.entity';
import { Entity } from 'typeorm'
import { Room } from './room.entity';

@Entity({name: "lesson"})
export class Lesson {
    
    @ManyToOne(() => Discipline, discipline => discipline.lessons)
    discipline: Discipline;

    @ManyToMany(() => ProfileProfessor)
    @JoinTable()
    professors: ProfileProfessor[];

    @ManyToOne(() => Room, room => room.lessons)
    room: Room;
}