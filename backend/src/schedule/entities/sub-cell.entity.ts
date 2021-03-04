import { SubGroupEntity } from 'src/group/entities/subGroup.entity';
import { ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Entity } from 'typeorm/decorator/entity/Entity';
import { CellEntity } from './cell.entity';
import { LessonEntity } from './lesson.entity';

@Entity('sub-cell')
export class SubCellEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(
    () => CellEntity,
    cellEntity => cellEntity.subCells,
  )
  cell: CellEntity;

  @OneToMany(
    () => LessonEntity,
    lessonEntity => lessonEntity.subCell,
    { cascade: true },
  )
  lessons: LessonEntity[];

  @ManyToOne(
    () => SubGroupEntity,
    subGroupEntity => subGroupEntity.subCell,
  )
  subGroup: SubGroupEntity;
}
