import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CellEntity } from './cell.entity';

@Entity('schedule')
export class ScheduleEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(
    () => CellEntity,
    cell => cell.schedule,
  )
  cells: CellEntity[];

  @Column('smallint')
  semester: number;
}
