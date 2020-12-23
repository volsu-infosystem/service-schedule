import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SubGroupEntity } from 'src/group/entities/subGroup.entity';
import { CellEntity } from './cell.entity';
import { LessonEntity } from './lesson.entity';
import { periodEnum } from '../enums/period.enum';

@Entity('sub_cell')
export class SubCellEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('enum', { enum: periodEnum })
  period: periodEnum;

  @ManyToOne(
    () => SubGroupEntity,
    subGroup => subGroup.subCells,
  )
  subGroup: SubGroupEntity;

  @ManyToOne(
    () => CellEntity,
    cell => cell.subCells,
  )
  cell: CellEntity;

  @OneToOne(() => LessonEntity)
  @JoinColumn()
  lesson: LessonEntity;
}
