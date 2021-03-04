import { RoomEntity } from 'src/campus/entities/room.entity';
import { DisciplineEntity } from 'src/discipline/entities/discipline.entity';
import { ProfileProfessorEntity } from 'src/profile/entities/profileProfessor.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ImportanceStatusEnum } from '../enums/importanceStatus.enum';
import { LessonTypeEnum } from '../enums/lessonType.enum';
import { PeriodicityEnum } from '../enums/periodicity.enum';
import { SubCellEntity } from './sub-cell.entity';

@Entity('lesson')
export class LessonEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(
    () => SubCellEntity,
    subCellEntity => subCellEntity.lessons,
  )
  subCell: SubCellEntity;

  @Column('enum', { enum: PeriodicityEnum })
  periodicity: PeriodicityEnum;

  @ManyToOne(
    () => DisciplineEntity,
    disciplineEntity => disciplineEntity.lessons,
  )
  @JoinColumn({ name: 'disciplineId' })
  discipline: DisciplineEntity;

  @ManyToOne(
    () => ProfileProfessorEntity,
    professor => professor.lessons,
  )
  @JoinColumn({ name: 'professorId' })
  professor: ProfileProfessorEntity;

  @ManyToOne(
    () => RoomEntity,
    roomEntity => roomEntity.lessons,
  )
  @JoinColumn({ name: 'roomId' })
  room: RoomEntity;

  @Column('enum', { enum: LessonTypeEnum })
  lessonType: LessonTypeEnum;

  @Column('enum', { enum: ImportanceStatusEnum })
  importanceStatus: ImportanceStatusEnum;

  @Column('varchar', { length: 11 })
  time: string;
}
