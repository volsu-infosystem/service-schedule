import { GroupEntity } from 'src/group/entities/group.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CellEntity } from './cell.entity';

@Entity('schedule')
export class ScheduleEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(
    () => CellEntity,
    cellEntity => cellEntity.schedule,
    { cascade: true },
  )
  cells: CellEntity[];

  @Column('smallint')
  semester: number;

  @ManyToOne(
    () => GroupEntity,
    groupEntity => groupEntity.schedules,
  )
  group: GroupEntity;
}
