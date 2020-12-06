import { Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ProfileProfessorEntity } from 'src/profile/entities/profileProfessor.entity';
import { DisciplineEntity } from 'src/discipline/entities/discipline.entity';
import { RoomEntity } from '../../campus/entities/room.entity';

@Entity('lesson')
export class LessonEntity {
  @PrimaryGeneratedColumn()
    id: number;
    
  @ManyToOne(
    () => DisciplineEntity,
    discipline => discipline.lessons,
  )
  discipline: DisciplineEntity;

  @ManyToMany(() => ProfileProfessorEntity)
  @JoinTable()
  professors: ProfileProfessorEntity[];

  @ManyToOne(
    () => RoomEntity,
    room => room.lessons,
  )
  room: RoomEntity;
}
