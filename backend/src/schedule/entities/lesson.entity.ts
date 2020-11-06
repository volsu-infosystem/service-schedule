import { Entity, JoinTable, ManyToMany, ManyToOne } from 'typeorm';
import { ProfileProfessor } from 'src/profile/entities/profileProfessor.entity';
import { Discipline } from 'src/discipline/entities/discipline.entity';
import { Room } from '../../campus/entities/room.entity';

@Entity('lesson')
export class Lesson {
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
