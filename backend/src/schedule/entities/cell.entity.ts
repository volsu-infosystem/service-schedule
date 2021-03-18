import { Column, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Entity } from 'typeorm/decorator/entity/Entity';
import { ScheduleEntity } from './schedule.entity';
import { SubCellEntity } from './sub-cell.entity';

@Entity('cell')
export class CellEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(
    () => ScheduleEntity,
    scheduleEntity => scheduleEntity.cells,
  )
  schedule: ScheduleEntity;

  @OneToMany(
    () => SubCellEntity,
    subCellEntity => subCellEntity.cell,
    { cascade: true },
  )
  subCells: SubCellEntity[];

  @Column('numeric')
  day: number;

  @Column('numeric')
  order: number;
}
