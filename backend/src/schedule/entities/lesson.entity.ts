import { Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ProfileProfessor } from 'src/profile/entities/profileProfessor.entity';
import { Discipline } from 'src/discipline/entities/discipline.entity';
import { Room } from '../../campus/entities/room.entity';

@Entity('lesson')
export class Lesson {
  @PrimaryGeneratedColumn()
    id: number;
    
  @ManyToOne(
    () => Discipline,
    discipline => discipline.lessons,
  )
  discipline: Discipline;

  @ManyToMany(() => ProfileProfessor)
  @JoinTable()
  professors: ProfileProfessor[];

  @ManyToOne(
    () => Room,
    room => room.lessons,
  )
  room: Room;
}
